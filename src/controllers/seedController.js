const bcryptjs = require("bcryptjs");
const data = require("../data");
const { User } = require("../models/userModel");

const seedUser = async (req, res, next) => {
  try {
    // Clear the existing users collection
    await User.deleteMany({});
    console.log("Existing users deleted");

    // Hash passwords manually for each user
    const users = await Promise.all(
      data.users.map(async (user) => {
        user.password = await bcryptjs.hash(user.password, 10);
        return user;
      })
    );

    // Insert the new seed data with hashed passwords
    const seededUsers = await User.insertMany(users);
    console.log("Users seeded successfully");

    res
      .status(200)
      .json({
        success: true,
        message: "Users seeded successfully",
        users: seededUsers,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUser };
