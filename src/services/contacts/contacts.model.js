module.exports = class ContactModel {
  /**
   * COTACT MODEL
   * @module ContactModel
   * @return {sendErrorResponse|next}
   */

  constructor(model) {
    /**
     * @property {object} model - The model mapped by sequelize
     */
    this.model = model;
  }

  /**
   * Description of the getContactById.
   * @function getContactById
   * @param {id} id - id of the contact to be retrieved
   * @return {object}
   */

  async getContactById(id) {
    return this.model.findByPk(id);
  }

  /**
   * Description of the getContact.
   * @function getContact
   * @param {object} where - custom condition on which contact is to be retrieved
   * @param {Array} attributes - attributes of the contact to be retrieved
   * @param {Array} include - models to be included for the joins
   * @return {object}
   */

  async getContact(where, attributes = null, include = []) {
    const contact = await this.model.findOne({ where, attributes, include });
    return contact;
  }

  /**
   * Description of the createContact.
   * @function createContact
   * @param {object} contact - contact records to be created
   * @return {object}
   */

  async createContact(contact) {
    const newContact = await this.model.create(contact);
    return newContact;
  }

  /**
   * Description of the updateContact.
   * @function updateContact
   * @param {object} update - contact records to be updated
   * @param {object} where - condition on which records are updated
   * @return {object}
   */

  async updateContact(update, where) {
    return this.model.update(update, { where, returning: true });
  }


  /**
   * Description of the countContact.
   * @function countContacts
   * @param {object} where - condition on which records are fetched
   * @param {boolean} distinct - distinct of records to retrieve
   * @param {Array} include - models to be included for the joins
   * @return {object}
   */

  async countContact(where, include = null) {
    return this.model.count({
      where,
      distinct: true,
      include,
    });
  }


  /**
   * Description of the getContacts.
   * @function getContacts
   * @param {object} where - condition on which records are fetched
   * @param {object} attributes - attributes to be fetched
   * @param {number} limit - maximum number of records to retrieve
   * @param {number} offset - starting point of the records
   * @param {Array} include - models to be included for the joins
   * @param {string} order - how to order the results
   * @return {object}
   */


  async getContacts(
    where = null,
    include = null,
    attributes = null,
    limit = null,
    offset = null,
    order = null
  ) {
    return this.model.findAll({
      where,
      attributes,
      limit,
      offset,
      include,
      order,
      distinct: true,
    });
  }


  /**
   * Description of the deleteContact.
   * @function deleteContact
   * @param {object} where - condition on which records are deleted
   * @return {object}
   */

  async deleteContact(where) {
    return this.model.destroy({ where });
  }
};
