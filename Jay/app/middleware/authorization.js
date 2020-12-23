// const jwt = require("jsonwebtoken");
// const db = require("../models");
// const User = db.user;
// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');//Passing Token In Headers
//         const data = jwt.verify(token, process.env.JWT_KEY);//To Check If Token Is Valid
//         console.log("----------------------------------",data);
//         const user = await User.findOne({ where: { email: data , tokens :token }});
//         if (!user && user.role == null) {//Check If User Is Found According To Data
//             throw new Error();
//         }
//         req.user = user;//Setting req.user as User Found 
//         req.token = token;//Setting req.token as Token
//         next();
//     } catch (error) {//IF any Error User Is Not Authorized 
//         res.status(401).send({ error: error.message });
//     }
// };
// module.exports = auth;

const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const auth = async (req, res, next) => {
    try {
        if(!req.header("Authorization")){
            res.status(401).json({"message":"Authorization Failed"});
        }
        const token = req.header('Authorization').replace('Bearer ', '');//Passing Token In Headers
        const data = jwt.verify(token, process.env.JWT_KEY);//To Check If Token Is Valid
        console.log("----------------------------------",data);
        const user = await User.findOne({ where: { email: data , tokens :token }});
        if (!user ) {//Check If User Is Found According To Data
            throw new Error();
        }
        else if(user.role == null){
            res.status(401).send("Authorization Failed");
        }
        req.user = user;//Setting req.user as User Found 
        req.token = token;//Setting req.token as Token
        next();
    } catch (error) {//IF any Error User Is Not Authorized 
        res.status(401).send({ error: error.message });
    }
};

module.exports = auth;