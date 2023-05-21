const express = require("express");
const router = express.Router();
const {
  CreateDocument,
  getAllDocuments,
  getDocument,
  deleteDocument,
  updateDoc,
} = require("../controllers/docController");

router.route("/").patch(updateDoc);
router.route("/:email").get(getAllDocuments);
router.route("/:email/:id").get(getDocument);
router.route("/new").post(CreateDocument);
router.route("/:email/:id").delete(deleteDocument);

module.exports = router;
