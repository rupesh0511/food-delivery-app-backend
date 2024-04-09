// console.log("Starting");

const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/createUser');
const display = require('./routes/displayData');
const orderRoute = require('./routes/orderData');


const app = express();


(async () => {
    try {
        await mongoose.connect("mongodb+srv://rupeshmandalrk115:rpachapach@cluster0.unyo99z.mongodb.net/zomato", { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const foodCollection = mongoose.connection.db.collection("food_items");
        global.foodData = await foodCollection.find({}).toArray();
     

        const categoryCollection = mongoose.connection.db.collection("foodCategory");
        global.categoryData = await categoryCollection.find({}).toArray();

      
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        
    }
})();




app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","https://food-delivery-app-frontend-three.vercel.app")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());

app.use("/api",userRoute);
app.use("/api",display);
app.use("/api",orderRoute);



app.listen(10000,()=>{
    console.log("server is up and running");
})