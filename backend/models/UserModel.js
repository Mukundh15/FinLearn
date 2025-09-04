const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
    },
    VirtualAmount:{
        type:Number,
        default:10000
    }
},{timestamps: true})

UserSchema.pre('save',async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports=mongoose.model('User', UserSchema);