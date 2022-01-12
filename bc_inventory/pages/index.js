import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useWeb3React } from '@web3-react/core'
import { Injected } from '../components/web3'
import Web3 from 'web3'
import Link from 'next/link'
import  Quotation from "./Quotation"
import  Navbar from "../components/Navbar"
import  Main from "../components/Main";
import  Homepage from "../pages/Homepage";




export default function Home() {
  
  
  return (
    <>
    <div class="container mx-auto">
      <Homepage/>

 


</div>
     
   

   
    </>
    
   
  );
}


