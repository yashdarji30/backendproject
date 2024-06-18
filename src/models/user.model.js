import mongoose,{Schema} from "mongoose";
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unqiue: true,
        lowecase:true,
        trim: true,
        index:true

    },
    email : {
        
            type: String,
            required: true,
            unqiue: true,
            lowecase:true,
            trim: true,
            
    
        },
    fullname :{
        type: String,
        
        unqiue: true,
        lowecase:true,
        trim: true,
        index:true

    },
    avtar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String

    },
    watchHistory: [
        {
            type: Schema.type.ObjectId,
            ref: "Video"
        }
    ],
    password :{
        type: String,
        required: [true,"Password is required"]
    },
    refreshToken : {
        type : String
    }
   
},
{
    timestamps: true 
})

userSchema.pre("save",async function(next){
    if(!this.isModefied("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function (){
    jsonwebtoken.sign({
        _id : this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken = function (){
    jsonwebtoken.sign({
        _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User",userSchema)
