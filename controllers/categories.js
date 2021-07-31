const { Category, validate } = require('../models/category');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) return res.status(404).send('No categories found');
    return res.send(categories);
  } catch (err) {
    next(err);
  }
};

const addCategory = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  try {
    let category = new Category({
      name: req.body.name,
    });
    category = await category.save();

    return res.send(category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
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
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category)
      return res.status(404).send('Category with the given ID is not present');

    return res.send(category);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
