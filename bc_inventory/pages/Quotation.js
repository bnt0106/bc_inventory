import React, { Component } from 'react';
import Web3 from 'web3'
import  IPFSQuotation from "../build/contracts/IPFSQuotation.json";
import  Main from "../components/Main";



class Quotation extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
      async loadWeb3() {
        if (typeof window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account:accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = IPFSQuotation.networks[networkId]
        if(networkData) {
            const ipfsquotation = new web3.eth.Contract(IPFSQuotation.abi, networkData.address)
            this.setState({ipfsquotation})
            const quotationCount = await ipfsquotation.methods.quotationCount().call()
            this.setState({ quotationCount})
            
            // Load products
      for (var i = 1; i <= quotationCount; i++) {
        const quotation = await ipfsquotation.methods.quotations(i).call()
        this.setState({
          quotations: [...this.state.quotations, quotation]
        })
      }
      this.setState({ loading: false})
      
      
 } else {
            window.alert('Marketplace contract not deployed to detected network.')
          }
        

      }
      
      constructor(props) {
        super(props)
        this.state = {
          account: '',
          quotationCount: 0,
            quotations: [],
            loading: true
          
        }
        this.createQuotation = this.createQuotation.bind(this)
        this.purchaseQuotation = this.purchaseQuotation.bind(this)
       

      }
      createQuotation(name, content, cid, date, price){
          
        this.setState({loading: true})
        this.state.ipfsquotation.methods.createQuotation(name, content, cid, date, price).send({ from: this.state.account}).once('reciept', (receipt)=>{
          this.setState({ loading: false})


        })
    }
    
    purchaseQuotation(id,price){
       
      this.setState({loading: true})
      this.state.ipfsquotation.methods.purchaseQuotation(id).send({ from: this.state.account, value: price}).once('reciept', (receipt)=>{
        this.setState({ loading: false})


      })
  }
    
      
    
      
    render() {
        return (
          <div class=" d-flex justify-content-center align-self-center pt-4">
            
                    
                    
                   
                    { this.state.loading? <div id="loader" ><p class="text-info" > <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
</svg>  Loading...</p></div> 
                    : <Main quotations={this.state.quotations}
                     createQuotation={this.createQuotation} 
                    
                     purchaseQuotation={this.purchaseQuotation} />
              }


                  
                   
                  
            </div>
          
        );
      }
    }
    
    export default Quotation;
    