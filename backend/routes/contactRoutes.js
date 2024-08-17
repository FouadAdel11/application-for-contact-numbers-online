const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  deleteContactWithConfirmEmail,
  confirmDeleteContact
} = require("../controllers/contactController");
const validateToken = require("../middlewares/validateToken");
const authorValidation = require("../middlewares/validationContactData");
const checkValidation = require("../middlewares/checkValidationData");
// i do to  2 end point for delete by confirmation email and delete by confirmation message by toastr in frontEnd
router.route("/deleteContact").get(deleteContactWithConfirmEmail);
router.use(validateToken);
router.route("/:id")
        .put(authorValidation.updateContactValidator, checkValidation, updateContact)
        .delete(deleteContact);
router.route('/confirmEmail/:id').get(confirmDeleteContact)
router.route("/:limit/:offset").get(getContacts)
router.route("/").post(authorValidation.addContactValidator,checkValidation,createContact);
module.exports = router;
