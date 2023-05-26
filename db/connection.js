const { Sequelize, Model, DataTypes, Association } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const ModelInitiater = require("./models");
const dbName = "ContactsApi";
const dbHost = "localhost";
const dbUsername = "postgres";
const dbPassword = "ashlar";
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  define: {
    underscored: true,
  },
});



/**
 * Code to Initialize the Database Connection
 * @module connection
 * @type {{db_initialize:Function}}
 * @returns {sequelize}
 */
async function db_initialize() {
  try {
    await sequelize.authenticate().then(() => {
      console.log(
        "Connection has been established successfully with >>> ",
        dbName,
        " at >>> ",
        dbHost
      );
    });



/**
 * Method to manage associations defined in each model for the database
 * 
 * @type {{ModelInitiater:Function}}
 * @param {sequelize} sequelize
 * @param {Model} Model
 * @param {Sequelize} DataTypes
 * @returns {Association}
 * 
 * */
    await ModelInitiater(sequelize, Model, DataTypes);
    // await sequelize.sync({ alter: false });
    const models = sequelize.models;
    Object.keys(models).forEach((key) => {
      if ("associate" in models[key]) {
        models[key].associate(models);
      }
    });
    
    // console.log(
    //   "********************************************************************"
    // );
    // // Iterate over each model and retrieve its associations
    // Object.values(models).forEach((model) => {
    //   const associations = model.associations;
    //   // Iterate over each association and log its details
    //   Object.values(associations).forEach((association) => {
    //     console.log("Source Model:", model.name);
    //     console.log("Association Name:", association.as);
    //     console.log("Target Model:", association.target.name);
    //     console.log("Association Type:", association.associationType);
    //     console.log("----------------------");
    //   });
    // });
    // console.log(
    //   "********************************************************************"
    // );

    return sequelize;
  } catch (error) {
    console.error("Error in Database", error);
    throw error;
  }
}

module.exports = db_initialize;
