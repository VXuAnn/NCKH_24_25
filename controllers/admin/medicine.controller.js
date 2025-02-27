const Medicine =require("../../models/medicine.model");
const TypeMedicine =require("../../models/typeMedicine.model")
const systemConfig = require("../../config/system");


// [GET] /admin/profile
module.exports.index =async (req, res) => {
  const medicines =await Medicine.find({
    // status:"active",
    deleted:false
  });
  const typemedicines = await TypeMedicine.find({
  deleted: false
})
  res.render("admin/pages/medicine/index", {
    pageTitle: "Thông tin thuốc",
    medicines: medicines,
    typemedicines: typemedicines
  });
}


//[GET]/admin/medicine/create

module.exports.create = async (req, res) => {
  const typemedicines = await TypeMedicine.find({
    deleted: false
  })
  res.render("admin/pages/medicine/create", {
    pageTitle: "Create Medicine",
    typemedicines: typemedicines
  });
};

// [POST] /admin/medicine/create
module.exports.createPost = async (req, res) => {
  try {
    let { name, type, price, stock, status } = req.body;
    console.log("Dữ liệu nhận từ form:", req.body);

    // Kiểm tra các trường bắt buộc
    if (!name || !type || !price || !stock) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin." });
    }

    // Chuyển đổi kiểu dữ liệu
    price = parseFloat(price);
    stock = parseInt(stock);

    if (isNaN(price) || price < 0) {
      return res.status(400).json({ error: "Giá thuốc không hợp lệ." });
    }

    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({ error: "Số lượng tồn kho không hợp lệ." });
    }
    // Mặc định `status` là `inactive` nếu không chọn
    status = status || "inactive";

    // Tạo thuốc mới
    const newMedicine = new Medicine({
      name,
      type: type,
      price,
      stock,
      status,
    });

    await newMedicine.save();
    res.redirect(`/${systemConfig.prefixAdmin}/medicine`);
  } catch (error) {
    console.error("Lỗi khi tạo thuốc:", error);
    res.status(500).json({ error: "Có lỗi xảy ra, vui lòng thử lại." });
  }
};
