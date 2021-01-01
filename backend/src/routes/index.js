const{ Router } = require('express')
const router = Router();

const User = require('../models/user')

const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.post('/signup', async (req,res)=> {
    const { email, password} = req.body
    console.log(email, password)
    const newUser = new User({email, password})
    await newUser.save()

    const token = jwt.sign({_id:newUser._id }, 'secretKey')
    res.status(200).json({token})
})


router.post('/signin', async (req,res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(401).send("the email doesn exist")
    if(user.password !== password) return res.status(401).send('wrong password')
    const token = jwt.sign({_id: user._id }, 'secretKey')
    return res.status(200).json({token})
})


router.get('/tasks', (req, res) => {
    res.json([{
        _id: 1,
        name: 'Task one',
        description: 'descripcion aca',
        date: ""

    },
    {
        _id: 2,
        name: 'Task two',
        description: 'descripcion dos aca',
        date: ""

    },{
        _id: 3,
        name: 'Task three',
        description: 'descripcion tres aca',
        date: ""

    }])
})

router.get('/private-tasks', verifyToken, (req, res) => {

    res.json([{
        _id: 1,
        name: 'Task one',
        description: 'private descripcion aca',
        date: ""

    },
    {
        _id: 2,
        name: 'Task two',
        description: 'private descripcion dos aca',
        date: ""

    },{
        _id: 3,
        name: 'Task three',
        description: 'private descripcion tres aca',
        date: ""

    }])
})

router.get('/profile', verifyToken,(req,res)=> {
    res.send(req.userId)
})

module.exports = router

function verifyToken(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send('No tiene token')
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status(401).send('No tiene token')
    }

    const payload = jwt.verify(token, 'secretKey')
    req.userId = payload._id
    next()
}