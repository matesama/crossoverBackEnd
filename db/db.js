import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
.then (() => {
    console.log("Database connected successfully")
})
.catch((e)=> console.log(e.message))

const client = mongoose.connection;
client.on('error', (e) => console.log(e.message))

export default client;