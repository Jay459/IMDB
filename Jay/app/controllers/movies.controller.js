const db = require("../models");
const Movie = db.movies;
const Actor = db.actors;
//const Op = db.Sequelize.Op;


// Create and Save a new Movie
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Movie
    const movie = {
      name : req.body.name,
      release_date : req.body.release_date,
      budget : req.body.budget,
      rating : req.body.rating,
      movie_joner : req.body.movie_joner
    };
  
    // Save Movie in the database
    Movie.create(movie)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Movie."
        });
      });
  };

// Retrieve all Actors from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Movie.findAll({
      include: [
        {
          model: Actor,
          as: "actors",
          attributes: ["id", "name","role"],
          through: {
            attributes: [],
      },
    }
  ]
    })
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


// Find a single Movie with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Movie.findByPk(id , {
      include: [
        {
          model: Actor,
          as: "actors",
          attributes: ["id", "name","role"],
          through: {
            attributes: [],
      },
    }
  ]
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Movie with id=" + id
        });
      });
};

// Update a Movie by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Movie.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Movie was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Movie with id=" + id
        });
      });
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Movie.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Movie was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Movie with id=" + id
        });
      });
};

// Delete all Actors from the database.
exports.deleteAll = (req, res) => {
    Movie.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Movies were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Actors."
        });
      });
};

exports.addActor = (req, res) => {
  const actorId = req.body.actorId; 
  const movieId = req.body.movieId;
  return Movie.findByPk(movieId)
    .then((movie) => {
      if (!movie) {
        console.log("Movie not found!");
        return null;
      }
      return Actor.findByPk(actorId).then((actor) => {
        if (!actor) {
          console.log("Actor not found!");
          return null;
        }

        movie.addActor(actor);
        res.json(`>> added Actor id=${actor.id} to Movie id=${movie.id}`);
        return movie;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Actor to Movie: ", err);
    });
};