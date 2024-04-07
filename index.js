// console.log("Starting");

const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/createUser');
const display = require('./routes/displayData');

// mongodb+srv://rupeshmandalrk115:rpachapach@cluster0.unyo99z.mongodb.net/zomato

// const url = "mongodb+srv://rupeshmandalrk115:rpachapach@cluster0.unyo99z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

// mongoose.connect("mongodb+srv://rupeshmandalrk115:rpachapach@cluster0.unyo99z.mongodb.net/zomato")
// .then(()=>{
//     console.log("database connected successfully");
//     // const fetched_data = mongoose.connection.db.collection("food_items");
//     // console.log(fetched_data);
    
// })
// .catch((err)=>{
//     console.log("error connecting",err);
// })
// const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect("mongodb+srv://rupeshmandalrk115:rpachapach@cluster0.unyo99z.mongodb.net/zomato", { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const foodCollection = mongoose.connection.db.collection("food_items");
        global.foodData = await foodCollection.find({}).toArray();
        // console.log(foodData);

        const categoryCollection = mongoose.connection.db.collection("foodCategory");
        global.categoryData = await categoryCollection.find({}).toArray();

        // processResults(null, foodData, categoryData);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        // processResults(err);
    }
})();

// function processResults(err, foodData, categoryData) {
//     if (err) {
//         console.error("Error fetching data:", err);
//         return;
//     }

//     // console.log("Food Data:", foodData);
//     // console.log("Category Data:", categoryData);
    

//     // Continue processing or handling data here
// }


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());

app.use("/api",userRoute);
app.use("/api",display);


// app.get('/',(req,res)=>{
//     res.send('Welcome');
// } )

app.listen(5000,()=>{
    console.log("server is up and running");
})