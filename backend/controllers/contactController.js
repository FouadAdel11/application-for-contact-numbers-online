const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")
const ejs= require('ejs')
const fs = require("fs");
const { error } = require("console");
let f_transporter;
 async function createTransport() {
  // return
   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user:'fouadadel558@gmail.com' ,
      pass:'cfjx pwmg nbgl siko' ,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
    f_transporter =  transporter;
}


const getContacts = asyncHandler(async (req, res,next) => {
  try {
    console.log(req.params);
    let { limit, offset } = req.params
    console.log(limit,offset);
    const contacts = await Contact.find().sort({ _id: -1 }).skip(+offset).limit(+limit)
    const totalCount = await Contact.countDocuments();
  res.status(200).json({contacts,totalCount});
  } catch (error) {
    res.status(500)
    next(error)
  }
});

const createContact = asyncHandler(async (req, res ,next) => {
  try {
  const { name, phone, address, notes} = req.body;
  if (!name || !phone ) {
    res.status(400);
    throw new Error("name and phone for users fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    phone,
    address,
    notes
  });
  res.status(201).json(contact);
  } catch (error) {
    res.status(500)
    next(error)
  }
});

const updateContact = asyncHandler(async (req, res, next) => {
  try {

    const contact = await Contact.findById(req.params.id);
    console.log(req.body);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
    }
    let updatedContact
    if (Object.keys(req.body).length!==0) {
 updatedContact= await Contact.findByIdAndUpdate(
    req.params.id,
   req.body,
    {new:true}
  );
    } else {
      res.status(400).json({message:"must send Data to update "})
   }
  res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500)
    next(error)
  }

});

const deleteContactWithConfirmEmail = asyncHandler(async (req, res,next) => {
  try {
     let token = req.query.token

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.status(401);
      next(error)
      }
      if (decoded?.user) {
        let contact = await Contact.deleteOne({ _id: decoded.user.contactId });
        console.log(contact.deletedCount);
        if (contact.deletedCount) {
            res.send({status:201, message:"delete done successfully"});
        } else {
            res.send({status:201, message:"this contact already delete"});
        }
      } else {
      res.status(401);
      next(error)
      }
    });
  } else {
      res.status(401);
      next(error)
    }
  } catch (error) {
    res.status(500)
    next(error)
  }
});
const deleteContact = asyncHandler(async (req, res, next) => {
  try {
         let contact = await Contact.deleteOne({ _id: req.params.id });
        if (contact.deletedCount) {
            res.send({status:201, message:"delete done successfully"});
        } else {
            res.send({status:201, message:"this contact already delete"});
        }
} catch (error) {
  status(500)
  next(error)
}
})
const confirmDeleteContact = asyncHandler(async (req, res, next) => {
  try {
    let contactId=req.params.id
    let { username   ,password} = req.user
    // generate token concat with link to delete
    let link;
            const accessToken = jwt.sign({
                user:{
                    username,
                password,
                  contactId
                }
            }, process.env.SECRET_KEY, {expiresIn:process.env.JWT_EXPIRATION_TIME})
    link = `http://localhost:3000/api/contacts/deleteContact?token=${accessToken}`
    // read fs ejs for send confirmation
    createTransport();
        fs.readFile(
      `./views/confirmationEmail.ejs`,
      "utf8",
          function (err, file) {
        if (err) {
         console.log(err);
          return;
        }
        var mainOptions = {
          from:"test@gmail.com",
          to: "fouad.adel262@gmail.com",
          subject: "رسالة   تاكيد حذف",
          text: "رساله الي المستخدم لتاكيد الحذف",
          html: ejs.render(file, {
            name:username,
            link
          }),
        };
        f_transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            res.status(500)
            next(error)
          } else {
           res.send({status:201, message:"email send"})
          }
        });
      }
     );
} catch (error) {
    res.status(500)
    next(error)
}
})
module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  deleteContactWithConfirmEmail,
  confirmDeleteContact
};
