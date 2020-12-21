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
    const user = await user.findOne({email})
    if(!user) return res.status(401).send("the email doesn exist")
    if(user.password !== password) return res.status(401).send('wrong password')
    const token = jwt.sign({_id: user._id }, 'secretKey')
    return res.status(200).json({token})
})

module.exports = router