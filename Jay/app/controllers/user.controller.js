const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const  logintoken  = require("../models/user");
// const Rating = db.rating;

// Create and Save a new User
exports.create = (req, res) => 
{
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    return;
    }

    // Create a User
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        role: req.body.role
    };
    // Save User in the database
    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
    message:err.message || "Some error occurred while creating the user."
    });
    });
};
exports.login = async(req,res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    return;
    }
    try {   
        // console.log(req.body.email);
        const dbUser = await User.findOne({ where: { email: req.body.email} });
        if(!dbUser)
        { 
            res.send(404).send({
                message:"User Not Found"
            })
        }
        // console.log("-----------------------------------------------------")
        bcrypt.compare(req.body.password,dbUser.password,function(err,result){
            if(result)
            {
                const token = logintoken(dbUser);
                res.status(200).json({
                    "User":dbUser,
                    "token": token
                })
            }
            else{
                res.status(400).json({
                    "message":"Invalid Credentials"
                })    
            }
        })
    } 
    catch (error) {
        res.status(500).send(error)       
    }   
}

// exports.addRating = (req,res) => {
//     const userID = req.body.userID
//     const rating = req.body.rating
//     return Rating.create({
//         userID: userID,
//         rating: rating
//     })
//       .then((rating) => {
//         res.send(">> Rating Added : " + JSON.stringify(rating, null, 4));
//         return rating;
//       })
//       .catch((err) => {
//         res.send(">> Error while adding rating: ", err);
//       });
//   };