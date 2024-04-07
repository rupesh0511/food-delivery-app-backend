const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try{
        // console.log(global.foodData);
        res.send([global.foodData,global.categoryData])

    }catch(error){
        console.log(error);
        res.send("server error");

    }
})

module.exports = router;