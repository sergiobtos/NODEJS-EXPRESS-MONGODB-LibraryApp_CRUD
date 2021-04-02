const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(bodyParser.json());

// Connect to our database
mongoose.connect("mongodb+srv://admin:admin@lab3.uxvq8.mongodb.net/Lab03?authSource=admin&replicaSet=atlas-l7cxlf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", () => {
        console.log("Database connected - Customers service")
    })

    // Load out model
    require("./Customer")
    const Customer = mongoose.model("Customer")

    app.post("/customer", (req, res) => {

        var newCustomer = {
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        }

        var customer = new Customer(newCustomer)

        customer.save().then(() => {
            res.send("Customer created")
        }).catch((err) => {
            if(err){
                throw err
            }
        })

    })

    app.get("/customers", (req, res) => {
        Customer.find().then((customers) => {
            res.json(customers)
        }).catch((err) => {
            if(err){
                throw err
            }
        })
    })

    app.get("/customer/:id", (req, res) =>{

        Customer.findById(req.params.id).then((customer) => {
            if(customer){
                res.json(customer)
            }else{
                res.send("Invalid ID!")
            }
        }).catch((err) => {
            if(err){
                throw err
            }
        })

    })

    app.delete("/customer/:id", (req, res) => {
        Customer.findByIdAndRemove(req.params.id).then(() => {
            res.send("Customer deleted with success!")
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
    })

app.listen("5555", () => {
    console.log("Up and running - Cutomers service")
})