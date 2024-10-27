const CatchAsyncError = require("../middlewares/CatchAsyncErrors");
const { User } = require("../models/userModel");

const getCart = CatchAsyncError(async (req, res, next) => {
  try {
    const user = req?.user;

    if (!user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    const userWithCart = await User.findById(user._id)
      .select("cart name email")
      .populate({
        path: "cart", 
        populate: { path: "product", select: "name price image" },
      });

    if (!userWithCart || !userWithCart.cart.length) {
      return res.status(404).json({
        success: false,
        message: "No items found in the cart",
        cart: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      cart: userWithCart.cart,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});



const updateCart = CatchAsyncError(async (req, res, next) => {
    try {
      const user = req?.user;
      
      if (!user) {
        return next(new ErrorHandler("User not authenticated", 401));
      }
  
      const body = req.body;

      console.log(body);
      
  
      res.status(200).json({
        success: true,
        message: "Cart added successfully",
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  });

module.exports = { getCart, updateCart };
