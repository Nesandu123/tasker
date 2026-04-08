const Category = require("../models/Category");

// GET all categories
const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// CREATE category
const createCategory = async (req, res) => {
  const { name, icon } = req.body;

  const category = new Category({ name, icon });
  await category.save();

  res.json(category);
};

module.exports = {
  getCategories,
  createCategory
};