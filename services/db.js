const mongoose = require('mongoose')

// connection string
mongoose.connect('mongodb://localhost:27017/movies',()=>{
    console.log("mongodb connected successfully");
})

// models of collections

const User = mongoose.model('User',{
      username:String,
       email:String,
       phone:Number,
       password:String,
    })

const Admin = mongoose.model('Admin',{
        adminname:String,
         email:String,
         password:String
    })

const Film = mongoose.model('Film',{
        movie:String,
         dirc:String,
         actor:String,
         cat:String,
         desc:String,
         time:String,
         image:String
    })
//to store Watchlater
const Watchlater = mongoose.model('Watchlater',
{
    
         movie:String,
         dirc:String,
         actor:String,
         cat:String,
         desc:String,
         time:String,
         image:String
  })


    // export model
    module.exports={
        User,
        Admin,
        Film,
        Watchlater
    }