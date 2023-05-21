const Docs = require("../models/docs");
const { ObjectId } = require("mongodb");

// Create New Document
const CreateDocument = async (req, res) => {
  try {
    const newDoc = await Docs.findOneAndUpdate(
      { email: req.body.email },
      { $push: { docs: {} } }
    );
    res.status(201).json({
      success: true,
      doc: newDoc.docs.slice(-1),
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single document
const getDocument = async (req, res) => {
  try {
    const allDocs = await Docs.findOne(
      { email: req.params.email, "docs._id": req.params.id },
      { "docs.$": 1 }
    );
    res.status(200).json({
      success: true,
      doc: allDocs,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Documents
const getAllDocuments = async (req, res) => {
  try {
    const allDocs = await Docs.find({ email: req.params.email });
    res.status(200).json({
      success: true,
      docs: allDocs[0].docs,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Documents
const updateDoc = async (req, res) => {
  try {
    const filter = { email: req.body.email, "docs._id": req.body.id };
    const update = {};

    if (req.body.name) {
      update["docs.$.name"] = req.body.name;
    }
    if (req.body.content) {
      update["docs.$.content"] = req.body.content;
    }

    await Docs.updateOne(filter, { $set: update });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Document
const deleteDocument = async (req, res) => {
  console.log(req.params);
  try {
    await Docs.updateOne(
      { email: req.params.email },
      { $pull: { docs: { _id: req.params.id } } }
    );
    res.status(200).json({
      success: true,
      message: "document successfully deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  CreateDocument,
  getDocument,
  getAllDocuments,
  deleteDocument,
  updateDoc,
};
