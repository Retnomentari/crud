const {
    controllerAddUser,
    controllerGetUsers,
    controllerGetUsersById,
    controllerUpdateUser,
    controllerDeleteUser
    } = require("./user.controller");

const router = require("express").Router();


router.post("/add", controllerAddUser); // controller menjembatani apk dengan user
router.get("/get", controllerGetUsers);
router.get("/get/:id", controllerGetUsersById);
router.patch("/update", controllerUpdateUser);
router.delete("/delete", controllerDeleteUser);


module.exports = router;