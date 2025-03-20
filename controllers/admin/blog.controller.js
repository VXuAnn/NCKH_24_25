const New = require("../../models/new.model.js")

// [GET] /admin/profile
module.exports.index = async (req, res) => {
  try {
    const news = await New.find({ deleted: false }) // Lọc bài viết chưa bị xóa
      .sort({ createdAt: -1 }) // Sắp xếp bài mới nhất lên đầu
      .limit(6); // Giới hạn số lượng bài viết hiển thị

    res.render("admin/pages/blog/index", {
      pageTitle: "Trang Blog",
      news: news
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi tải bài viết");
  }
};



module.exports.add = async (req, res) => {
  res.render("admin/pages/blog/add", {
    pageTitle: "Add blog"
  });
}

//[GET]/admin/blog/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID không hợp lệ" });
    }

    const news = await New.findOne({ _id: id, deleted: false });
    if (!news) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    res.render("admin/pages/blog/edit", {
      pageTitle: "Edit new",
      news: news
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ khi tải bài viết" });
  }
};

//[Patch]/admin/doctor/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  await New.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  req.flash("success", "Cập nhật thành công");

  res.redirect("back");
}