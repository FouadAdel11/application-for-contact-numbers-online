const { body, param, query } = require("express-validator");

module.exports.addContactValidator = [
  body("name")
    .isAlpha()
    .withMessage(" name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage(" name must be less than 10 and more 3 chars"),
  body("phone")
    .isNumeric()
    .withMessage("phone must be number only")
    .isLength({ min: 3, max: 10 })
    .withMessage("phone must be less than 10 and more 3 chars"),
];

module.exports.updateContactValidator = [
  param("id").isMongoId().withMessage("Author id dosen't exist"),
  body("name")
    .isAlpha()
    .withMessage(" name must be characters only"),
  body("phone")
    .isNumeric()
    .withMessage("phone must be number only")
];

module.exports.deleteAuthorValidator = [
  param("id").isMongoId().withMessage("Author id is must be valid"),
];
