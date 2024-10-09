const express = require("express");
const consultasController = require("../controllers/consultationsController");
//const authMiddleware = require("../middleware/authMiddleware"); // Autenticação JWT

const router = express.Router();

router.get("/consultations", consultasController.getConsultations);
router.post("/consultations", consultasController.createConsultation);
//router.put("/:id", authMiddleware, consultasController.updateConsultation);
//router.delete("/:id", authMiddleware, consultasController.deleteConsultation);

module.exports = router;
