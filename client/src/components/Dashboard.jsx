import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { wagmiAbi } from "./abi";
import { useAccount } from "wagmi";
import { publicClient } from "./config";

const Dashboard = () => {
  const { address } = useAccount();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getData = async () => {
  //     if (!address) {
  //       console.error("Wallet not connected");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       console.log("Fetching invoices for address:", address);

  //       const contractData = await publicClient.readContract({
  //         address: "0xF426eBf74b4546d8d81fA2F0B4B6929dD9437114",
  //         abi: wagmiAbi,
  //         functionName: "getAllInvoices",
  //         args: [],
  //       });

  //       console.log("Contract data fetched:", contractData);

  //       // Validate data structure
  //       if (
  //         !contractData ||
  //         contractData.some((array) => array.length !== contractData[0].length)
  //       ) {
  //         console.error("Mismatched array lengths in contract data");
  //         setInvoices([]);
  //         return;
  //       }

  //       // Transform data into invoice objects
  //       const transformedInvoices = contractData[0]
  //         .map((_, index) => ({
  //           invoiceId: contractData[0][index].toString(),
  //           sender: contractData[1][index],
  //           recipient: contractData[2][index],
  //           amount: contractData[3][index].toString(),
  //           status: ["Pending", "Paid"][contractData[4][index]], // Assuming 0 = Pending, 1 = Paid
  //           timestamp: new Date(contractData[5][index] * 1000).toLocaleString(),
  //           isActive: contractData[6][index],
  //         }))
  //         .filter((invoice) =>
  //           // Optionally filter by address
  //           invoice.isActive &&
  //           (invoice.sender.toLowerCase() === address.toLowerCase() ||
  //             invoice.recipient.toLowerCase() === address.toLowerCase())
  //         );

  //       console.log("Transformed invoices:", transformedInvoices);
  //       setInvoices(transformedInvoices);
  //     } catch (error) {
  //       console.error("Error fetching invoices:", error);
  //       setInvoices([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getData();
  // }, [address]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  function InvoiceRows({sender, recipient, amount, status}){
    return(
      <div>
      <p className="text-tiny uppercase font-bold text-purple-400">sender:{sender}</p>
      <p className="text-tiny uppercase font-bold text-purple-400 mt-[10px]">recipient:{recipient}</p>
      <h4 className="font-semibold text-lg">amount:{amount}</h4>
      <h4 className="font-semibold text-lg">status:{status}</h4>
      </div>
    )
  }

  const [data, setData] = useState();

  useEffect(()=>{
    const getData = async()=>{
      const contractData = await publicClient.readContract({address: "0xF426eBf74b4546d8d81fA2F0B4B6929dD9437114", abi: wagmiAbi, functionName: "getAllInvoices", args: []});
      console.log(contractData)
      setData(contractData);
    }
    if(!data){
      getData()
    }
  },[data])

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
          >
            <a href="/create-invoice" className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Invoice
            </a>
          </motion.button>
        </div>
  

        {data && 
        <InvoiceRows sender={data[0]} recipient={data[1]} amount={data[2]} status={data[3]}/>
      }
       
      </div>
    </div>
  );
};

export default Dashboard;
