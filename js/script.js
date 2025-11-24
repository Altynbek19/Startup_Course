console.log("Startup Course platform loaded.");

// document.addEventListener("DOMContentLoaded", () => {
//     const results = JSON.parse(localStorage.getItem("testResults") || "{}");
//     const buttons = document.querySelectorAll(".test-btn");

//     buttons.forEach(button => {
//     const courseId = button.dataset.course;
//     const result = results[courseId];

//     const status = document.createElement("p");
//     status.classList.add("status");

//     if (result) {
//         status.innerHTML = `✅ Пройден: <strong>${result.score}/${result.total}</strong> 
//         (${result.percent}%) • ${result.date}`;
//         status.style.color = "green";
//     } else {
//         status.textContent = "🔹 Ещё не пройден";
//         status.style.color = "gray";
//     }

//     button.insertAdjacentElement("afterend", status);

//     button.addEventListener("click", () => {
//         window.location.href = `test.html?id=${courseId}`;
//     });
//     });

//     // Кнопка сброса прогресса
//     const resetBtn = document.getElementById("reset-progress");
//     if (resetBtn) {
//     resetBtn.addEventListener("click", () => {
//         if (confirm("Сбросить все результаты тестов?")) {
//         localStorage.removeItem("testResults");
//         location.reload();
//         }
//     });
//     }
// });

