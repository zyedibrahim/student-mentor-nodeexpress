import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from "express";
import cors from "cors"
const app = express();

import { MongoClient, ObjectId } from "mongodb";
// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.use(express.json())
app.use(cors())

const PORT = 4000;
app.get("/", async function (request, response) {

    const result = await client
    .db("mentor_student")
    .collection("student")
    .find({})
    .toArray()
    
    response.send(result)


});

app.get("/students", async function(request,response){

const result = await client
.db("mentor_student")
.collection("student")
.find({})
.toArray()

response.send(result)

} )
app.delete("/students/:id", async function(request,response){
const {id} =request.params;
const result = await client
.db("mentor_student")
.collection("student")
.deleteOne({_id:new ObjectId(id)})

response.send(result)

} )
app.get("/mentors", async function(request,response){

const result = await client
.db("mentor_student")
.collection("mentor")
.find({})
.toArray()

response.send(result)

} )
app.delete("/mentors/:id", async function(request,response){
    const {id} =request.params;
const result = await client
.db("mentor_student")
.collection("mentor")
.deleteOne({_id:new ObjectId(id)})

response.send(result)

} )

app.post("/students", async function(request,response){

const bodydata = request.body

const result = await client
.db("mentor_student")
.collection("student")
.insertMany(bodydata)

response.send(result)

} )
app.post("/mentors", async function(request,response){

const bodydata = request.body

const result = await client
.db("mentor_student")
.collection("mentor")
.insertMany(bodydata)

response.send(result)

} )

app.put("/mentors/:id", async function(request,response){
const {id} = request.params
const bodydata = request.body



const result = await client
.db("mentor_student")
.collection("mentor")
.updateOne({_id: id},{$set: { student:bodydata}} )



response.send(result)


} )


app.put("/removementors/:id", async function(request,response){
const {id} = request.params
const bodydata = request.body



const result = await client
.db("mentor_student")
.collection("mentor")
.updateOne({_id:id},{$pull: {student:bodydata}} )

response.send(result)


} )





app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));