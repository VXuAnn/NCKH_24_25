const WorkingHour = require("../../models/workingHour.model");
const systemConfig = require("../../config/system");

// [GET] /admin/working-hour
module.exports.index = async (req, res) => {
  try {
    // Lấy tất cả dữ liệu từ WorkingHour
    const workingHours = await WorkingHour.find({}).sort({ dayOfWeek: 1 }).lean(); // lean() giúp chuyển đổi sang object JS thuần
    // Danh sách tên ngày trong tuần
    const daysOfWeek = [
       "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
    ];

    // Chuyển đổi dữ liệu
    const workingHoursWithDayNames = workingHours.map((item, index) => ({
      ...item,
      dayName: daysOfWeek[item.dayOfWeek], // Chuyển số thành tên ngày
      index: index + 1, // STT cho dễ hiển thị
      id: item._id.toString(),
    }));

    res.render("admin/pages/working-hour/index", {
      pageTitle: "Giờ Làm Việc",
      workingHours: workingHoursWithDayNames,
    });
  } catch (error) {
    console.error("Lỗi lấy dữ liệu giờ làm việc:", error);
    res.status(500).send("Lỗi máy chủ nội bộ");
  }
};

// module.exports.edit = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!id) return res.status(400).json({ error: "ID không hợp lệ" });

//     const workingHour = await WorkingHour.findOne({ _id: id });
//     if (!workingHour) return res.status(404).json({ error: "Không tìm thấy giờ làm việc" });

//     const daysOfWeek = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

//     // Chia slots thành sáng và chiều
//     const morningSlots = workingHour.slots.filter(slot => slot.startTime < "12:00");
//     const afternoonSlots = workingHour.slots.filter(slot => slot.startTime >= "12:00");

//     return res.render("admin/pages/working-hour/edit", {
//       pageTitle: "Sửa Giờ Làm Việc",
//       workingHour: {
//         ...workingHour.toObject(),
//         dayName: daysOfWeek[workingHour.dayOfWeek],
//         morningSlots,
//         afternoonSlots
//       },
//     });
//   } catch (error) {
//     console.error("Lỗi khi chỉnh sửa giờ làm việc:", error);
//     return res.status(500).json({ error: "Lỗi server" });
//   }
// };


// module.exports.editPatch = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { dayOfWeek, morningStartTime, morningEndTime, morningDuration, afternoonStartTime, afternoonEndTime, afternoonDuration } = req.body;

//     // Tạo danh sách slot từ dữ liệu input
//     const slots = [];

//     if (morningStartTime) {
//       morningStartTime.forEach((startTime, index) => {
//         if (startTime && morningEndTime[index] && morningDuration[index]) {
//           slots.push({
//             startTime,
//             endTime: morningEndTime[index],
//             duration: parseInt(morningDuration[index])
//           });
//         }
//       });
//     }

//     if (afternoonStartTime) {
//       afternoonStartTime.forEach((startTime, index) => {
//         if (startTime && afternoonEndTime[index] && afternoonDuration[index]) {
//           slots.push({
//             startTime,
//             endTime: afternoonEndTime[index],
//             duration: parseInt(afternoonDuration[index])
//           });
//         }
//       });
//     }

//     // Cập nhật dữ liệu
//     await WorkingHour.updateOne({ _id: id }, { $set: { dayOfWeek: parseInt(dayOfWeek), slots } });
//     res.redirect(`/${systemConfig.prefixAdmin}/working-hour`);
//   } catch (error) {
//     console.error("Lỗi khi cập nhật giờ làm việc:", error);
//     res.status(500).json({ error: "Có lỗi xảy ra, vui lòng thử lại." });
//   }
// };


module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "undefined") return res.status(400).json({ error: "ID không hợp lệ" });

    const workingHour = await WorkingHour.findOne({ _id: id });
    if (!workingHour) return res.status(404).json({ error: "Không tìm thấy giờ làm việc" });

    const daysOfWeek = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const morningSlots = workingHour.slots.filter(slot => slot.startTime < "12:00");
    const afternoonSlots = workingHour.slots.filter(slot => slot.startTime >= "12:00");

    return res.render("admin/pages/working-hour/edit", {
      pageTitle: "Sửa Giờ Làm Việc",
      workingHour: {
        ...workingHour.toObject(),
        id: workingHour._id.toString(), // Explicitly pass the id
        dayName: daysOfWeek[workingHour.dayOfWeek],
        morningSlots,
        afternoonSlots
      },
    });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa giờ làm việc:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};
// module.exports.editPatch = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!id || id === "undefined") return res.status(400).json({ error: "ID không hợp lệ" });
//     console.log("Dữ liệu nhận được từ req.body:", req.body);
//     const { dayOfWeek, morningStartTime, morningEndTime, morningDuration, afternoonStartTime, afternoonEndTime, afternoonDuration } = req.body;

//     const slots = [];
//     if (morningStartTime) {
//       morningStartTime.forEach((startTime, index) => {
//         if (startTime && morningEndTime[index] && morningDuration[index]) {
//           slots.push({
//             startTime,
//             endTime: morningEndTime[index],
//             duration: parseInt(morningDuration[index])
//           });
//         }
//       });
//     }

//     if (afternoonStartTime) {
//       afternoonStartTime.forEach((startTime, index) => {
//         if (startTime && afternoonEndTime[index] && afternoonDuration[index]) {
//           slots.push({
//             startTime,
//             endTime: afternoonEndTime[index],
//             duration: parseInt(afternoonDuration[index])
//           });
//         }
//       });
//     }
//     await WorkingHour.updateOne({ _id: id }, { $set: { dayOfWeek: parseInt(dayOfWeek), slots } });
//     res.redirect(`/${systemConfig.prefixAdmin}/working-hour/index`);
//   } catch (error) {
//     console.error("Lỗi khi cập nhật giờ làm việc:", error);
//     res.status(500).json({ error: "Có lỗi xảy ra, vui lòng thử lại." });
//   }
// };

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "undefined") return res.status(400).json({ error: "ID không hợp lệ" });

    console.log("Dữ liệu nhận được từ req.body:", req.body);
    const { dayOfWeek } = req.body;

    // Properly handle array inputs that may come as single values or arrays
    let morningStartTime = req.body['morningStartTime[]'];
    let morningEndTime = req.body['morningEndTime[]'];
    let morningDuration = req.body['morningDuration[]'];
    let afternoonStartTime = req.body['afternoonStartTime[]'];
    let afternoonEndTime = req.body['afternoonEndTime[]'];
    let afternoonDuration = req.body['afternoonDuration[]'];

    // Convert to arrays if single values
    if (!Array.isArray(morningStartTime)) morningStartTime = morningStartTime ? [morningStartTime] : [];
    if (!Array.isArray(morningEndTime)) morningEndTime = morningEndTime ? [morningEndTime] : [];
    if (!Array.isArray(morningDuration)) morningDuration = morningDuration ? [morningDuration] : [];
    if (!Array.isArray(afternoonStartTime)) afternoonStartTime = afternoonStartTime ? [afternoonStartTime] : [];
    if (!Array.isArray(afternoonEndTime)) afternoonEndTime = afternoonEndTime ? [afternoonEndTime] : [];
    if (!Array.isArray(afternoonDuration)) afternoonDuration = afternoonDuration ? [afternoonDuration] : [];

    const slots = [];

    // Process morning slots
    for (let i = 0; i < morningStartTime.length; i++) {
      if (morningStartTime[i] && morningEndTime[i] && morningDuration[i]) {
        slots.push({
          startTime: morningStartTime[i],
          endTime: morningEndTime[i],
          duration: parseInt(morningDuration[i])
        });
      }
    }

    // Process afternoon slots
    for (let i = 0; i < afternoonStartTime.length; i++) {
      if (afternoonStartTime[i] && afternoonEndTime[i] && afternoonDuration[i]) {
        slots.push({
          startTime: afternoonStartTime[i],
          endTime: afternoonEndTime[i],
          duration: parseInt(afternoonDuration[i])
        });
      }
    }

    // Update the document
    await WorkingHour.updateOne(
      { _id: id },
      { $set: { dayOfWeek: parseInt(dayOfWeek), slots: slots } }
    );

    res.redirect(`/${systemConfig.prefixAdmin}/workingHour`);
  } catch (error) {
    console.error("Lỗi khi cập nhật giờ làm việc:", error);
    res.status(500).json({ error: "Có lỗi xảy ra, vui lòng thử lại." });
  }
};