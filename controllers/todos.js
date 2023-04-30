const Todo = require('../models/Todo')
const fs = require('fs')

module.exports = {
    getTodos: async (req,res)=>{
        console.log('beforeIfstatement',req.query.date)
        let queryDate = req.query.date
        if(queryDate === undefined){
            let currentDate = new Date().toJSON().slice(0, 10);
            queryDate = currentDate
        }
        
        console.log('getTodosReq',req.query.date)
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id, date: queryDate})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false, date: queryDate})
            let cash = 0 
            let debit = 0
            let mastercard = 0 
            let visa = 0
            let totalSales = 0  
            let selectedOption = 'Modify Payment Type'
            for(let i = 0; i < todoItems.length; i++){
                if(todoItems[i].paymentType === 'Cash'){
                    cash += todoItems[i].total
                } else if(todoItems[i].paymentType === 'Debit'){
                    debit += todoItems[i].total
                }  else if(todoItems[i].paymentType === 'Visa'){
                    visa += todoItems[i].total
                } else if(todoItems[i].paymentType === 'MasterCard'){
                    mastercard += todoItems[i].total
                }     
            }
            totalSales = cash + debit + visa + mastercard
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, cash:cash, debit:debit , visa: visa, mastercard: mastercard, date: queryDate, result: totalSales, selectedOption: selectedOption})
            location.search = `?date=${queryDate}`

        }catch(err){
            console.log(err)
        }
    },
    downloadCSV: async (req,res) => {
        console.log('downloadcsv',req.body.date) //access through req.body since the form data is coming from a POST req
        let queryDate = req.body.date
        if(queryDate === undefined){
            let currentDate = new Date().toJSON().slice(0, 10);
            queryDate = currentDate
        }
        try{
            const todoItems = await Todo.find({userId:req.user.id, date: queryDate})
            let cash = 0 
            let debit = 0
            let mastercard = 0 
            let visa = 0
            let totalSales = 0  
            for(let i = 0; i < todoItems.length; i++){
                if(todoItems[i].paymentType === 'Cash'){
                    cash += todoItems[i].total
                } else if(todoItems[i].paymentType === 'Debit'){
                    debit += todoItems[i].total
                }  else if(todoItems[i].paymentType === 'Visa'){
                    visa += todoItems[i].total
                } else if(todoItems[i].paymentType === 'MasterCard'){
                    mastercard += todoItems[i].total
                }     
            }
            totalSales = cash + debit + visa + mastercard
            let csvString = ''
            for(let i=0; i<todoItems.length;i++){
                csvString += todoItems[i].todo.concat(',') + todoItems[i].address.concat(',') + `${todoItems[i].total}`.concat(',') + todoItems[i].paymentType.concat(',') + todoItems[i].date.concat(',') + '\n'
            }
            csvString += '\n' + 'Total Cash: ' + cash + '\n' + 'Total Debit: ' + debit + '\n' + 'Total Visa: ' + visa + '\n' + 'Total MasterCard: ' + mastercard + '\n' + 'Total Sales: ' + totalSales
            fs.writeFile(`${queryDate}.csv`, csvString, function(err) {
                if (err) throw err;
                console.log('Data written to file');
            });
            res.redirect(`/todos?date=${queryDate}`)
        }catch(err){
            console.log(err)
        }
    },
    searchTodo: async (req,res) =>{
        let currentDate = new Date().toJSON().slice(0, 10);

        let searchName = req.query.search
        console.log("search Todo",searchName)
/*         console.log(req)
 */
        try{
            const todoItems = await Todo.find({userId: req.user.id, todo: searchName})
            
            res.render('search.ejs', {todos: todoItems, date: currentDate, name: searchName})
            location.search = `?search=${searchName}`

        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, address: req.body.address, total: req.body.total, completed: false, userId: req.user.id, paymentType: req.body.paymentType, date: req.body.date})
            console.log('Todo has been added!')
            console.log(req.body)
            console.log(req.query)
            
            res.redirect(`/todos?date=${req.body.date}`) /* ?date=${req.body.date} */
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    modifyTodo: async (req,res) => {
        console.log(req.body.todoIdFromJSFile)
        console.log(req.body.modifiedPaymentType)
        try{
            await Todo.updateOne({_id:req.body.todoIdFromJSFile},{$set:{paymentType:req.body.modifiedPaymentType}})
            console.log('Modified Todo')
            res.json('Modified It')
        }catch(err){
            console.log(err)
        }
    }
}    