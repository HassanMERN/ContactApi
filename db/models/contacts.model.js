  /**
   * Contact Model Class.
   * @class Contact @extend Model
   */
module.exports = function (sequelize, Model, DataTypes) {

    class Contact extends Model {}
    Contact.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        contactNo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        
      },
      { sequelize, modelName: 'Contact', tableName: "contact" }
    );
  
    Contact.associate = (models) => {
      Contact.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
    };
  
    return Contact;
  };
  