const { Contact } = require("../../models");
const createError = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId); //Contact.findOne({ _id: id })
  if (!result) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.json({ status: "success", code: 200, data: { result } });
};

module.exports = getById;
