const d = require('mongoose')
const x = new d.Schema
({
    amount :{
        type : Number
    },
    category : {
        type : String
    },
    date : {
        type : String
    }
})
const Expense = d.model('expenses',x)
module.exports = {Expense}