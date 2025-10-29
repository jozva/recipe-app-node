const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = "mongodb://localhost:27017";
const db_name = "products";
const ObjectId = mongodb.ObjectId


app.use(cors({
    origin: "https://rococo-jelly-00b6bf.netlify.app"
}))
app.use(express.json())


app.get("/user", async (req, res) => {
    try {
        const connection = await mongoClient.connect(URL)
        const db = connection.db(db_name)
        const collection = db.collection("product")
        const data = await collection.find({}).toArray()
        await connection.close()
        res.json(data)
    }
    catch (error) {
        console.log(error)
    }
})
app.post("/user", async (req, res) => {
    try {
        const connection = await mongoClient.connect(URL)
        const db = connection.db(db_name)
        const collection = db.collection("product")
        await collection.insertOne(req.body)
        await connection.close()
        res.json({ Message: "User create successfully" })
    }
    catch (error) {
        console.log(error)
    }
})


app.delete("/user/:id", async (req, res) => {
    try {
        const connection = await mongoClient.connect(URL)
        const db = connection.db(db_name)
        const collection = db.collection("product")
        const data = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        await connection.close()
        res.json({ message: "User delete successfully" })
    } catch (error) {
        console.log(error)
    }
})

app.put("/user/:id", async (req, res) => {
    try {
        const connection = await mongoClient.connect(URL)
        const db = connection.db(db_name)
        const collection = db.collection("product")
        await collection.findOneAndUpdate({ _id: new ObjectId(req.params.id) },{$set:req.body})
        await connection.close()
        res.json({ message: "User update successfully" })
    } catch (error) {
        console.log(error)
    }
})

app.listen(8000)