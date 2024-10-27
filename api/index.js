const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const app = express();
const user = require('./models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const Place = require('./models/Place.js')

const jwtSecret = "qebcierbcervcrefwfvcrvre;"

const bcryptSalt  = bcrypt.genSaltSync(12);

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

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

app.post('/logout',(req,res) => {
    res.cookie('token','').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    try {
        await imageDownloader.image({
            url: link,
            dest: __dirname + '/uploads/' + newName,
            timeout: 20000, // Increase timeout to 20s (optional)
        });
        res.json(newName);
    } catch (err) {
        res.status(500).json({ error: 'Image download failed', details: err.message });
    }
});


const photosMiddleware = multer({dest:'uploads/'});    
app.post('/upload', photosMiddleware.array('photos',100), (req,res) => {
    res.json(req.files);
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

app.post('/accommodations',(req,res) => {
    const {token} = req.cookies;
    const {title,address,addimage,description,perks,extrainfo,checkin,checkout,maxguest} = req.body;
    
    jwt.verify(token,jwtSecret,{},async (err,userData) => { // here userdata is nothing but token only
        if(err){
            throw err;
        }
        const placeDoc = await Place.create({
           owner: userData.id,
           title,address,photos:addimage,description,perks,extrainfo,checkin,checkout,maxguest,
       });
       res.json(placeDoc);
    })
})


app.get('/accommodations', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData) => {
        const {id} = userData;
        res.json(await Place.find({owner:id}));
    });
})

app.get('/accommodations/:id', async (req,res) => {
   const {id} = req.params;
   res.json(await Place.findById(id));
})

app.put('/accommodations',async (req,res) => {
    const {token} = req.cookies;
    const {id,title,address,addimage,description,perks,extrainfo,checkin,checkout,maxguest} = req.body; 
    jwt.verify(token,jwtSecret,{},async (err,userData) => {
        if(err){
            throw err;
        }
        const placeInfo = await Place.findById(id);         
        if(userData.id === placeInfo.owner.toString()){
            placeInfo.set({
                title,address,photos:addimage,description,perks,extrainfo,checkin,checkout,maxguest,
            })
            await placeInfo.save();  
            res.json('Info Saved');
        } 
    }) 
})

app.listen(4000);

// 3JVEtiMPSWEKsh21