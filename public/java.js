const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

form.addEventListener('submit' , (event) => {
    event.preventDefault()

    message1.textContent = 'Loading...'

    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
        message1.textContent = data.error
        message2.textContent = ''
        }
        else{
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
    })
})
})