//import express 
const express = require('express')
//import cors
const cors = require('cors')

const server = express()
//import dataService
const dataService = require('./services/dataService')

//import jsonwebtoken
const jwt = require('jsonwebtoken') 

server.use(cors({
    origin:'http://localhost:4200'
}))
// parse json data
server.use(express.json())


server.listen(3000,()=>{
    console.log('Server started at 3000');
})

// application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log('Inside application specific middleware');
    next()
}
server.use(appMiddleware)

// token verifying middleware
const jwtMiddleware = (req,res,next)=>{
    console.log('Inside router specific middleware');
    // get token from req headers
    const token = req.headers['access-token']
    console.log(token);
    try{// verify token
   const data=jwt.verify(token,'secretemail000')
   console.log('Valid token');
    next()
} 
  catch{
    console.log('Invalid token');
    res.status(401).json({
        message:'Please Login..!!!'
    })
  }
} 

// token2 verifying middleware
const jwtMiddleware2 = (req,res,next)=>{
    console.log('Inside router2 specific middleware');
    // get token2 from req headers
    const adtoken = req.headers['access-adtoken']
    console.log(adtoken);
    try{// verify token2
   const data2=jwt.verify(adtoken,'secretemail001')
   console.log('Valid token');
    next()
} 
  catch{
    console.log('Invalid token');
    res.status(401).json({
        message:'Admin Please Login ..!!!'
    })
  }
} 

// register api
server.post('/register',(req,res)=>{
    console.log("Inside register api");
    console.log(req.body);

    dataService.register(req.body.name,req.body.email,req.body.phone,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// login api
server.post('/login',(req,res)=>{
    console.log("Inside login api");
    console.log(req.body);

    dataService.login(req.body.email,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// adminlogin api
server.post('/adminlogin',(req,res)=>{
    console.log("Inside admin login api");
    console.log(req.body);

    dataService.adminlogin(req.body.email,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// addItem api
server.post('/addItem',(req,res)=>{
    console.log("Inside addItem api");
    console.log(req.body);

    dataService.addItem(req.body.movie,req.body.dirc,req.body.actor,req.body.cat,req.body.desc,req.body.time,req.body.image)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// all-movies api
server.get('/all-movies',(req,res)=>{
    dataService.allmovies()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
//view-movie/'+movie api
server.get('/view-more/:movie',jwtMiddleware,(req,res)=>{
    dataService.viewMovie(req.params.movie)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//addwatchLater api
server.post('/add-to-watchlater',jwtMiddleware,(req,res)=>{
    dataService.addwatchLater(req.body)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get-watchLater api
server.get('/watch-later',(req,res)=>{
    dataService.getwatchLater()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//remove-item-watch later api
server.delete('/remove-item-wishlist/:movie',(req,res)=>{
    dataService.deleteWatchLater(req.params.movie)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//remove-movie from list (deleteAdminAdd)
server.delete('/remove-movie/:movie',jwtMiddleware2,(req,res)=>{
    dataService.deleteAdminAdd(req.params.movie)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})