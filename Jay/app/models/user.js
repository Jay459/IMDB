const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
    name: {
        type: Sequelize.STRING,
        trim:true,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        trim: true,
        validate:value=>{
            if(!validator.isEmail(value)){
            throw new Error(
            {
                error:"Inavlid Email Address"
            })
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
        minLength:7
    },
    mobile: {
        type: Sequelize.STRING,
        required: true,
        validate:value=>
        {
            if(!validator.isMobilePhone(value , "en-IN")){
            throw new Error({
                    error:"Inavlid mobile number"
            })
            }
        }
    },
    tokens: {
        type: Sequelize.STRING,//string type
        required: true//Mandatory To Create User
    },
    role: {
        type: Sequelize.INTEGER
    }
});


function generateHash(user) {
    if (user === null) {
        throw new Error('No found employee');
    }
    else if (!user.changed('password')) return user.password;
    else {
        let salt = bcrypt.genSaltSync();
        return user.password = bcrypt.hashSync(user.password, salt);
    }
}
function gentoken(user){
    const token = jwt.sign(user.email, process.env.JWT_KEY);//Signing Token With Specific JWT_KEY
    user.tokens = token;//Adding Token In User Database
}
module.exports = function logintoken(user)
{
    const token = jwt.sign(user.email, process.env.JWT_KEY);//Signing Token With Specific JWT_KEY
    return token;
}



User.beforeCreate(generateHash);

User.beforeCreate(gentoken);

User.beforeUpdate(generateHash);

User.beforeUpdate(gentoken);

return User;
};