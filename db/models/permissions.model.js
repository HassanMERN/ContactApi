module.exports = function (sequelize, Model, DataTypes) {
    /**
   * Permission Model Class.
   * @class Permission @extend Model
   */
    class Permission extends Model {}
    Permission.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
      },
      {
        sequelize,
        modelName: 'Permission',
        tableName: "permission"
      }
    );

    
    Permission.associate = (models) => {
      Permission.belongsToMany(models.Role, {
        through: 'RolePermission',
        as: 'rolePermissions',
        foreignKey: 'permissionId',
      });
    };
  
    return Permission;
  };
  