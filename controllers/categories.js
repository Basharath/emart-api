const { Category, validate } = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
};

const addCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  try {
    let category = new Category({
      name: req.body.name,
    });
    category = await category.save();

    return res.send(category);
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
};

const updateCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const categoryId = req.params.id;
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!category)
      return res.status(400).send('Category with the given ID is not present');

    return res.send(category);
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category)
      return res.status(404).send('Category with the given ID is not present');

    return res.send(category);
  } catch (err) {}
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
