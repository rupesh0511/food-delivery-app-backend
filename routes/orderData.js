const express = require('express');
const router = express.Router();

const orderModel = require('../models/orders');

router.post('/orderData',async (req,res)=>{
    let data = req.body.order_data
    await data.splice(0,0,{ Order_date: req.body.order_date})

    let eId = await orderModel.findOne({'email':req.body.email})
    
    if(eId===null){
        try{
            await orderModel.create({
                email:req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success:true});
            })
        }catch(err){
        
            res.send("Server error",err.message);
        }
    }else{
        try{
            await orderModel.findOneAndUpdate({'email':req.body.email},
        {$push:{order_data:data}}).then(()=>{
            res.json({success:true});
        })
        }catch(err){
            res.send("server error",err.message);
          
        }
    }
})


module.exports = router;