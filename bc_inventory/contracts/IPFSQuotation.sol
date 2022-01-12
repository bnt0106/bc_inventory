pragma solidity >=0.4.22 <0.9.0;

contract IPFSQuotation {
    string public name;
    uint public quotationCount = 0;
    mapping(uint => Quotation) public quotations;
     struct Quotation {
        uint id;
        string name;
         string content;
          string cid;
          string date;
        uint price;
        
        
        address payable owner;
        bool purchased;
    }
    event QuotationCreated(
        uint id,
        string name,
         string content,
          string cid,
          string date,
        uint price,
        
        
        address payable owner,
        bool purchased

    );
    event QuotationPurchased(
        uint id,
        string name,
        string content,
          string cid,
          string date,
        uint price,
        
        
        address payable owner,
        bool purchased

    );
    constructor() public {
        name= "Dapp quotation";
    }
    function createQuotation(string memory _name, string memory _content, string memory _cid, string memory _date, uint _price) public{
        require(bytes(_name).length > 0);
        require(bytes(_content).length > 0);
         require(bytes(_cid).length > 0);
        require(bytes(_date).length > 0);
        require(_price > 0);
        quotationCount ++;
        quotations[quotationCount] = Quotation(quotationCount, _name, _content,  _cid, _date, _price, payable(msg.sender), false);
        emit QuotationCreated(quotationCount, _name, _content, _cid, _date, _price, payable(msg.sender), false);
    }
     function purchaseQuotation(uint _id) public payable {
        
        Quotation memory _quotation = quotations[_id];
        
        address payable _seller = _quotation.owner;
         
        require(_quotation.id > 0 && _quotation.id <= quotationCount);
        require(msg.value >= _quotation.price);
        require(!_quotation.purchased);
        require(_seller != msg.sender);
        
        _quotation.owner = payable(msg.sender);
        _quotation.purchased = true;
        quotations[_id] = _quotation;
         payable (address(_seller) ).transfer(msg.value);
        
        emit QuotationPurchased(quotationCount, _quotation.name,_quotation.content,  _quotation.cid, _quotation.date, _quotation.price, payable(msg.sender), true);
    }
    
    
}
