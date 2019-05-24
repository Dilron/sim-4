require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcryptjs')

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive(CONNECTION_STRING).then(instance => {
    app.set('db', instance)
    console.log('db set')
    app.listen(SERVER_PORT, () => {
        console.log('listening on: ', SERVER_PORT)
    })
})

app.put('/put', (req, res) => {
    const db = app.get('db');
    console.log('fire put ', req.body)
    res.sendStatus(200)
})

app.post('/auth/register', (req, res) => {
    const db = app.get('db');
    const {session} = req
    const {username, password, profileRef} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    db.newUser({username, hash, profileRef}).then(response => {
        session.user = {
            username,
            userId: response[0].user_id
        }
        res.status(200).send(response[0])
    }).catch(err => console.log('error registering user: ', err))
})

app.post('/auth/login', async (req, res) => {
    const db = app.get('db');
    const {session} = req;
    const {username} = req.body;
    try{
        const user = await db.loginUser({username}).catch(err => console.log('error logging in: ', err))
        const {user_id, profile_ref: profileRef} = user[0]
        const authenticated = await bcrypt.compareSync(req.body.password, user[0].hash)
        if(authenticated){
            session.user = {
                username: username,
                userId: user_id
            }
            return res.status(200).send({authenticated, profileRef})
        } else {
            throw new Error(401)
        }
    }catch(err){
        res.sendStatus(401)
    }
})