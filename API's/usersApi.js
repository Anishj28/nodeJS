//create mini express app
const exp = require('express')
const userApi = exp.Router();
//import MongoCLient
const mc = require("mongodb").MongoClient;

//connection string
const databaseUrl = "mongodb+srv://project1:santrocar@anish28.88qyf.mongodb.net/mydb?retryWrites=true&w=majority"

let databaseObj;

//connect to DB
mc.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log("err in db connection", err);
    }
    else {
        //get database object
        databaseObj = client.db("mydb")
        console.log("connected to database")

    }
})




//sample route
//http://localhost:3000/user/getusers
userApi.get("/getusers", (req, res, next) => {

    //read docs from user collection
    userCollectionObj.find().toArray((err, usersList) => {

        //deal with error
        if (err) {
            console.log("err in reading users data", err)
            res.send({ message: err.message })
        }
        else {
            res.send({ message: usersList })
        }
    })
})


//http://localhost:3000/user/getuser/<username>
userApi.get("/getuser/:username", (req, res, next) => {

    //get username from url params
    let un = req.params.username;

    //search for user
    userCollectionObj.findOne({ username: un }, (err, userObj) => {
        if (err) {
            console.log("err in reading users data", err)
            res.send({ message: err.message })
        }

        //if user not existed
        if (userObj === null) {
            res.send({ message: "User not found" })
        }
        //if user existed
        else {
            res.send({ message: userObj })
        }


    })
})









//http://localhost:3000/user/createuser
userApi.post("/createuser", (req, res, next) => {

    //get user obj
    let newUser = req.body;

    //check user in db with  this username
    userCollectionObj.findOne({ username: newUser.username }, (err, userObj) => {

        if (err) {
            console.log("err in reading users data", err)
            res.send({ message: err.message })
        }

        //if user not existed
        if (userObj === null) {
            //create new user
            userCollectionObj.insertOne(newUser, (err, success) => {
                if (err) {
                    console.log("err in reading users data", err)
                    res.send({ message: err.message })
                }
                else {
                    res.send({ message: "New user created" })
                }
            })
        }
        else {
            res.send({ message: "User already existed" })
        }

    })
})







//http://localhost:3000/user/updateuser/<username>
userApi.put("/updateuser/:username", (req, res, next) => {

    //get modified user
    let modifiedUser = req.body;

    //update
    userCollectionObj.updateOne({ username: modifiedUser.username }, {
        $set: { ...modifiedUser }
    }, (err, success) => {

        if (err) {
            console.log("err in reading users data", err)
            res.send({ message: err.message })
        }
        else {
            res.send({ message: "User updated" })
        }
    })

})

//export
module.exports = userApi;