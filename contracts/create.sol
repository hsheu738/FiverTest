// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvoiceCreation {
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
        bool isActive;
    }

    mapping(uint256 => Invoice) public invoices;
    uint256 public invoiceCounter;

    event InvoiceCreated(
        uint256 indexed invoiceId,
        address indexed sender,
        address indexed recipient,
        uint256 timestamp
    );

    // Function to create sender information
    function createSenderInfo(
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
            block.timestamp
        );
    }

    // Function to get invoice details
    function getInvoice(uint256 _invoiceId) public view returns (
        Sender memory,
        Recipient memory,
        uint256,
        bool
    ) {
        require(invoices[_invoiceId].isActive, "Invoice does not exist");
        Invoice storage invoice = invoices[_invoiceId];
        return (
            invoice.sender,
            invoice.recipient,
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
}
