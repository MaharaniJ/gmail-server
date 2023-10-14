const Email = require("../models/email.js");

exports.saveSendEmails = async (req, res) => {
  try {
    // Validate that the required fields (type, name, date) are present in the request body
    const { type, name, date } = req.body;
    if (!type || !name || !date) {
      return res.status(400).json("Missing required fields");
    }

    // Create and save the email
    const email = new Email(req.body);
    await email.save();

    res.status(200).json("Email saved successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getEmails = async (req, res) => {
  try {
    let emails;

    if (req.params.type === "starred") {
      emails = await Email.find({ starred: true, bin: false });
    } else if (req.params.type === "bin") {
      emails = await Email.find({ bin: true });
    } else if (req.params.type === "allmail") {
      emails = await Email.find({});
    } else if (req.params.type === "inbox") {
      emails = [];
    } else {
      emails = await Email.find({ type: req.params.type });
    }

    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.toggleStarredEmail = async (req, res) => {
  try {
    await Email.updateOne(
      { _id: req.body.id },
      { $set: { starred: req.body.value } }
    );
    res.status(201).json("Value is updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteEmails = async (req, res) => {
  try {
    await Email.deleteMany({ _id: { $in: req.body } });
    res.status(200).json("emails deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.moveEmailsToBin = async (req, res) => {
  try {
    await Email.updateMany(
      { _id: { $in: req.body } },
      { $set: { bin: true, starred: false, type: "" } }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
};
