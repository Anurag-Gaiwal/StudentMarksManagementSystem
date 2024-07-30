const express = require("express");
const cors = require("cors");
const {MongoClient}= require("mongodb");
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());

const server = process.env.SERVER;

app.post("/save",(req,res)=>{
	const url = server
	const client  = new MongoClient(url);
	const db = client.db("sms26june24");
	const coll = db.collection("SMSCOLLMONGO");
	const record = {"_id":req.body.rno,"name": req.body.name, "marks": req.body.marks}
	coll.insertOne(record)
	.then(result=>res.send(result))
	.catch(error=>res.send(error));
})

app.get("/gs",(req,res)=>{
	const url = server
	const client  = new MongoClient(url);
	const db = client.db("sms26june24");
	const coll = db.collection("SMSCOLLMONGO");
	coll.find({}).toArray()
	.then(result=>res.send(result))
	.catch(error=>res.send(error));
})

app.delete("/rs",(req,res)=>{
	const url = server
	const client  = new MongoClient(url);
	const db = client.db("sms26june24");
	const coll = db.collection("SMSCOLLMONGO");
	const record = {"_id":req.body.rno}
	coll.deleteOne(record)
	.then(result=>res.send(result))
	.catch(error=>res.send(error));
})

app.put("/us",(req,res)=>{
	const url = server
	const client  = new MongoClient(url);
	const db = client.db("sms26june24");
	const coll = db.collection("SMSCOLLMONGO");
	const whom = {"_id":req.body.rno};
	const what = {"$set":{"name": req.body.name, "marks": req.body.marks}}
	coll.updateOne(whom,what)
	.then(result=>res.send(result))
	.catch(error=>res.send(error));
})



app.listen(9000,()=>{console.log("Ready @ 9000")})