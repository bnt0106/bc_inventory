
import React, { Component } from 'react';
import Quotation from '../pages/Quotation';
class Main extends Component {

    render() {
      return (


        

                <div class=" ">

                  <div class="add_table">   



                  <div class="col-md-12 d-flex justify-content-center align-self-center pt-4 pb-4">
                                      <div class="col-md-10">
                                        <div class="pt-2 pb-2 d-flex justify-content-center align-self-center">
                                        <h1 class="tt_add">Quotations And Inventory Report</h1>

                                        </div>
                                       
                                         

                                          <form onSubmit={(event) => {
                              event.preventDefault()
                              const name = this.quotationName.value
                              const content = this.quotationContent.value
                              
                              const cid = this.quotationCID.value
                              const date = this.quotationDate.value
                              const price = window.web3.utils.toWei(this.quotationPrice.value.toString(), 'Ether')
                              this.props.createQuotation(name, content, cid, date, price)
                            }}>


                                    <div  class="text-danger"></div>
                                    <div class="row justify-content-between">
                                        
                                        <div class="text-login col-md-6">
                                            <div className="form-group mr-sm-2">
                                    <input
                                      id="quotationtName"
                                      type="text"
                                      ref={(input) => { this.quotationName = input }}
                                      className="form-control"
                                      placeholder="Name"
                                      required />
                                  </div>

                                          
                                        </div>


                                        <div class="text-login col-md-6 ">
                                        <div className="form-group mr-sm-2">
                                          <input
                                            id="quotationtContent"
                                            type="text"
                                            ref={(input) => { this.quotationContent = input }}
                                            className="form-control"
                                            placeholder=" Contents"
                                            required />
                                        </div>


                                        </div>



                                    </div>
                                    <div class="row justify-content-between">
                                        <div class="text-login pt-3 col-md-6">
                                        <div className="form-group mr-sm-2">
                                          <input
                                            id="quotationDate"
                                            type="date"
                                            ref={(input) => { this.quotationDate = input }}
                                            className="form-control"
                                            placeholder=" Date"
                                            required />
                                        </div>

                                          
                                        </div>
                                        <div class="text-login pt-3 col-md-6">
                                        <div className="form-group mr-sm-2">
                                            <input
                                              id="quotationPrice"
                                              type="text"
                                              ref={(input) => { this.quotationPrice = input }}
                                              className="form-control"
                                              placeholder=" Price"
                                              required />
                                          </div>

                                        
                                        </div>


                                    </div>
                                    <div class="row justify-content-between">
                                        

                                    </div>
                                    <div class="text-login pt-3 ">
                                    <div className="form-group mr-sm-2">
                                    <input
                                      id="quotationCID"
                                      type="text"
                                      ref={(input) => { this.quotationCID = input }}
                                      className="form-control"
                                      placeholder="CID"
                                      required />
                                  </div>

                                        
                                    </div>
                                




                                    <div class="pt-4  d-flex justify-content-center align-self-center">
                                    <button type="submit" className="btn btn-primary">Add </button>


                                    </div>

                                </form>
                                <div >
                                    
                                </div>
                            </div>






                  </div>
                  

                </div>
          


        
         
           
          

          <p>&nbsp;</p>
          

            
            <div className='col-md-12'>  
            <table class="table caption-top table-bordered  ">
  
  <thead class="bg_table">
    <tr>
                <th scope="col">STT</th>
                <th scope="col">Name</th>
                <th scope="col">Contents</th>
                <th scope="col">CID</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Owner</th>
                <th scope="col">Operation</th>
    </tr>
  </thead>
  
  <tbody id="quotationList">
                {this.props.quotations.map((quotation, key) => {
                    return(
                        <tr key={key}>
                <th scope="row">{quotation.id.toString()}</th>
                <td>{quotation.name}</td>
                <td>{quotation.content}</td>
                <td>{quotation.cid}</td>
                <td>{quotation.date}</td>
                <td>{window.web3.utils.fromWei(quotation.price.toString(), 'Ether')}</td>
                <td>{quotation.owner}</td>
                <td>


                { !quotation.purchased
                      ? <button name={quotation.id}
                          value={quotation.price}
                          onClick={(event) => {
                            this.props.purchaseQuotation(event.target.name, event.target.value)
                          }} class="btn btn-info text-white"> Buy  </button>
                      : null
                    }
                    </td>
              </tr>
                    )
                })}
              
              
            </tbody>
    
 
</table>
  


            </div>
            
        
          
        </div>
        
        
      );
    }
  }
  
  export default Main;