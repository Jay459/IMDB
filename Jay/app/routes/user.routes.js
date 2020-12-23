const user = require("./../controllers/user.controller");

const auth = require("../middleware/authorization");

var router = require("express").Router();

router.post("/Signup", user.create);

router.post("/Login", user.login);

router.get('/auth', auth , (req, res) => {
    try{
        res.json({"user":req.user , "msg":"In Protected Route"});
    }
    catch(err){
        res.send(err);
    }
});

// router.post('/addRating' , user.addRating);

module.exports = router;