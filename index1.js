const s = require('express')
const r = require('mongoose')
const {Expense }= require('./schema.js')
const m = s()
const bodyparser = require('body-parser')
 const w = require('cors')
 m.use(w())
m.use(bodyparser.json(''))
async function connectToDb(){
   try{
    await r.connect('mongodb+srv://smartysathish664:sathish745@cluster0.0e1i3b8.mongodb.net/expensetracker?retryWrites=true&w=majority&appName=Cluster0')

    const port = process.env.port || 8000 
    m.listen(port,function(){
    console.log('listening on port ${port}...')
})
   }
   catch(error){
    console.log(error)
    console.log("connection failiure")
   }
}
connectToDb()
//
// })
m.post('/add-expenses', async function(request, response){
   try{
    await Expense.create({
        "amount":request.body.amount,
        "category" :request.body.category,
        "date" : request.body.date
    })
    response.status(200).json({
        "status" : "success"
    })
   }
   catch(error){
    response.status(500).json({
        "status" : "not",
        "error" : error
    })
    }
})
 
 m.get('/get-expenses',async function(request,response){
     const expensedata = await Expense.find()
        response.status(201).json(expensedata);
 })

 m.patch('/update-expenses/:id', async function(request,response){
    try{
        const expenseentry = await Expense.findById(request.params.id)
        if(expenseentry){
           await  expenseentry.updateOne({
            "amount":request.body.amount,
            "category" :request.body.category,
             "date" : request.body.date

           })
        }
        response.status(201).json({
            "status" : "found"

        })

    }
    catch(error){
        console.log("can not found")
    }
 })
