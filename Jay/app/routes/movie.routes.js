const movies = require("./../controllers/movies.controller");
const auth = require("./../middleware/authorization");

var router = require("express").Router();

router.post("/addMovie", auth, movies.create);
// Create a new Movie

router.get("/getallMovies", movies.findAll);
// Retrieve all movies

router.get("/movie/:id", movies.findOne);
// Retrieve a single movies with id

router.put("/update_movie/:id", auth, movies.update);
// Update a movies with id

router.delete("/delete_movie/:id", auth, movies.delete);
// Delete a movies with id

router.delete("/movies/delete", auth, movies.deleteAll);
// Create a new movies

router.post('/AddActorToMovie', auth, movies.addActor);

module.exports = router;