const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  let result = validationResult(req);
  if (result.errors.length == 0) {
    next();
  } else {
    let errorMessage = result.errors.reduce(
      (cur, obj) => cur + obj.msg + " , ",
      " "
    );
    let error = new Error(errorMessage);
    console.log(error);
   res.status(403).json({errorMessage})
  }
};
