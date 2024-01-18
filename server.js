 const express = require("express");
 require("dotenv").config();
 require("./config");
 const userRouter = require("./routers/userrouter");
 const transferRouter = require("./routers/tranferrouter");

 const app = express();
 app.use(express.json());
 app.use("/uploads",express.static("uploads"));

 app.use('/api/v1/user',userRouter);

 app.use('/api/v1',transferRouter);

 
 const port = process.env.port

 app.listen(port,()=>{
    console.log(`server is listening to port ${port}`)
 })