const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());
const database = {
    users: [
        {
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
            }
    ],
    login: [
        {
         id: '987',
         hash: '',
         email: 'john@gmail.com'
        }
    ]
}

app.use(cors());

app.get('/', (req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res)=> {
    bcrypt.compare("apples", hash, function(err, res) {
        console.log('first guess', res)
    });
    bcrypt.compare("bacon", hash, function(err, res) {
        console.log("second", res)
    });
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
       res.json(database.users[0]);     
          } else {
       res.status(400).json('error logging in');
        }
})

app.post('./register', (req, res)=> {
    const { email, name, password } = reg.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res)=> {
    const { id } = req.params;
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
           return res.json(user);
        
        }
    })
    if (!found) {
        res.status(404).json('not found');
    }
})

app.put('./image', (req, res) => {
    const { id } = reg.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('not found');
    }
})



app.listen(3000, ()=> {
    console.log('app is running on port 3000');
});






