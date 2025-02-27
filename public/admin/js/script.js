// Phân quyền
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const roles = [];
    const listElementRoleId = tablePermissions.querySelectorAll("[role-id]");
    for (const element of listElementRoleId) {
      const roleId = element.getAttribute("role-id");
      const role = {
        id: roleId,
        permissions: []
      };
      const listInputChecked = tablePermissions.querySelectorAll(`input[data-id="${roleId}"]:checked`);
      listInputChecked.forEach(input => {
        const dataName = input.getAttribute("data-name");
        role.permissions.push(dataName);
      });
      roles.push(role);
    }
    const path = buttonSubmit.getAttribute("button-submit");
    fetch(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roles)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  });
}
// Hết Phân quyền

//Form search
const formSearch = document.querySelector("form-search");
if(formSearch){
  let url= new URL(window.location.href);
  formSearch.addEventListener("submit", (event) =>{
    event.preventDefault();
    const keyword =event.target.elements.keyword.value;

    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  })
}
// End form search

// Upload Image

const uploadImage = document.querySelector("[upload-image]");
 if(uploadImage){
  const uploadImageInput = uploadImage.querySelector("upload-image-input");
 }

// Xóa doctor
document.addEventListener("click", (event) => {
  const button = event.target.closest("[button-delete]"); // Kiểm tra có nút nào được bấm không
  if (!button) return; // Nếu không phải nút delete thì bỏ qua

  const id = button.getAttribute("button-delete"); // Lấy ID từ thuộc tính button-delete
  console.log("ID cần xóa:", id); // Kiểm tra xem có đúng ID không

  if (!id) return; // Nếu không có ID thì dừng

  fetch(`/admin/doctor/delete/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      if (data.code == 200) {
        window.location.reload(); // Reload lại trang sau khi xóa
      } else {
        console.error("Xóa thất bại:", data);
      }
    })
    .catch(error => console.error("Lỗi khi gửi yêu cầu:", error));
});

// Hết Xóa doctor