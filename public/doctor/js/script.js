document.addEventListener("DOMContentLoaded", function () {
  const patientInput = document.getElementById("search-patient");
  const patientResults = document.getElementById("patient-results");
  const medicineInput = document.getElementById("search-medicine");
  const medicineResults = document.getElementById("medicine-results");
  const prescriptionTable = document.getElementById("prescription-table").querySelector("tbody");

  // Hàm tạo danh sách gợi ý
  function createDropdown(results, container, onSelect) {
    container.innerHTML = results
      .map((item) => `<div class="result-item" data-info='${JSON.stringify(item)}'>${item.name || item.fullName} (${item.type || ""})</div>`)
      .join("");

    document.querySelectorAll(".result-item").forEach((item) => {
      item.addEventListener("click", function () {
        onSelect(JSON.parse(this.getAttribute("data-info")));
        container.innerHTML = ""; // Xóa danh sách sau khi chọn
      });
    });
  }

  // Tìm kiếm bệnh nhân
  patientInput.addEventListener("input", async function () {
    const keyword = this.value.trim();
    if (!keyword) {
      patientResults.innerHTML = "";
      return;
    }

    const response = await fetch(`/doctor/search-patient?keyword=${keyword}`);
    const patients = await response.json();

    createDropdown(patients, patientResults, (selected) => {
      patientInput.value = selected.fullName;
    });
  });

  // Tìm kiếm thuốc
  medicineInput.addEventListener("input", async function () {
    const keyword = this.value.trim();
    if (!keyword) {
      medicineResults.innerHTML = "";
      return;
    }

    const response = await fetch(`/doctor/search-medicine?keyword=${keyword}`);
    const medicines = await response.json();

    createDropdown(medicines, medicineResults, (selected) => {
      const newRow = `
        <tr>
          <td>${prescriptionTable.children.length + 1}</td>
          <td>${selected.name}</td>
          <td>${selected.type}</td>
          <td><input type="number" class="form-control quantity-input" min="1" value="1"></td>
          <td><input type="text" class="form-control dose-input"></td>
          <td><button class="btn btn-danger remove-medicine">Xóa</button></td>
        </tr>
      `;

      prescriptionTable.insertAdjacentHTML("beforeend", newRow);
      medicineInput.value = "";
      attachRemoveEvents();
    });
  });

  // Hàm gán sự kiện xóa thuốc
  function attachRemoveEvents() {
    document.querySelectorAll(".remove-medicine").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.closest("tr").remove();
      });
    });
  }
});
