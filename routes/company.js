const express = require('express');
const router = express.Router();
router.use(express.json());
const comname = require("./companydetails");

router.get('/',(req,res) => res.send("Company Details"));

//Insert
router.post("/insertcompany",(req,res) => {
    const { newcompany } = req.body;
    comname.push(newcompany);
    res.json({data:"Company Inserted Successfully!!"});    
});

//fetch company details based on product name
router.get("/fetch_comp/:pname",(req,res)=>{
  const prodname = req.params.pname;
  const prod = require("./productdetails");
  var com =[];
  const prod1 = prod.filter((a)=>(a.title === prodname));
  if(prod1.length >=0)
  {
    com = prod.filter((b)=>(b.comid === prod1[0].comid));
  }
  else
  { 
    com ="Data not found!!";  
  }
  res.json({data:com});
});

//Update
router.put("/updcompany/:prodnm",(req,res)=>{
  const pname = req.params.prodnm;
  const product_data = require("./productdetails");
  var prnm =[];
  const prod1 = product_data.filter((prod)=>(prod.title === pname));
  if(prod1.length>0)
  {
      prnm = comname.filter((companydetail)=>(companydetail.comid === prod1[0].comid));

      

      res.json({data:"Company Updated!!"})
  }
  else
  {
      res.json({data:"Company not updated!!"});
  }
});
module.exports = router;

//Delete
router.delete("/delcompany/:cname1",(req,res)=>{
    const companyname = req.params.cname1;
    const comname1 = comname.filter((delc) => (delc.cname === companyname));
    if(comname1.length > 0)
    {
        var dele = comname.indexOf(comname[1]);
        comname.splice(dele,1);
        res.json({data:"Company Deleted!!"})
    }
    else
    {
        res.json({data:"Company not Deleted!!"});
    }
});
module.exports = router;