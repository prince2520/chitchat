const express = require("express");

const {
  createGroup,
  joinGroup,
  saveGroupMessage,
  blockUser,
  unBlockUser,
  deleteGroup,
  leaveGroup,
  removeUser,
  editGroup,
} = require("../controllers/group.controller.js");

const { createGroupSchema } = require("../utils/validation");
const { validationHandler } = require("../middleware/validation.middleware");

const isAuth = require("../middleware/isAuth.middleware");

const router = express.Router();

router.post(
  "/create-group",
  validationHandler(createGroupSchema),
  isAuth,
  createGroup
);

router.put(
  "/join-group",
  isAuth,
  joinGroup
);

router.put("/save-group-message", isAuth, saveGroupMessage);

router.put("/block-user", isAuth, blockUser);

router.delete("/delete-group", isAuth, deleteGroup);

router.delete("/leave-group", isAuth, leaveGroup);

router.put("/unblock-user", isAuth, unBlockUser);

router.put("/edit-group", isAuth, editGroup);

router.delete("/remove-user", isAuth, removeUser);

module.exports = router;
