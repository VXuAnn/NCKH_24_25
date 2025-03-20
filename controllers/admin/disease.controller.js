const Disease =  require("../../models/disease.model");
const systemConfig = require("../../config/system");
// [GET] /admin/profile
module.exports.index = async(req, res) => {
  const diseases = await Disease.find({
    deleted: false
  });
  res.render("admin/pages/disease/index", {
    pageTitle: "Danh sách bệnh",
    diseases: diseases
  });
}

module.exports.add = async (req, res) => {
  res.render("admin/pages/disease/add", {
    pageTitle: "Add disease",
  });
};

module.exports.addPost = async (req, res) => {
  try {
    const { title, label, description } = req.body;

    // Basic validation
    if (!title || !label) {
      req.flash("error", "Name and Label are required");
      return res.redirect("back");
    }

    const newDisease = new Disease({
      name: title,
      label: label,
      desc: description,
    });

    await newDisease.save();

    req.flash("success", "Disease created successfully");
    res.redirect(`/${systemConfig.prefixAdmin}/disease`);
  } catch (error) {
    console.error("Error creating disease:", error);
    req.flash("error", "Failed to create disease");
    res.redirect("back");
  }
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Disease.updateOne({ _id: id }, { deleted: true });
    req.flash("success", "Disease deleted successfully");
    res.redirect("back");
  } catch (error) {
    console.error("Error deleting disease:", error);
    req.flash("error", "Failed to delete disease");
    res.redirect("back");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const disease = await Disease.findOne({ _id: id, deleted: false });

    if (!disease) {
      req.flash("error", "Disease not found");
      return res.redirect(`/${systemConfig.prefixAdmin}/disease`);
    }

    res.render("admin/pages/disease/edit", {
      pageTitle: "Edit Disease",
      disease: disease,
    });
  } catch (error) {
    console.error("Error fetching disease:", error);
    req.flash("error", "Failed to load disease");
    res.redirect(`/${systemConfig.prefixAdmin}/disease`);
  }
};

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, label, description } = req.body;

    await Disease.updateOne(
      { _id: id, deleted: false },
      {
        name: title,
        label: label,
        desc: description,
      }
    );

    req.flash("success", "Disease updated successfully");
    res.redirect(`/${systemConfig.prefixAdmin}/disease`);
  } catch (error) {
    console.error("Error updating disease:", error);
    req.flash("error", "Failed to update disease");
    res.redirect("back");
  }
};