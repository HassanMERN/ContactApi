module.exports = class PermissionModel {
  /**
   *@constructor
   * @param {object} model - The model sent to sequelize
   */

  constructor(model) {
    /**
     * @property {object} _model - The model mapped by sequelize
     */

    this._model = model;
  }

  /**
   * Description of the createPermission.
   * @function createPermission
   * @param {object} permission - permission records to be created
   * @return {object}
   */

  async createPermission(permission) {
    return this._model.create(permission);
  }

  /**
   * Description of the getPermissionById.
   * @function getPermissionById
   * @param {id} id - id of the permission to be retrieved
   * @return {object}
   */

  async getPermissionById(id, attributes) {
    return this._model.findByPk(id);
  }

  /**
   * Description of the getPermission.
   * @function getPermission
   * @param {object} where - custom condition on which permission is to be retrieved
   * @param {Array} attributes - attributes of the permission to be retrieved
   * @param {Array} include - models to be included for the joins
   * @return {object}
   */

  async getPermission(where, attributes, include = null) {
    return this._model.findOne({ where, attributes, include });
  }

  /**
   * Description of the getPermissions.
   * @function getPermissions
   * @param {object} where - custom condition on which permission is to be retrieved
   * @param {Array} attributes - attributes of the permission to be retrieved
   * @return {object}
   */

  async getPermissions(where = null, attributes = null) {
    return this._model.findAll({ where, attributes });
  }

  /**
   * Description of the updatePermission.
   * @function updatePermission
   * @param {object} update - permission records to be updated
   * @param {object} where - condition on which records are updated
   * @return {object}
   */

  async updatePermission(update, where) {
    return this._model.update(update, { where, returning: true });
  }

};
