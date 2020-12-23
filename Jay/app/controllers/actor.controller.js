const db = require("../models");
const Actor = db.actors;
const Movie = db.movies;
const Op = db.Sequelize.Op;


// Create and Save a new Actor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Actor
    const actor = {
      name : req.body.name,
      role : req.body.role,
      gender : req.body.gender,
      dob : req.body.dob,
      age : req.body.age
    };
  
    // Save Actor in the database
    Actor.create(actor)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Actor."
        });
      });
  };

// Retrieve all Actors from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Actor.findAll({ 
    include: [
      {
        model: Movie,
        as: "movies",
        attributes: ["id", "name","rating","budget"],
        through: {
          attributes: [],
    },
  }
]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Actors."
        });
      });
};


// Find a single Actor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Actor.findByPk(id , {
      include: [
        {
          model: Movie,
          as: "movies",
          attributes: ["id", "name","rating","budget"],
          through: {
            attributes: [],
          },
    }]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Actor with id=" + id
        });
      });
};

// Update a Actor by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Actor.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Actor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Actor with id=${id}. Maybe Actor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Actor with id=" + id
        });
      });
};

// Delete a Actor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Actor.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Actor was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Actor with id=${id}. Maybe Actor was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Actor with id=" + id
        });
      });
};

// Delete all Actors from the database.
exports.deleteAll = (req, res) => {
    Actor.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Actors were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Actors."
        });
      });
};


exports.addMovie = (req , res) => {
  const actorId = req.body.actorId; 
  const movieId = req.body.movieId;
  return Actor.findByPk(actorId)
    .then((actor) => {
      if (!actor) {
        console.log("Actor not found!");
        return null;
      }
      return Movie.findByPk(movieId).then((movie) => {
        if (!movie) {
          console.log("Movie not found!");
          return null;
        }

        actor.addMovie(movie);
        res.send(`>> added Movie id=${movie.id} to Actor id=${actor.id}`);
        return actor;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Movie to Actor: ", err);
    });
};