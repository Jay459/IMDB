module.exports = (sequelize, Sequelize) => {
    const Movies = sequelize.define("movies", {
      name: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.DATE
      },
      budget: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      movie_joner :{
          type: Sequelize.STRING
      }
    });
  
    return Movies;
};