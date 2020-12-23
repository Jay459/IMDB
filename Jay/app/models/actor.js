module.exports = (sequelize, Sequelize) => {
    const Actor = sequelize.define("actor", {
      name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      age: {
        type: Sequelize.INTEGER
      }
    });
  
    return Actor;
};