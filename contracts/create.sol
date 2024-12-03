// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvoiceCreation {
    enum PaymentStatus { Pending, Paid }

    struct Sender {
        address walletAddress;
        string firstName;
        string lastName;
        string companyName;
        string tin;
        string email;
        string country;
        string city;
        string region;
        string postalCode;
    }

    struct Recipient {
        address walletAddress;
        string firstName;
        string lastName;
        string companyName;
        string tin;
        string email;
        string country;
        string city;
        string region;
        string postalCode;
    }

    struct Invoice {
        uint256 invoiceId;
        Sender sender;
        Recipient recipient;
        uint256 timestamp;
        uint256 amount;
        PaymentStatus status;
        bool isActive;
    }

    mapping(uint256 => Invoice) public invoices;
    uint256 public invoiceCounter;

    event InvoiceCreated(
        uint256 indexed invoiceId,
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        uint256 timestamp
    );

    event InvoicePaid(
        uint256 indexed invoiceId,
        address indexed payer,
        uint256 amount,
        uint256 timestamp
    );

    // Function to create sender information with amount
    function createSenderInfo(
        string memory _firstName,
        string memory _lastName,
        string memory _companyName,
        string memory _tin,
        string memory _email,
        string memory _country,
        string memory _city,
        string memory _region,
        string memory _postalCode,
        uint256 _amount
    ) public {
        Sender memory newSender = Sender({
            walletAddress: msg.sender,
            firstName: _firstName,
            lastName: _lastName,
            companyName: _companyName,
            tin: _tin,
            email: _email,
            country: _country,
            city: _city,
            region: _region,
            postalCode: _postalCode
        });

        invoiceCounter++;
        invoices[invoiceCounter].sender = newSender;
        invoices[invoiceCounter].timestamp = block.timestamp;
        invoices[invoiceCounter].amount = _amount;
        invoices[invoiceCounter].status = PaymentStatus.Pending;
        invoices[invoiceCounter].isActive = true;
    }

    // Function to create recipient information
    function createRecipientInfo(
        uint256 _invoiceId,
        address _recipientAddress,
        string memory _firstName,
        string memory _lastName,
        string memory _companyName,
        string memory _tin,
        string memory _email,
        string memory _country,
        string memory _city,
        string memory _region,
        string memory _postalCode
    ) public {
        require(invoices[_invoiceId].isActive, "Invoice does not exist");
        require(msg.sender == invoices[_invoiceId].sender.walletAddress, "Only sender can add recipient");

        Recipient memory newRecipient = Recipient({
            walletAddress: _recipientAddress,
            firstName: _firstName,
            lastName: _lastName,
            companyName: _companyName,
            tin: _tin,
            email: _email,
            country: _country,
            city: _city,
            region: _region,
            postalCode: _postalCode
        });

        invoices[_invoiceId].recipient = newRecipient;

        emit InvoiceCreated(
            _invoiceId,
            msg.sender,
            _recipientAddress,
            invoices[_invoiceId].amount,
            block.timestamp
        );
    }

    // Function to mark invoice as paid
    function markInvoiceAsPaid(uint256 _invoiceId) public {
        require(invoices[_invoiceId].isActive, "Invoice does not exist");
        require(msg.sender == invoices[_invoiceId].recipient.walletAddress, "Only recipient can mark as paid");
        require(invoices[_invoiceId].status == PaymentStatus.Pending, "Invoice is already paid");

        invoices[_invoiceId].status = PaymentStatus.Paid;

        emit InvoicePaid(
            _invoiceId,
            msg.sender,
            invoices[_invoiceId].amount,
            block.timestamp
        );
    }

    // Function to get invoice payment status
    function getInvoiceStatus(uint256 _invoiceId) public view returns (PaymentStatus) {
        require(invoices[_invoiceId].isActive, "Invoice does not exist");
        return invoices[_invoiceId].status;
    }

    // Function to get invoice details with status
    function getInvoice(uint256 _invoiceId) public view returns (
        Sender memory,
        Recipient memory,
        uint256 amount,
        PaymentStatus status,
        uint256 timestamp,
        bool isActive
    ) {
        require(invoices[_invoiceId].isActive, "Invoice does not exist");
        Invoice storage invoice = invoices[_invoiceId];
        return (
            invoice.sender,
            invoice.recipient,
            invoice.amount,
            invoice.status,
            invoice.timestamp,
            invoice.isActive
        );
    }

    // Function to check if sender owns the invoice
    function isInvoiceOwner(uint256 _invoiceId, address _address) public view returns (bool) {
        return invoices[_invoiceId].sender.walletAddress == _address;
    }

    // Function to get total number of invoices
    function getTotalInvoices() public view returns (uint256) {
        return invoiceCounter;
    }

    // Function to get all invoices for an address (either as sender or recipient)
    function getInvoicesForAddress(address _address) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](invoiceCounter);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= invoiceCounter; i++) {
            if (invoices[i].sender.walletAddress == _address || 
                invoices[i].recipient.walletAddress == _address) {
                result[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory finalResult = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        
        return finalResult;
    }
}
