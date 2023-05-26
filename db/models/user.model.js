module.exports = function (sequelize, Model, DataTypes) {
    /**
   * Model Model Class.
   * @class Model @extend Model
   */

  class User extends Model {}
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      passwordHash: {
        type: DataTypes.STRING,
      },
      recoveryCode: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize, modelName: "User", tableName: "user" }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: "UserRole",
      as: "roles",
      foreignKey: "userId",
    });
    User.hasMany(models.Contact, {
      as: "contacts",
      foreignKey: "userId",
    });
  };

  return User;
};
