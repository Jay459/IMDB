const actors = require("./../controllers/actor.controller");
const auth = require('./../middleware/authorization');

var router = require("express").Router();

router.post("/addCast", auth , actors.create);
// Create a new Actor

router.get("/getallCast", actors.findAll);
// Retrieve all actors

router.get("/actor/:id", actors.findOne);
// Retrieve a single Actors with id

router.put("/update_actor/:id", auth, actors.update);
// Update a Actors with id

router.delete("/delete_actor/:id", auth ,actors.delete);
// Delete a Actors with id

router.delete("/actors/delete", auth, actors.deleteAll);
// Create a new Actors

router.post('/AddMovieToActor', auth ,actors.addMovie);



router.get('/add', auth , (req, res) => {
    try{
        res.json({"user":req.user , "msg":"In Protected Route"});
    }
    catch(err){
        res.send(err);
    }
});

module.exports = router;