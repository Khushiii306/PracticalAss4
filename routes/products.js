const express = require('express');
const router = express.Router();
router.use(express.json());
router.get('/',(req,res) => res.send("Product Details"));

//Insert
const proddet = require("./productdetails");
router.post("/insertproduct",(req,res) => {
    const { newproduct } = req.body;
    proddet.push(newproduct);
    res.json({data:"Product Inserted Successfully!!"});
});

//fetch all the product of company
router.get("/fetch_prod/:companyid",(req,res)=>{
    const cname = req.params.companyid;
    const product_list = proddet.filter((ab) => (ab.comid === cname));
    res.json({data:product_list});
});

//fetch all the product of a seller
router.get("/fetch_seller/:sellerid",(req,res)=>{
    const sellid = req.params.sellerid;
    const seller_list = proddet.filter((ab) => (ab.selid === sellid));
    res.json({data:seller_list});
});

//Update

router.put("/updproduct/:prodcat",(req,res)=>{
    const prodcat = req.params.prodcat;
    const prodname = proddet.filter((updp) => (updp.category === prodcat));
    if(prodname.length > 0)
    {
        var updatecat = proddet.indexOf(prodname[1]);
        
        res.json({data:"Product Updated!!"});
    }
    else
    {
        res.json({data:"Product not updated!!"});
    }
});

//Delete
router.delete("/delproduct/:producttitile",(req,res)=>{
    const prodtitile = req.params.producttitile;
    const prodname = proddet.filter((delp) => (delp.title === prodtitile));
    if(prodname.length > 0)
    {
        var dele = proddet.indexOf(prodname[1]);
        proddet.splice(dele,1);
        res.json({data:"Product Deleted!!"});
    }
    else
    {
        res.json({data:"Product not Deleted!!"});
    }
});

module.exports = router;