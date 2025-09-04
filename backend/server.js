if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express=require('express');
const app=express();
const port=process.env.PORT;
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const User=require('./models/UserModel');
const session=require('express-session');
const MongoStore = require('connect-mongo');
const ContactMessage=require('./models/ContactModel');
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));

const saltRounds=process.env.SALTROUNDS;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.error('Error connecting to MongoDB',err);
});

app.get('/profile',(req,res)=>{
    if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    res.json({ message: "Welcome!", user: req.session.user });
});

app.post('/login', async (req,res)=>{
  try{
    let {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({ error: "User not found"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({ error: "Invalid credentials" });
    }
    req.session.user={id:user._id,username:user.name,email:user.email,amount:user.VirtualAmount};
    res.status(200).json({message: "Login successful",user: req.session.user});
  }catch(err){
    res.status(500).json({ error: err.message });
  }
})

app.post('/Signup', async(req,res)=>{
  try{
      const {name,email,password,phonenumber}=req.body;
      const hashedPassword=await bcrypt.hash(password, parseInt(process.env.SALTROUNDS));
      const user=new User({
          name,
          email,
          password:hashedPassword,
          phonenumber
      });
      await user.save();
      req.session.user={id:user._id,username:user.name,email:user.email,amount:10000};
      res.status(201).json({ message: "User registered successfully",user: req.session.user});
  }catch(err){
      res.status(400).json({ error: err.message });
  }
})

app.post("/chat",async (req,res)=>{
  const {message}=req.body;
  try{
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          "Authorization": process.env.huggingfaceapi,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: message }),
      }
    );
    const data = await response.json();
    res.json({ reply: data[0].generated_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chatbot API error" });
  }
});

app.post("/contact",async (req,res)=>{
  try {
    const {name,email,subject,message }=req.body;
    const newMessage=new ContactMessage({name,email,subject,message});
    await newMessage.save();
    res.status(201).json({message: "Message sent successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})