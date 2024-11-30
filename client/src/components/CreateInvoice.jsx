import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CreateInvoice = () => {
  const [sellerInfo, setSellerInfo] = useState({
    walletAddress: '',
    firstName: '',
    lastName: '',
    companyName: '',
    tin: '',
    email: '',
    country: '',
    city: '',
    region: '',
    postalCode: ''
  });

  const [clientInfo, setClientInfo] = useState({
    walletAddress: '',
    firstName: '',
    lastName: '',
    companyName: '',
    tin: '',
    email: '',
    country: '',
    city: '',
    region: '',
    postalCode: ''
  });

  const handleSellerChange = (e) => {
    setSellerInfo({
      ...sellerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleClientChange = (e) => {
    setClientInfo({
      ...clientInfo,
      [e.target.name]: e.target.value
    });
  };

  const connectWallet = async () => {
    // Implement wallet connection logic here
    alert('Wallet connection will be implemented');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl mt-[40px] font-bold text-center mb-10 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Create New Invoice
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input Forms */}
          <div className="space-y-8">
            {/* Seller Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Your Information</h2>
              <button
                onClick={connectWallet}
                className="w-full mb-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Connect Wallet
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="input-field md:col-span-2"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="tin"
                  placeholder="Tax Identification Number (TIN)"
                  className="input-field md:col-span-2"
                  onChange={handleSellerChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-field md:col-span-2"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="region"
                  placeholder="Region"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="input-field"
                  onChange={handleSellerChange}
                />
              </div>
            </motion.div>

            {/* Client Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Client Information</h2>
              <input
                type="text"
                name="walletAddress"
                placeholder="Client Wallet Address"
                className="input-field mb-4"
                onChange={handleClientChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="input-field md:col-span-2"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="tin"
                  placeholder="Tax Identification Number (TIN)"
                  className="input-field md:col-span-2"
                  onChange={handleClientChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-field md:col-span-2"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="region"
                  placeholder="Region"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="input-field"
                  onChange={handleClientChange}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md sticky top-6 h-fit"
          >
            <h2 className="text-xl font-semibold mb-6 text-emerald-700">Preview</h2>
            
            {/* Seller Preview */}
            <div className="mb-8">
              <h3 className="font-semibold text-emerald-600 mb-2">From:</h3>
              <div className="space-y-1 text-gray-600">
                <p>{sellerInfo.firstName} {sellerInfo.lastName}</p>
                <p>{sellerInfo.companyName}</p>
                <p>TIN: {sellerInfo.tin}</p>
                <p>{sellerInfo.email}</p>
                <p>{sellerInfo.city}, {sellerInfo.region}</p>
                <p>{sellerInfo.country}, {sellerInfo.postalCode}</p>
              </div>
            </div>

            {/* Client Preview */}
            <div>
              <h3 className="font-semibold text-emerald-600 mb-2">To:</h3>
              <div className="space-y-1 text-gray-600">
                <p>{clientInfo.firstName} {clientInfo.lastName}</p>
                <p>{clientInfo.companyName}</p>
                <p>TIN: {clientInfo.tin}</p>
                <p>{clientInfo.email}</p>
                <p>{clientInfo.city}, {clientInfo.region}</p>
                <p>{clientInfo.country}, {clientInfo.postalCode}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice; 