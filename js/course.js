// Пример данных курсов
// База данных курсов
const courses = {
    1: {
        title: "Введение в стартапы",
        goal: "Понять, что такое стартап и MVP.",
        results: "Базовое понимание процессов запуска.",
        instruction: "Пройдите уроки по порядку и выполните задания.",
        description: "Этот курс познакомит вас с основами стартап-культуры.",
        lecture: "Основная лекция: что такое стартап, зачем нужен MVP.",
        video: "Видео: как создаются стартапы.",
        practice: "Практическое задание: придумайте идею стартапа.",
        test: "Чтобы пройти тест, нажмите на кнопку внизу."
    },
    2: {
        title: "Поиск идеи",
        goal: "Научиться находить реальные проблемы.",
        results: "Умение находить идеи, которые нужны людям.",
        instruction: "Изучайте примеры и выполняйте задания.",
        description: "Вы научитесь искать боли пользователей.",
        lecture: "Лекция: как находить проблемы на рынке.",
        video: "Видео про поиск идей.",
        practice: "Задание: найдите и опишите 3 проблемы.",
        test: "Тест откроется после изучения материала."
    },
    3: {
        title: "Прототипирование",
        goal: "Создать быстрый прототип.",
        results: "Навык делать MVP за 1–3 дня.",
        instruction: "Следуйте шагам и создайте прототип.",
        description: "Вы поймёте, как делать прототипы быстро.",
        lecture: "Лекция: виды прототипов и примеры.",
        video: "Видео: создание MVP.",
        practice: "Создайте простой прототип.",
        test: "Закрепите знания тестом."
    },
    4: {
        title: "Презентация и инвесторы",
        goal: "Научиться делать питч-дек.",
        results: "Умение убедительно презентовать проект.",
        instruction: "Следуйте шаблонам и выполняйте задание.",
        description: "Вы научитесь говорить с инвесторами.",
        lecture: "Лекция: структура питч-дека.",
        video: "Видео: как презентовать стартап.",
        practice: "Создайте собственный питч-дек.",
        test: "Пройдите финальный тест."
    }
};


// const courses = {
//     1: {
//     title: "Введение в стартапы",
//     description: "Что такое стартап, как рождаются идеи и зачем нужен MVP.",
//     lesson: "Стартап — это компания, созданная для быстрого роста. В этом уроке ты узнаешь, как мыслить как предприниматель и создавать решения, которые нужны людям.",
//     task: "Опиши в 3 предложениях идею своего стартапа. Что она решает и для кого?"
//     },
//     2: {
//     title: "Поиск идеи и проблемы",
//     description: "Как найти идею, которая решает боль пользователей.",
//     lesson: "Лучшие стартапы начинаются с проблем, а не с технологий. Изучи боли людей, прежде чем придумывать продукт.",
//     task: "Напиши 3 проблемы, которые ты заметил у людей вокруг, и подумай, какую из них можно решить."
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

// === МОДАЛКИ ===
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

// Открытие модального окна
document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        modal.style.display = "flex";
        modalBody.innerHTML = `
            <h3>${courses[id].title} — ${btn.textContent}</h3>
            <p>${courses[id][type]}</p>
        `;
    });
});

// Закрытие модального окна
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});


// // === generate sidebar ===
// const courseList = document.getElementById("course-list");
// courses.forEach(c => {
//     const li = document.createElement("li");
//     li.textContent = c.title;
//     li.dataset.id = c.id;
//     courseList.appendChild(li);

//     li.addEventListener("click", () => loadCourse(c.id));
// });

// function loadCourse(id) {
//     const course = courses.find(x => x.id == id);

//     document.querySelectorAll(".sidebar li").forEach(li => {
//         li.classList.toggle("active", li.dataset.id == id);
//     });

//     document.getElementById("course-title").textContent = course.title;
//     document.getElementById("course-goal").textContent = course.goal;
//     document.getElementById("course-results").textContent = course.results;
//     document.getElementById("course-instruction").textContent = course.instruction;

//     document.querySelectorAll(".action-btn").forEach(btn => {
//         btn.onclick = () => openModal(course[btn.dataset.type]);
//     });

//     document.getElementById("next-course").onclick = () => {
//         const next = courses.find(x => x.id == id + 1);
//         if (next) loadCourse(next.id);
//         else alert("Это последний курс!");
//     };
// }

// loadCourse(1);

// // === modal ===
// const modal = document.getElementById("modal");
// const modalBody = document.getElementById("modal-body");

// function openModal(content) {
//     modal.style.display = "block";
//     modalBody.textContent = content;
// }

// document.getElementById("close-modal").onclick = () => {
//     modal.style.display = "none";
// };


// // Определяем, какой курс открыт
// const params = new URLSearchParams(window.location.search);
// const id = params.get("id") || 1;

// if (courses[id]) {
//     document.getElementById("course-title").innerText = courses[id].title;
//     document.getElementById("course-description").innerText = courses[id].description;
//     document.getElementById("lesson-text").innerText = courses[id].lesson;
//     document.getElementById("task-text").innerText = courses[id].task;
// } else {
//     document.getElementById("course-title").innerText = "Курс не найден";
// }

// Кнопка теста

// document.getElementById("test-btn").addEventListener("click", () => {
//     window.location.href = `test.html?id=${id}`;
// });