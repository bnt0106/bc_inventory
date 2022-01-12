/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useWeb3React } from '@web3-react/core'
import { Injected } from '../components/web3'
import Web3 from 'web3'
import Link from 'next/link'
import  Quotation from "../pages/Quotation"
import  Navbar from "../components/Navbar"
import  Main from "../components/Main";

export default function navbar(){



  
    const {account, active, activate, deactivate, chainId, library, error } = useWeb3React();
    async function connect(){
      try{
        await activate(Injected);
      } catch (ex) {
        console.log(ex);
      }
  
    }
    

  return(

    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
</svg>
      <span class="font-semibold text-xl tracking-tight">APBC</span>
    </div>
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
     
     
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a href="/Homepage" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Home
        </a>
        <a href="/ULIpfs" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          IPFS
        </a>
        <a href="/Quotation" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">

        Quotations And Inventory Report
          
        </a>
      </div>
      <div>
        <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"> <button onClick={connect}>
                
                {active ? `${account?.substring(0, 5)}...${account?.substring(account.length - 4)}`: 'Connect'}

              </button></a>
      </div>
    </div>
  </nav>


  )
}