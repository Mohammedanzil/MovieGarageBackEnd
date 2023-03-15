const db = require('./db')

//import jsonwebtoken
const jwt = require('jsonwebtoken') 

// register
const register = (name,email,phone,pswd)=>{

    console.log('Inside register function in data services');

    return db.User.findOne({
        email
    }).then((result)=>{
        console.log(result);
        if(result){
            
            return{
                statusCode:403,
                message:"Account already exist.....!"
            }
        }
        else{
            const newUser = new db.User({
                username:name,
                email,
                phone,
                password:pswd 
               
            })
            //to save new user in mongodb use save()
            newUser.save()
            return {
                statusCode:200,
                message:"registration successfull...."
                
            }
        }
    })

}

// login 
const login = (email,pswd)=>{
    console.log('Inside login function body');
    // check email,pswd in db
    return db.User.findOne({
        email,
        password:pswd
    }).then((result)=>{
        if(result){
            // generate token
            const token = jwt.sign({
                currentEmail:email
            },'secretemail000')
            return{
                statusCode:200,
                message:"Login successful",
                token
            }
        }
        else{
            return{
                statusCode:404,
                message:"Invalid Email / Password"
            }
        }
    })
}


// adminlogin
const adminlogin = (email,pswd)=>{
    console.log('Inside adminlogin function body');
    // check email,pswd in db
    return db.Admin.findOne({
        email,
        password:pswd
    }).then((result)=>{
        if(result){
             // generate token
             const adtoken = jwt.sign({
                currentEmail:email
            },'secretemail001')
            return{
                statusCode:200,
                message:"Admin Login successful",
                adtoken
            }
        }
        else{
            return{
                statusCode:404,
                message:"Invalid Email / Password"
            }
        }
    })
}

// addItem
const addItem = (movie,dirc,actor,cat,desc,time,image)=>{

    console.log('Inside Add item function in data services');

    return db.Film.findOne({
        movie
    }).then((result)=>{
        console.log(result);
        if(result){
            return{
                statusCode:403,
                message:"Account already exist.....!"
            }
        }
        else{
            const newMovie = new db.Film({
                movie,
                dirc,
                actor,
                cat,
                desc ,
                time,
                image
            })
            //to save new Movie in mongodb use save()
            newMovie.save()
            return {
                statusCode:200,
                message:"registration successfull...."

            }
        }
    })

}

// all_movies api
const allmovies = ()=>{

 return   db.Film.find().then
 ((result)=>{
    if(result){
        return{
            statusCode:200,
            allfilm:result
        }
    }
    else{
        return{
            statusCode:404,
            message:"No data is present"
        }
    }
    })
}

//view-movie
const viewMovie = (movie)=>{
    console.log(movie);
    return  db.Film.findOne({
        movie
    }).then((result)=>{
        if(result){
            console.log(result);
            return{
                
                statusCode:200,
                movie:result
            }
        }
        else{
            return{
                statusCode:404,
                message:"Movie is unavailable"
            }
        }
    })
}

// store data in watchLater
const addwatchLater = (film)=>{
    return  db.Watchlater.findOne({
        movie:film.movie
    }).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:"Movie already in the watch later"
            }
        }
        else{
            let newWatch = new db.Watchlater({
                movie:film.movie,
                dirc:film.dirc,
                actor:film.actor,
                cat:film.cat,
                desc:film.desc,
                time:film.time,
                image:film.image
            })
            newWatch.save()
            return{
                statusCode:200,
                message:"Item added to your watch later"
            }
        }
    })
}

//getwatchLater
const getwatchLater =()=>{
    return db.Watchlater.find()
   .then((result)=>{
   
    console.log(result);
    if(result){
        return{
            statusCode:200,
           watchlater:result
        }
    }
    else{
        return{
            statusCode:404,
            message:"Your Watch later list is empty"
        }
    }
   })
}


//delete-item -wishlist 
const deleteWatchLater = (movie)=>{
    return db.Watchlater.deleteOne({movie})
    .then((result)=>{
        if(result){
            //if delete successful then get the updated watch later
            return db.Watchlater.find()
            .then((result)=>{
             if(result){
                 return{
                     statusCode:200,
                     watchlater:result
                 }
             }
             else{
                 return{
                     statusCode:404,
                     message:"Watch later is empty"
                 }
             }
            })
        }
        else{
            return{
                statusCode:404,
                message:"item not found"
            }
        }
       })
    }


    //delete-item -AdminAdd 
const deleteAdminAdd = (movie)=>{
    return db.Film.deleteOne({movie})
    .then((result)=>{
        if(result){
            //if delete successful then get the updated watch later
            return db.Film.find()
            .then((result)=>{
             if(result){
                 return{
                     statusCode:200,
                     adminAdd:result
                 }
             }
             else{
                 return{
                     statusCode:404,
                     message:"Film list is empty"
                 }
             }
            })
        }
        else{
            return{
                statusCode:404,
                message:"item not found"
            }
        }
       })
    }



module.exports={
     register,
     login,
     adminlogin,
     addItem,
     allmovies,
     viewMovie,
     addwatchLater,
     getwatchLater,
     deleteWatchLater,
     deleteAdminAdd
}