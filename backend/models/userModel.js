const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

//firstName, lastName, email, password
const userSchema=mongoose.Schema({
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        default:"user",
        required:false
    }
},{timestamps:true})


//sign up and login are like opposite if user is found during sign up then throw error but if user is found during login then don't throw error
// in both cases(login and sign up) we throw errors first then apply actual logics respectively

userSchema.statics.signup=async function(email,password,firstName,lastName){
    if(!email || !password || !firstName || !lastName) throw Error("Enter all fields");
    if(!validator.isEmail(email)) throw Error("Email is not valid");
    if(!validator.isStrongPassword(password)) throw Error("Password must contain that shit");

    const e=email.toLowerCase();

    const u=await this.findOne({email:e});

    // if(u) throw Error("email already exist");

    // const salt=await bcrypt.genSalt(10);
    // const hash=await bcrypt.hash(password,salt);

    // const user= await this.create({email:uName,password:hash});

    // return user;

    if(!u){
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);

        const user= await this.create({email:e,password:hash,firstName,lastName});

        return user;
    }
    else throw Error("email already exist");
}

userSchema.statics.login=async function(email,password){
    if(!email || !password) throw Error("Enter all fields");

    const e=email.toLowerCase();

    const u=await this.findOne({email:e});

    // if(!u) throw Error("User not exist or inccorect email");

    // const match=await bcrypt.compare(password,u.password);

    // if(!match) throw Error("Incorrect password");
    
    // return u;

    if(u){
        const match = await bcrypt.compare(password, u.password);

        if (!match) throw Error("Incorrect password");

        return u;
    }
    else throw Error("User not exist or inccorect email");
}

module.exports=mongoose.model('User',userSchema);