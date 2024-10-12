const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const app = express();
const user = require('./models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const jwtSecret = "qebcierbcervcrefwfvcrvre;"

const bcryptSalt  = bcrypt.genSaltSync(12);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

// console.log('Mongo URL', process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get('/test',(req,res) => {
    console.log('Port is running on 4000')
    res.json("It's going great")
})

app.post('/register', async (req,res) => {
    const {name,contact,email,password} = req.body;
    const userDoc = await user.create({
        name,
        contact,
        email,
        password: bcrypt.hashSync(password,bcryptSalt),
    })
    res.json(userDoc);
})

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    console.log("Email : ",email);
    console.log("Password : ",password);
    const userDoc = await user.findOne({email});
    
    if(userDoc){
        const passOk =  bcrypt.compareSync(password,userDoc.password);
        if(passOk)
        {
            jwt.sign({email : userDoc.email,
                id : userDoc._id},
                jwtSecret,{},(err,token) => {
                if(err)
                {
                    throw err;
                }
                res.cookie('token',token).json(userDoc);  
            });
        }
        else{
            res.status(422).json("Wrong Password");
        }
    }
    else{
        res.json("User not found");
    }
})

app.get('/profile',(req,res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData) => { // here userdata is nothing but token only
            if(err){
                throw err;
            }
            const {name,email,contact,_id} = await user.findById(userData.id);
            res.json({name,email,contact,_id});
        })
    }
    else
    {
        res.json(null);
    }
})

// app.get('/account',(req,res) => {

// })

app.listen(4000);

// 3JVEtiMPSWEKsh21