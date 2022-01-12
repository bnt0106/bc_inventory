
const IPFSQuotation = artifacts.require('./IPFSQuotation.sol')
require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('IPFSQuotation', ([deployer, seller, buyer]) => {
    let ipfsquotation
    before(async () => {
        ipfsquotation = await IPFSQuotation.deployed()
    })
    describe('deployment', async () => {
        it('deploys successfully', async () => {
          const address = await ipfsquotation.address
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        })
        it('has a name', async () => {
            const name = await ipfsquotation.name()
            assert.equal(name, 'Dapp quotation')
          })
        })
        describe('quotations', async () => {
            let result, quotationCount
            before(async () => {
                
                result = await ipfsquotation.createQuotation('iphonex','aaaa', 'abcd1','10/2/2020', web3.utils.toWei('1','Ether'), { from: seller})
                quotationCount = await ipfsquotation.quotationCount()
            })   
            it('creates quotations', async () => {
                
                assert.equal(quotationCount, 1)
                const event = result.logs[0].args
                assert.equal(event.id.toNumber(),quotationCount.toNumber(), 'id is correct')
                assert.equal(event.name,'iphonex' , 'name is correct')
                assert.equal(event.content,'aaaa' , 'content is correct')
                assert.equal(event.cid,'abcd1' , 'cid is correct')
                assert.equal(event.date,'10/2/2020' , 'date is correct')
                assert.equal(event.price,'1000000000000000000' , 'price is correct')
                assert.equal(event.owner,seller , 'owner is correct')
                assert.equal(event.purchased,false , 'purchased is correct')
                
                await await ipfsquotation.createQuotation('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
                await await ipfsquotation.createQuotation('iphonex', 0, { from: seller }).should.be.rejected;
                await await ipfsquotation.createQuotation('abcd1', 0, { from: seller }).should.be.rejected;
                await await ipfsquotation.createQuotation('10/2/2020', 0, { from: seller }).should.be.rejected;
                await await ipfsquotation.createQuotation('aaaa', 0, { from: seller }).should.be.rejected;

            })
            it('lists quotation', async () => {
                const quotation = await ipfsquotation.quotations(quotationCount)
                assert.equal(quotation.id.toNumber(),quotationCount.toNumber(), 'id is correct')
                assert.equal(quotation.name,'iphonex' , 'name is correct')
                assert.equal(quotation.content,'aaaa' , 'content is correct')
                assert.equal(quotation.cid,'abcd1' , 'cid is correct')
                assert.equal(quotation.date,'10/2/2020' , 'date is correct')
                assert.equal(quotation.price,'1000000000000000000' , 'price is correct')
                assert.equal(quotation.owner,seller , 'owner is correct')
                assert.equal(quotation.purchased,false , 'purchased is correct')
                
                


            })
            it('sells quotation', async () => {
                let oldSellerBalance
                oldSellerBalance = await web3.eth.getBalance(seller)
                oldSellerBalance = new web3.utils.BN(oldSellerBalance)
                result = await ipfsquotation.purchaseQuotation(quotationCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')})
                const event = result.logs[0].args
                assert.equal(event.id.toNumber(),quotationCount.toNumber(), 'id is correct')
                assert.equal(event.name,'iphonex' , 'name is correct')
                assert.equal(event.content,'aaaa' , 'content is correct')
                assert.equal(event.cid,'abcd1' , 'cid is correct')
                assert.equal(event.date,'10/2/2020' , 'content is correct')
                
                assert.equal(event.price,'1000000000000000000' , 'price is correct')
                assert.equal(event.owner, buyer , 'owner is correct')
                assert.equal(event.purchased, true , 'purchased is correct')

                let newSellerBalance
                newSellerBalance = await web3.eth.getBalance(seller)
                newSellerBalance = new web3.utils.BN(newSellerBalance)

                let price
                price = web3.utils.toWei('1', 'Ether')
                price = new web3.utils.BN(price)
                
                const exepectedBalance = oldSellerBalance.add(price)

                assert.equal(newSellerBalance.toString(), exepectedBalance.toString())
                await ipfsquotation.purchaseQuotation(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;      
                await ipfsquotation.purchaseQuotation(quotationCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
                await ipfsquotation.purchaseQuotation(quotationCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
                await ipfsquotation.purchaseQuotation(quotationCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
            })
            
            })
})

