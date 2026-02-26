const Category = require("../../models/category");
const { success, notFound, serverError } = require("../../utils/response");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    return success(res, "Success", categories);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return success(res, "Created", category, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return notFound(res, "Category not found");
    }
    return success(res, "Success", category);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return notFound(res, "Category not found");
    }
    return success(res, "Category deleted");
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
