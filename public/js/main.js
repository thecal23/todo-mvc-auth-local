const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const dateSelect = document.querySelectorAll(".dateSelect")
const searchDate = document.querySelectorAll(".searchDate")
const modifyBtn = document.querySelectorAll('.modify')
const modifyPaymentType = document.querySelectorAll('.dropDown')
const deliveryStatusElement = document.querySelectorAll('.deliveryStatus')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(modifyPaymentType).forEach((el)=>{
    el.addEventListener('change', modifyTodo)
})

Array.from(deliveryStatusElement).forEach((el)=>{
    el.addEventListener('click', statusUpdate)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(dateSelect).forEach((el)=>{
    el.addEventListener('change', selectDate)
})

Array.from(searchDate).forEach((el)=>{
    el.addEventListener('change', dateSearch)
})

let currentStatus = "Not Delivered"
async function updateDeliveryStatus(e){
    console.log(e.target.value)
    if (currentStatus === 'Not Delivered') {
        this.style.backgroundColor = '#00ff64';
        this.textContent = "Delivered"
        currentStatus = 'Delivered';
      } else {
        this.style.backgroundColor = '#ff0000';
        this.textContent = 'Not Delivered'
        currentStatus = 'Not Delivered';
    }
    
}

async function dateSearch(e){
    console.log(e.target.value)

    location.replace(`http://localhost:2121/todos?date=${e.target.value}`) 
}

async function selectDate(e){
    console.log(e.target.value)
    
    location.search = `?date=${e.target.value}`
    
}

async function modifyTodo(e){
    /* const modifyId = this.parentNode.dataset.id */
    const modifyId = this.closest('[data-id]').dataset.id
    const modifiedPaymentType = e.target.value

    console.log('modified',modifyId)
    console.log(modifiedPaymentType)
    try{
        const response = await fetch('/todos/modifyTodo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': modifyId,
                'modifiedPaymentType': modifiedPaymentType
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('/todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function statusUpdate(){
    const statusId = this.closest('[data-id]').dataset.id
    try{
        const response = await fetch('/todos/statusUpdate', {
            method:'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'statusIdFromJSFile': statusId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('/todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('/todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}