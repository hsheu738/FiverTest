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

  const [selectedChain, setSelectedChain] = useState('');

  const [products, setProducts] = useState([
    {
      name: '',
      quantity: 1,
      price: '',
      description: ''
    }
  ]);

  const chains = [
    {
      id: 'bnb',
      name: 'BNB Chain',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
          <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#F3BA2F"/>
          <path d="M12.116 14.404L16 10.52L19.886 14.406L22.146 12.146L16 6L9.856 12.144L12.116 14.404Z" fill="white"/>
          <path d="M16 21.48L12.116 17.596L9.856 19.856L16 26L22.146 19.854L19.886 17.594L16 21.48Z" fill="white"/>
          <path d="M16 18.194L18.194 16L16 13.806L13.806 16L16 18.194Z" fill="white"/>
        </svg>
      )
    },
    {
      id: 'polygon',
      name: 'Polygon',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
          <path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0z" fill="#8247E5"/>
          <path d="M21.092 13.12c-.483-.275-1.1-.275-1.583 0l-2.567 1.514-1.733 1.024-2.567 1.514c-.483.275-1.1.275-1.583 0l-2.033-1.178a1.556 1.556 0 01-.775-1.337V12.52c0-.55.292-1.062.775-1.337l2.033-1.145c.483-.275 1.1-.275 1.583 0l2.033 1.145c.483.275.775.787.775 1.337v1.514l1.733-1.024v-1.514a1.556 1.556 0 00-.775-1.337l-3.767-2.169c-.483-.275-1.1-.275-1.583 0L8.5 9.681A1.556 1.556 0 007.725 11.018v4.338c0 .55.292 1.062.775 1.337l3.767 2.169c.483.275 1.1.275 1.583 0l2.567-1.514 1.733-1.024 2.567-1.514c.483-.275 1.1-.275 1.583 0l2.033 1.178c.483.275.775.787.775 1.337v2.136c0 .55-.292 1.062-.775 1.337l-2 1.145c-.483.275-1.1.275-1.583 0l-2.033-1.145a1.556 1.556 0 01-.775-1.337v-1.514l-1.733 1.024v1.514c0 .55.292 1.062.775 1.337l3.767 2.169c.483.275 1.1.275 1.583 0l3.767-2.169c.483-.275.775-.787.775-1.337v-4.338a1.556 1.556 0 00-.775-1.337l-3.8-2.169z" fill="#fff"/>
        </svg>
      )
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
          <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
          <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.602"/>
          <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
          <path d="M16.498 21.968V27.995L24 17.616L16.498 21.968Z" fill="white" fillOpacity="0.602"/>
          <path d="M16.498 27.995V21.967L9 17.616L16.498 27.995Z" fill="white"/>
          <path d="M16.498 20.573L23.995 16.22L16.498 12.872V20.573Z" fill="white" fillOpacity="0.2"/>
          <path d="M9 16.22L16.498 20.573V12.872L9 16.22Z" fill="white" fillOpacity="0.602"/>
        </svg>
      )
    }
  ];

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

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, {
      name: '',
      quantity: 1,
      price: '',
      description: ''
    }]);
  };

  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + (Number(product.price) * Number(product.quantity) || 0);
    }, 0).toFixed(2);
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
              
              {/* Chain Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Blockchain Network
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {chains.map((chain) => (
                    <motion.button
                      key={chain.id}
                      onClick={() => setSelectedChain(chain.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className={`p-3 rounded-xl border-2 transition-all ${
                        selectedChain === chain.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {chain.icon}
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">{chain.name}</p>
                          <p className="text-xs text-gray-500">
                            {selectedChain === chain.id ? 'Selected' : 'Click to select'}
                          </p>
                        </div>
                        {selectedChain === chain.id && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

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

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Product Information</h2>
              
              <div className="space-y-6">
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Item #{index + 1}</h3>
                      {index > 0 && (
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                        className="input-field"
                      />
                      
                      <input
                        type="text"
                        placeholder="Description"
                        value={product.description}
                        onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                        className="input-field"
                      />
                      
                      <div className="flex gap-4">
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={product.quantity}
                          min="1"
                          onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                          className="input-field"
                        />
                        
                        <input
                          type="number"
                          placeholder="Price per unit"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      
                      <div className="flex items-center justify-end md:col-span-2">
                        <p className="text-gray-600">
                          Subtotal: <span className="font-semibold">${(product.price * product.quantity || 0).toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addProduct}
                  className="w-full px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Item
                </motion.button>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                    <span className="text-2xl font-bold text-emerald-600">${calculateTotal()}</span>
                  </div>
                </div>
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

            {/* Add Products Preview */}
            <div className="mt-8">
              <h3 className="font-semibold text-emerald-600 mb-2">Products:</h3>
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div key={index} className="border-b border-gray-100 pb-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{product.name || 'Product Name'}</span>
                      <span className="text-gray-600">${(product.price * product.quantity || 0).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500">{product.description || 'Description'}</p>
                    <p className="text-sm text-gray-500">Qty: {product.quantity} × ${product.price || '0.00'}</p>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span className="text-emerald-600">${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice; 