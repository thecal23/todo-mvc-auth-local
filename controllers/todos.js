const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log('beforeIfstatement',req.query.date)
        queryDate = req.query.date
        if(queryDate === undefined){
            let currentDate = new Date().toJSON().slice(0, 10);
            queryDate = currentDate
        }
        
        console.log('getTodosReq',req.query.date)
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            let cash = 0 
            let debit = 0
            let mastercard = 0 
            let visa = 0 
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
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, cash:cash, debit:debit , visa: visa, mastercard: mastercard, date: queryDate})
            location.search = `?date=${queryDate}`

        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, address: req.body.address, total: req.body.total, completed: false, userId: req.user.id, paymentType: req.body.paymentType/* , date: req.body.date */})
            console.log('Todo has been added!')
            console.log(req.body)
            console.log(req.query)
            
            res.redirect(`/todos`) /* ?date=${req.body.date} */
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
    }
}    