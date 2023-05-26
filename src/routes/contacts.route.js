const express = require("express");
const Auth = require("../middlewares/Auth");
const ContactsController = require("../controllers/contacts.controller");
const can = require('../middlewares/canAccess');
const Constants = require('../utils/constants');
const contactsController = require("../controllers/contacts.controller");
const router = express.Router();

router.get(
  "/get-contacts/user/:id",
  Auth,
  can(Constants.PERMISSION_VIEW_ALL_CONTACTS),
  ContactsController.getUserContacts
);

router.get(
  "/",
  Auth,
  can(Constants.PERMISSION_VIEW_ALL_CONTACTS),
  contactsController.contacts
)

router.post(
  "/create-contact",
  Auth,
  can(Constants.PERMISSION_ADD_A_CONTACT),
  ContactsController.createContact
);

router.put(
  "/update-contact/:id",
  Auth,
  can(Constants.PERMISSION_UPDATE_A_CONTACT),
  ContactsController.updateContactbyId
);

router.delete(
  "/delete-contact/:id",
  Auth,
  can(Constants.  PERMISSION_DELETE_A_CONTACT),
  ContactsController.deleteContact
);

module.exports = router;
