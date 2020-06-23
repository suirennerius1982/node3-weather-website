console.log('Javascript runnning in the client')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {    
    e.preventDefault()
    const locationSelected = search.value    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch(`/weather?address=${locationSelected}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.locality
                messageTwo.textContent = `Part weather in ${locationSelected} is ${data.weather}, in country ${data.country} 
                locality ${data.locality}. The temperature is: ${data.temperature} and the 
                windChillFactor ${data.windChillFactor}`
            }
        })
    })
})