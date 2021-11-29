const express = require('express');
const router = express.Router();
router.use(express.json());
const { route } = require('./company');
router.get("/",(req,res) => res.send("Seller Details"));

//Insert
const selname = require("./sellerdetails");
router.post("/insertsel",(req,res)=>{
    const { sname } = req.body;
    selname.push(sname);
    res.json({data:"Seller Inserted Successfully!!"});
});

//fetch seller details based on product name
router.get("/fetch_data/:prodname",(req,res)=>{
    const prodname = req.params.prodname;
    const product_data = require("./productdetails");
    var sellname=[];
    const prod1 = product_data.filter((prod)=>(prod.title === prodname));
    if(prod1.length>0)
    {
        sellname = selname.filter((seldetails)=>(seldetails.selid === prod1[0].selid));
    }
    else
    {
        sellname = "Data not found!";
    }
    res.json({data:sellname})
});

//Update 
router.put("/updseller/:prodnm",(req,res)=>{
    const pname = req.params.prodnm;
    const product_data = require("./productdetails");
    var prnm =[];
    const prod1 = product_data.filter((prod)=>(prod.title === pname));
    if(prod1.length>0)
    {
        prnm = selname.filter((sellerdetail)=>(sellerdetail.selid === prod1[0].selid));

        res.json({data:"Seller Updated!!"})
    }
    else
    {
        res.json({data:"Seller not updated!!"});
    }
});

//Delete 
router.delete("/delseller/:selname",(req,res)=>{
    const sellername = req.params.selname;
    const s1 = selname.filter((seller1)=>(seller1.sname === sellername));
    if(s1.length > 0)
    {
        var dele = selname.indexOf(s1[1]);
        selname.splice(dele,1);
        res.json({data:"Seller Deleted!!"})
    }
    else
    {
        res.json({data:"Seller not Deleted!!"});
    }
});

module.exports = router

