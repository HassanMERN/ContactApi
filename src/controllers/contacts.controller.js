const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/sendResponse");
const DBInitializer = require("../../db/connection");
const ContactModel = require("../services/contacts/contacts.model");
const UserModel = require("../services/users/users.model");

/**
 * Description of the contacts controller.
 * @module contacts.controller
 * @type {{contacts:Function}}
 * @type {{createContact:Function}}
 * @type {{deleteContact:Function}}
 * @type {{getUserContacts:Function}}
 * @type {{updateContactbyId:Function}}
 */

module.exports = {
  /**
   * Description of the contacts controller. This function lets you retreive all the contacts.
   * @function contacts
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */

  async contacts(req, res) {
    try {
      let db = await DBInitializer();
      const Contact = new ContactModel(db.models.Contact);
      const include = [
        {
          model: db.models.User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ];
      return sendSuccessResponse(
        res,
        200,
        await Contact.getContacts({}, include),
        "All registered Contacts"
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        "Could not perform operation at this time, kindly try again later.",
        e
      );
    }
  },

  /**
   * Description of the createContacts controller. This function lets you create new contact.
   * @function createContact
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */

  async createContact(req, res) {
    try {
      let db = await DBInitializer();
      const Contact = new ContactModel(db.models.Contact);

      const { contactNo } = req.body;
      let where = { contactNo };
      let contact = await Contact.getContact(where);
      if (contact && contact.length) {
        return sendErrorResponse(res, 422, "this contact already exist");
      }
      let newContact = await Contact.createContact({
        contactNo,
        userId: req.user.user_id,
      });
      console.log("newContact>>>>>>>>>.", newContact);
      return sendSuccessResponse(
        res,
        201,
        newContact.dataValues,
        "Contact created successfully"
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        "Could not perform operation at this time, kindly try again later.",
        e
      );
    }
  },

  /**
   * Description of the getUserContacts controller. This function lets you retreive all the contacts of the specified user
   * @function getUserContacts
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */

  async getUserContacts(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      const include = [
        {
          model: db.models.Contact,
          as: "contacts",
        },
      ];
      const allContactsOfAUser = await User.getSingleUser(
        { id: req.user.user_id },
        include
      );
      return sendSuccessResponse(
        res,
        201,
        allContactsOfAUser,
        "Contact list of a user"
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        "Could not perform operation at this time, kindly try again later.",
        e
      );
    }
  },

  /**
   * Description of the updateContactsbyId controller. This function lets you update the contact of the specified contactc id
   * @function updateContactbyId
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */

  async updateContactbyId(req, res) {
    try {
      let db = await DBInitializer();
      const Contact = new ContactModel(db.models.Contact);
      const { contactNo } = req.body;
      const { id } = req.params;
      let where = {
        id,
      };
      let contact = await Contact.getContact(where);
      if (!contact) {
        return sendErrorResponse(res, 422, "Requested Contact Does Not Exist");
      }
      const toBeUpdated = {
        contactNo,
      };
      const updatedContact = await Contact.updateContact(toBeUpdated, where);
      console.log("updatedContact>>>>>>>>>>..", updatedContact);
      return sendSuccessResponse(
        res,
        201,
        updatedContact[1],
        "Contact Updated Successfully!"
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        "Could not perform operation at this time, kindly try again later.",
        e
      );
    }
  },


  /**
   * Description of the deleteContact controller. This function lets you delete the contact of the specified contactc id
   * @function deleteContact
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */

  async deleteContact(req, res) {
    try {
      let db = await DBInitializer();
      const Contact = new ContactModel(db.models.Contact);
      const existedContact = await Contact.getContactById(req.params.id);
      if (!existedContact) {
        return sendErrorResponse(res, 422, "Contact does not exist");
      }
      const deletedContact = await existedContact.destroy();
      return sendSuccessResponse(
        res,
        201,
        deletedContact,
        `Contact with ID: ${existedContact.id} Deleted Successfully`
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        "Could not perform operation at this time, kindly try again later.",
        e
      );
    }
  },
};
