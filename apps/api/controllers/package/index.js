const Package = require("../../models/package");

const getPackages = async (req, res) => {
  try {
    const { 
      category, 
      minPrice, 
      maxPrice, 
      difficulty, 
      search, 
      sort = "-createdAt",
      page = 1,
      limit = 12
    } = req.query;
    
    const filter = { availability: true, isApproved: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      filter.$text = { $search: search };
    }
    
    const packages = await Package.find(filter)
      .populate("category", "name slug")
      .populate("guide", "name photo rating")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Package.countDocuments(filter);
    
    res.json({
      packages,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id)
      .populate("category", "name slug image")
      .populate("guide", "name photo email phone bio");
    
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGuidePackages = async (req, res) => {
  try {
    const packages = await Package.find({ guide: req.params.guideId })
      .populate("category", "name")
      .sort({ createdAt: -1 });
    
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPackage = async (req, res) => {
  try {
    const pkg = new Package(req.body);
    await pkg.save();
    
    const populated = await Package.findById(pkg._id)
      .populate("category", "name")
      .populate("guide", "name photo");
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("category", "name").populate("guide", "name photo");
    
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approvePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    
    res.json({ message: "Package approved", package: pkg });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPendingPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isApproved: false })
      .populate("category", "name")
      .populate("guide", "name email")
      .sort({ createdAt: -1 });
    
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPackages,
  getPackageById,
  getGuidePackages,
  createPackage,
  updatePackage,
  deletePackage,
  approvePackage,
  getPendingPackages,
};
