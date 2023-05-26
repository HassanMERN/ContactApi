module.exports = class RoleModel {
  /**
   * ROLES MODEL
   * @module RoleModel
   * @return {sendErrorResponse|next}
   */

  constructor(model) {
    /**
     * @property {object} _model - The model mapped by sequelize
     */
    this._model = model;
  }

  /**
   * Description of the createRole.
   * @function createRole
   * @param {object} role - The coming role to be assigned
   * @return {object}
   */

  async createRole(role) {
    return this._model.create(role);
  }

  /**
   * Description of the getRoleByID.
   * @function getRoleById
   * @param {number} id - The coming id to get a user by
   * @param {Array} attributes - The attributes to be sent back
   * @return {object}
   */

  async getRoleById(id, attributes) {
    return this._model.findByPk(id);
  }

  /**
   * Description of the getRole.
   * @function getRole
   * @param {object} role - The coming role to be assigned
   * @return {object}
   */

  async getRole(where, attributes, include = []) {
    return this._model.findOne({ where, attributes, include });
  }

  /**
   * Description of the getRole.
   * @function getRoles
   * @param {object} where - condition on which records are fetched
   * @param {Array} attributes - The attributes to be sent back
   * @param {object} transaction - The transaction to apply
   * @return {object}
   */
  async getRoles(where = null, attributes, transaction = null) {
    return this._model.findAll({ where, attributes, transaction });
  }

  /**
   * Description of the updateRole.
   * @function updateRole
   * @param {object} update - records that have to be updated
   * @param {object} where - condition on which records are fetched
   * @return {object}
   */
  async updateRole(update, where) {
    return this._model.update(update, { where, returning: true });
  }
};
