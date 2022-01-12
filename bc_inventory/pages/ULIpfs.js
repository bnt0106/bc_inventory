import { Result } from "postcss";
import Web3 from 'web3'
import React, {Component} from 'react'
import  ipfs from "../components/ipfs";




class ULIpfs extends React.Component{
    


    constructor(props) {
        super(props)
    
        this.state = {
          ipfsHash: '',
          web3: null,
          buffer: null,
          account: null
        }
        this.ipfsFile = this.ipfsFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    ipfsFile(event){
        
        event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)


        }
        

    }
    onSubmit(){
        event.preventDefault()
        ipfs.files.add(this.state.buffer, (error, result) => {
          if(error) {
            console.error(error)
            return
          }
          this.setState({ ipfsHash: result[0].hash })
            console.log('ifpsHash', this.state.ipfsHash)
          })
        

    }
    render() {
    return(
        <>



          <div class="col-md-12 d-flex justify-content-center align-self-center pt-4 pb-4">
                                      
                                         

                                    
                                
                            






         
                  

        
           

<h1 class="tt_add">IPFS </h1>
</div>
<div class="flex justify-center">
<div class="mb-3 w-96">

<form onSubmit={this.onSubmit}>   
<input class="form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" onChange={this.ipfsFile}/>
<div class="pt-4">
<button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
Upload
</button>

</div>


<p class="pt-3 text-primary">{this.state.ipfsHash}</p>



</form>



</div>
</div>


        
        
        
        </>

       
    );
    }

}
export default ULIpfs;

