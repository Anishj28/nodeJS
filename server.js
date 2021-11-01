//create express app
const exp = require("express")
const app = exp();
const path=require("path")
//import APIS
const userApi = require("./API's/usersApi")

app.use(exp.static(path.join(__dirname,'./dist/backendAngular/')))

//execute specific api based on path
app.use("/user", userApi)


//invalid path
app.use((req, res, next) => {

    res.send({ message: `path ${req.url} is invalid` })
})

//error handling middleware
app.use((err, req, res, next) => {
    res.send({ message: `error is ${err.message}` })
})


//assign port
const port = 3000;
app.listen(port, () => console.log(`server on ${port}...`))