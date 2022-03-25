const express = require('express');
const mongoose = require('mongoose')
const empty = require('is-empty')
const bodyParser = require('body-parser')
const userSchema = require('./Models/userSchema')
const cors = require('cors')
const app = express();
const port = 1005

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
//cors----------
app.use(cors({ origin: "*" }))


app.get('/test', (req, res) => {
    console.log("****welcome route****");
    return res.json({ status: true, message: "router is success" });
});

app.post('/employeeLogin', async(req, res) => {
    let error = {}
    if (empty(req.body.name)) {
        error.name = "Employee name required"
    }
    if (empty(req.body.age)) {
        error.age = "Employee age required"
    }
    if (empty(req.body.id)) {
        error.id = "Employee id required"
    }
    if (!empty(error)) {
        return res.json({ status: false, error: error })
    }
    let checkData = await userSchema.findOne({ name: req.body.name })
    if (checkData) {
        return res.json({
            status: false,
            "error": { "name": 'name already exist' }
        })
    }
    let Data = await userSchema.findOne({ id: req.body.id })
    if (Data) {
        return res.json({
            status: false,
            error: { "id": 'Employee id already exist' }
        })
    }
    const newUser = userSchema({
        name: req.body.name,
        age: req.body.age,
        id: req.body.id,
    })
    let data = await newUser.save()
    if (data) {
        return res.json({ status: true, message: "Login Success" })
    }

})

app.get("/allUser", async(req, res) => {
    let users = await userSchema.find({})
        // console.log(users, "///////////////");
    return res.json({ status: true, data: users })
})

app.post('/delete', async(req, res) => {
    await userSchema.deleteOne({ _id: req.body.id })
    return res.json({ status: true, message: "delete successful" })
})


mongoose.connect("mongodb+srv://test:test@cluster0.rxt1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    console.log("Mongodb connection is successful");
}).catch(() => {
    console.log("Mongodb connection failed");
})


app.listen(port, () => {
    console.log("Server is running on " + port);
});