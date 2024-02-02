import { Router } from "express";
import {
    getUserList,
    getUserById,
    getUserListBySearchQuery,
    addUser,
    authUser,
} from "../controllers/userController.js";


const router = Router();


// get array of all users
router.get("/", getUserList);


// get user by id
router.get("/:id", getUserById);


// get user by login
router.post("/find", getUserListBySearchQuery);


// add user
router.post("/", addUser);


// auth user
router.post("/auth", authUser);


export default router;
