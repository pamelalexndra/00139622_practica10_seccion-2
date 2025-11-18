import express from "express";

// imports de módulos para validaciones
import { verifyToken } from "../utils/middleware/index.js";

// Módulos controladores importados
import { SignIn } from "../controllers/signin.js";
import { SingUp } from "../controllers/signup.js";
import { displayHome } from "../controllers/displayHome.js";
import { getUserById, getUsers, getUsersDesc } from "../controllers/getUsers.js";
import { updateUser } from "../controllers/updateUser.js";
import { deleteUser } from "../controllers/deleteUser.js";
import { getCustomers, searchCustomerByCode } from "../controllers/getCustomers.js";
import { createSale, getSales, getSalesReport } from "../controllers/sales.js";

// creación del enrutador 
const router = express.Router();

// Routes
router.get("/", displayHome);
router.post("/signin", SignIn);
router.post("/signup", SingUp);
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);
router.get("/customers", getCustomers);
router.post("/sales", createSale);
router.get("/sales", getSales);
router.get("/customers/search", searchCustomerByCode);
router.get("/sales/report", getSalesReport);

export default router;