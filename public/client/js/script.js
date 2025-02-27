document.addEventListener("DOMContentLoaded", function () {
    const departmentSelect = document.getElementById("department-select");
    const doctorSelect = document.getElementById("doctor-select");

    departmentSelect.addEventListener("change", async function () {
        const departmentTitle = this.options[this.selectedIndex].text; // Lấy title thay vì ID

        // Xóa danh sách bác sĩ cũ
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';

        if (!departmentTitle) return;

        try {
            const response = await fetch(`/getDoctorsByDepartment?departmentTitle=${encodeURIComponent(departmentTitle)}`);
            const data = await response.json();

            if (data.success) {
                data.doctors.forEach((doctor) => {
                    const option = document.createElement("option");
                    option.value = doctor._id;
                    option.textContent = doctor.fullName;
                    doctorSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    });
});
