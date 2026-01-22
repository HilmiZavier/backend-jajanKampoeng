const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

const userSchema = require("../middleware/validator/userSchema");
const validate = require("../middleware/validator/validate");
const upload = require("../middleware/uploads/upload");
const {
  authenticateToken,
  authorizationRole,
} = require("../middleware/auth/auth");

router.get(
  "/user",
  authenticateToken,
  authorizationRole(["admin", "super admin"]),
  UserController.getAllUser
);

router.get("/user/:id", UserController.getUserById);
router.post(
  "/user",
  upload.none(),
  validate(userSchema.createUserSchema),
  UserController.createUser
);
router.put(
  "/user/:id",
  validate(userSchema.updateUserSchema),
  UserController.updateUser
);
router.delete("/user/:id", UserController.deleteUser);
router.patch(
  "/user/upload",
  upload.single("images"),
  UserController.uploadImage
);

module.exports = router;
