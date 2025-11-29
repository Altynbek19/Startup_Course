updateGlobalProgress()

import { courses } from "./data/courses.js";
import { lectures } from "./data/lectures.js";
// База данных курсов
// const courses = {
//     1: {
//         title: "Введение в стартапы",
//         goal: "Понять, что такое стартап и MVP.",
//         results: "Базовое понимание процессов запуска.",
//         instruction: "Пройдите уроки по порядку и выполните задания.",
//         description: "Этот курс познакомит вас с основами стартап-культуры.",
//         lecture: "Основная лекция: что такое стартап, зачем нужен MVP.",
//         video: "https://www.youtube.com/embed/lvqRMFscHgo?si=c6HSRzd5MGQEJ6LG",
//         practice: "Практическое задание: придумайте идею стартапа.",
//         test: "Чтобы пройти тест, нажмите на кнопку внизу."
//     },
//     2: {
//         title: "Поиск идеи",
//         goal: "Научиться находить реальные проблемы.",
//         results: "Умение находить идеи, которые нужны людям.",
//         instruction: "Изучайте примеры и выполняйте задания.",
//         description: "Вы научитесь искать боли пользователей.",
//         lecture: "Лекция: как находить проблемы на рынке.",
//         video: "Видео про поиск идей.",
//         practice: "Задание: найдите и опишите 3 проблемы.",
//         test: "Тест откроется после изучения материала."
//     },
//     3: {
//         title: "Прототипирование",
//         goal: "Создать быстрый прототип.",
//         results: "Навык делать MVP за 1–3 дня.",
//         instruction: "Следуйте шагам и создайте прототип.",
//         description: "Вы поймёте, как делать прототипы быстро.",
//         lecture: "Лекция: виды прототипов и примеры.",
//         video: "Видео: создание MVP.",
//         practice: "Создайте простой прототип.",
//         test: "Закрепите знания тестом."
//     },
//     4: {
//         title: "Презентация и инвесторы",
//         goal: "Научиться делать питч-дек.",
//         results: "Умение убедительно презентовать проект.",
//         instruction: "Следуйте шаблонам и выполняйте задание.",
//         description: "Вы научитесь говорить с инвесторами.",
//         lecture: "Лекция: структура питч-дека.",
//         video: "Видео: как презентовать стартап.",
//         practice: "Создайте собственный питч-дек.",
//         test: "Пройдите финальный тест."
//     }
// };







// Получаем id курса
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Если курс не найден — ошибка
if (!courses[id]) {
    document.querySelector('.course-content').innerHTML =
        "<h2>Курс не найден</h2>";
}




// Загружаем прогресс курсов или создаем пустой объект
let savedProgress = JSON.parse(localStorage.getItem("courseProgress") || "{}");

// Инициализируем все курсы
Object.keys(courses).forEach(cid => {
    if (!savedProgress[cid]) {
        savedProgress[cid] = { lecture: false, video: false, practice: false, test: false };
    }
});

// Сохраняем в localStorage
localStorage.setItem("courseProgress", JSON.stringify(savedProgress));

// сразу обновляем прогресс визуально
updateCourseProgress();
updateGlobalProgress();




// Вставляем данные в DOM
document.getElementById("course-title").textContent = courses[id].title;
document.getElementById("course-goal").textContent = courses[id].goal;
document.getElementById("course-results").textContent = courses[id].results;
document.getElementById("course-instruction").textContent = courses[id].instruction;
document.getElementById("course-description").textContent = courses[id].description;


// Заполняем список курсов слева
const list = document.getElementById("course-list");
Object.keys(courses).forEach(cid => {
    const li = document.createElement("li");
    if (cid == id) {
        li.classList.add("active");
    }
    li.innerHTML = `<a href="course.html?id=${cid}", class="sidebar_links">
        ${courses[cid].title}
    </a>`;
    // делаем li кликабельным
    li.addEventListener("click", () => {
        window.location.href = `course.html?id=${cid}`;
    });
    list.appendChild(li);
});

// Настройка кнопки "Следующий курс"
const lastCourseId = Object.keys(courses).length;
const nextButton = document.getElementById("next-course");
if (Number(id) === lastCourseId) {
    nextButton.textContent = "Завершить курс!";
}

nextButton.onclick = () => {
    const nextId = Number(id) + 1;
    if (courses[nextId]) {
        window.location.href = `course.html?id=${nextId}`;
    }else{
        alert("Поздравляю вы успешно прошли курс!!!")
        window.location.href = "courses.html";
    }
};

const allButton = document.getElementById("all-course");
allButton.onclick = () =>{
    window.location.href = `courses.html`;
}

// === МОДАЛКИ ===
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

// Открытие модального окна
document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        const content = courses[id][type];

        modal.classList.add("show");
        modal.style.display = "flex";

        // Обновляем прогресс
        const savedProgress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
        if (!savedProgress[id]) {
            savedProgress[id] = { lecture: false, video: false, practice: false, test: false };
        }
        savedProgress[id][type] = true;
        localStorage.setItem("courseProgress", JSON.stringify(savedProgress));
        updateCourseProgress();
        updateGlobalProgress();
        
        if (type === "video" && content.startsWith("http")) {
            // Если это ссылка на видео — вставляем iframe
            modalBody.innerHTML = `
                <h3>${courses[id].title} — ${btn.textContent}</h3>
                <iframe width="100%" height="100%" src="${content.replace("watch?v=", "embed/")}" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen class="video"></iframe>
            `;
        }else if (type === "practice") {
            const assignments = courses[id]?.practicalAssignment || [];
            const assignmentsHTML = courses[id].practice
                .map((item, index) => `<li>${item}</li>`)
                .join("");

            modalBody.innerHTML = `
                <h3 class="modal-title">${courses[id].title} — ${btn.textContent}</h3>
                <div class="practice_cont">
                    <h3>${courses[id].practiceQuestion}</h3>
                    <ul class="practice-list">
                        ${assignmentsHTML || "<li>Заданий нет</li>"}
                    </ul>
                    <div class="file-upload">
                        <input type="file" id="file-${id}" class="file-input" />
                        <label for="file-${id}" class="file-label">
                            <span>Прикрепить файл</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M.5 9.9V12a2 2 0 002 2h11a2 2 0 002-2V9.9a.5.5 0 011 0V12a3 3 0 01-3 3H2.5a3 3 0 01-3-3V9.9a.5.5 0 011 0z"/>
                                <path d="M7.646 1.146a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8.5 2.707V10.5a.5.5 0 01-1 0V2.707L5.354 4.854a.5.5 0 11-.708-.708l3-3z"/>
                            </svg>
                        </label>
                    </div>
                </div>
            `;
        }
        else if (type === "lecture") {
            const lectureData = lectures[id];

            // Создаем HTML блоков динамически
            let lectureHTML = '';
            lectureData.blocks.forEach(block => {
                switch (block.type) {
                    case 'paragraph':
                        lectureHTML += `<p class="lecture-paragraph">${block.text}</p>`;
                        break;
                    case 'title':
                        lectureHTML += `<h3 class="lecture-title">${block.text}</h3>`;
                        break;
                    case 'list':
                        const listItems = block.items.map(item => `<li>${item}</li>`).join('');
                        lectureHTML += `<ul class="lecture-list">${listItems}</ul>`;
                        break;
                    case 'divider':
                        lectureHTML += `<hr class="lecture-divider">`;
                        break;
                }
            });

            // Вставляем в модалку
            modalBody.innerHTML = `
                <div class="lecture-wrapper">
                    <div class="lecture-header">
                        <h2>${courses[id].title} — ${btn.textContent}</h2>
                    </div>
                    <div class="lecture-content">
                        ${lectureHTML}
                    </div>
                </div>
            `;
        }else {
            modalBody.innerHTML = `
                <h3>${courses[id].title} — ${btn.textContent}</h3>
                <p>${content}</p>
            `;
        }
    });
});

// Закрытие модального окна
closeModal.addEventListener("click", () => {
    stopVideo();
    modal.style.display = "none"
});
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        stopVideo();
        modal.style.display = "none";
    }
});

function stopVideo() {
    const iframe = modalBody.querySelector("iframe");
    if (iframe) {
        iframe.src = iframe.src; // перезапуск → видео останавливается
    }
    modalBody.innerHTML = "";
}

function closeModalWindow() {
    modal.classList.remove("show");
    modalBody.innerHTML = "";
    setTimeout(() => modal.style.display = "none", 200);
}






function updateCourseProgress() {
    const savedProgress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
    const p = savedProgress[id];
    let percent = 0;

    if (p.lecture) percent += 25;
    if (p.video) percent += 25;
    if (p.practice) percent += 25;
    if (p.test) percent += 25;

    document.getElementById("course-progress").style.width = percent + "%";
    document.getElementById("course-progress-text").textContent = percent + "%";
}

function updateGlobalProgress() {
    const savedProgress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
    const all = Object.values(savedProgress);
    let total = 0;

    all.forEach(course => {
        let p = 0;
        if (course.lecture) p += 25;
        if (course.video) p += 25;
        if (course.practice) p += 25;
        if (course.test) p += 25;
        total += p;
    });

    const max = all.length * 100;
    const percent = Math.round((total / max) * 100);

    document.getElementById("global-progress").style.width = percent + "%";
    document.getElementById("global-progress-text").textContent = percent + "%";
}

// === ГЕНЕРАЦИЯ И ПРОХОЖДЕНИЯ ТЕСТА (НОВАЯ ВЕРСИЯ) ===

// Открытие теста по кнопке
document.querySelector('[data-type="test"]').addEventListener("click", () => {
    openTestModal();
});

// Генерация теста
function openTestModal() {
    const test = courses[id].test; // массив [{question, answers[], correct[] }]

    modal.classList.add("show");
    modal.style.display = "flex";

    let html = `
        <h3>Тест — ${courses[id].title}</h3>
        <div class="test-container">
    `;

    test.forEach((q, index) => {
        html += `
            <div class="test-question">
                <h3>${index + 1}. ${q.question}</h3>
                <ul class="test-options">
        `;

        q.answers.forEach((answer, i) => {
            html += `
                <li>
                    <label>
                        <input type="checkbox" name="q${index}" value="${i}">
                        ${answer}
                    </label>
                </li>
            `;
        });

        html += `</ul></div>`;
    });

    html += `
        <button id="submit-test">Проверить</button>
        <div id="test-result" class="test-result"></div>
    </div>`;

    modalBody.innerHTML = html;

    document.getElementById("submit-test").onclick = checkNewTest;
}


// === Новая функция проверки ===
function checkNewTest() {
    const test = courses[id].test;

    let correctCount = 0;

    test.forEach((q, index) => {
        const selected = [
            ...document.querySelectorAll(`input[name="q${index}"]:checked`)
        ].map(el => Number(el.value));

        const isCorrect =
            selected.length === q.correct.length &&
            selected.every(v => q.correct.includes(v));

        if (isCorrect) correctCount++;
    });

    const total = test.length;
    const percent = Math.round((correctCount / total) * 100);

    document.getElementById("test-result").textContent =
        `Ваш результат: ${correctCount} из ${total} (${percent}%)`;

    // Сохранение прогресса
    const savedProgress = JSON.parse(localStorage.getItem("courseProgress"));
    savedProgress[id].test = true;
    localStorage.setItem("courseProgress", JSON.stringify(savedProgress));

    updateCourseProgress();
    updateGlobalProgress();
}

