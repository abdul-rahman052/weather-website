console.log("client side js")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    console.log(location)
    message1.textContent='Loading....'
    message2.textContent=''

    fetch('/weather?search='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                message1.textContent=data.error;
            }
            else{
                console.log(data.forecast)
                console.log(data.location)
                message1.textContent=data.location;
                message2.textContent=data.forecast;
            }
        })
    })
    
})