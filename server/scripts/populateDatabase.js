const fetch = require('node-fetch');

const axios = require('axios')
const signupApi = 'http://localhost:3001/api/v1/user/signup'

const users = [
  {
    firstName: 'Bojack',
    lastName: 'Horseman',
    email: 'bj@horseman.com',
    password: 'password789'
  },
  {
    email: 'pt@griffin.com',
    password: 'password987',
    firstName: 'Peter',
    lastName: 'Griffin'
  }
]

/* users.forEach(user => {
  
  fetch(signupApi,{
    method: 'POST',
    data: user,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}) */


users.forEach(user => {
  axios
    .post(signupApi, user)
    .then(response => console.log(response))
    .catch(error => console.log(error))
})
w