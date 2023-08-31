const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

const createNewUser = async (req, res) => {
  console.log("User aData", req.body);
  const { name, email, password, role } = req.body;

  // Confirm data
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate user
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email address" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  // const userObject = (!Array.isArray(role) || !role.length)
  //     ? { email, "password": hashedPwd }
  //     : { email, "password": hashedPwd, role }

  const userObject = {
    name,
    email,
    password: hashedPwd,
    role: role | "user",
  };

  // Create and store new user
  console.log("Before");
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

// const updateUser = async (req, res) => {
//     const { id, username, roles, active, password } = req.body

//     // Confirm data
//     if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
//         return res.status(400).json({ message: 'All fields except password are required' })
//     }

//     // Does the user exist to update?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     // Check for duplicate
//     const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

//     // Allow updates to the original user
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     user.username = username
//     user.roles = roles
//     user.active = active

//     if (password) {
//         // Hash password
//         user.password = await bcrypt.hash(password, 10) // salt rounds
//     }

//     const updatedUser = await user.save()

//     res.json({ message: `${updatedUser.username} updated` })
// }

// const deleteUser = async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // Does the user still have assigned notes?
//     const note = await Note.findOne({ user: id }).lean().exec()
//     if (note) {
//         return res.status(400).json({ message: 'User has assigned notes' })
//     }

//     // Does the user exist to delete?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.username} with ID ${result._id} deleted`

//     res.json(reply)
// }

module.exports = {
  getAllUsers,
  createNewUser,
  // updateUser,
  // deleteUser
};
