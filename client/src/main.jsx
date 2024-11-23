import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements} from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// Define OpenCampus Codex Testnet with updated configuration
const openCampusCodex = {
  id: 656476, // Updated Chain ID (0xa045c)
  name: 'OpenCampus Codex',
  network: 'opencampus-codex',
  nativeCurrency: {
    decimals: 18,
    name: 'EDU',
    symbol: 'EDU',
  },
  rpcUrls: {
    public: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
    default: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://testnet.explorer.opencampus.io' },
  },
  testnet: true
};

const config = getDefaultConfig({
  appName: 'InvoiceFlow',
  projectId: 'e7fa7d19fd057ecd9403a0e89bd62b8b',
  chains: [openCampusCodex],
  ssr: false
});

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home/>}/>
      <Route path='/sidebar' element={<Sidebar/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Navbar/>
          <RouterProvider router={router}/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
