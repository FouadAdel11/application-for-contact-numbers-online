const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const users = [
  { username: 'user1', password: 'user1' },
  { username: 'user2', password: 'user2' }
];
const loginUser = asyncHandler(async (req, res,next) => {
  try {
  const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if(!username || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    if(user){
            const accessToken = jwt.sign({
                user:{
                    username: user.username,
                    password: user.password,
                }
            }, process.env.SECRET_KEY, {expiresIn:process.env.JWT_EXPIRATION_TIME})
            res.status(200).json({message:"user Login In",accessToken})
    }
    else{
        res.status(400);
        throw new Error("user does not exist")
    }
  } catch (error) {
    res.status(500)
    next(error)
  }

})




const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });

module.exports = {loginUser, currentUser}
