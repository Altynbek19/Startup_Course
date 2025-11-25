console.log("Startup Course platform loaded.");


// Получаем высоту header
const header = document.querySelector("header");
const headerHeight = header.offsetHeight; // Это даст точную высоту шапки

// Добавляем отступ сверху для основного контента (или body)
document.querySelector(".main_container").style.paddingTop = `${headerHeight}px`;



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


// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// const auth = getAuth();

// // Главный слушатель авторизации
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log("Пользователь авторизован:", user);

//         document.getElementById("userName").textContent = user.displayName;
//         document.getElementById("userEmail").textContent = user.email;

//     } else {
//         console.log("Пользователь не авторизован");
//     }
// });


// const user = JSON.parse(localStorage.getItem("user"));

// if (user) {
//     console.log("Пользователь на этой странице:", user);

//     document.getElementById("userName").textContent = user.name;
//     document.getElementById("userEmail").textContent = user.email;
//     document.getElementById("userPhoto").textContent = src(user.photo);
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const panel = document.getElementById("user-panel");

//     if (user) {
//         panel.style.display = "flex";

//         document.getElementById("user-name").textContent = user.name;
//         document.getElementById("user-photo").src = user.photo;

//         document.getElementById("logout-btn").addEventListener("click", () => {
//             localStorage.removeItem("user");
//             window.location.reload();
//         });

//     } else {
//         panel.style.display = "none";
//     }
// });


// ======== ЗАГРУЗКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ ========
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const panel = document.getElementById("user-panel");

    if (!panel) {
        // На этой странице нет панели пользователя — ничего не делаем
        return;
    }

    if (!user) {
        // Пользователь НЕ авторизован
        panel.style.display = "none";
        return;
    }

    // Пользователь авторизован
    panel.style.display = "flex";

    // Элементы панели
    const nameEl = document.getElementById("user-name");
    const emailEl = document.getElementById("user-email");
    const photoEl = document.getElementById("user-photo");
    const logoutBtn = document.getElementById("logout-btn");

    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
    if (photoEl) photoEl.src = user.photo;

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "./index.html";
        });
    }
});