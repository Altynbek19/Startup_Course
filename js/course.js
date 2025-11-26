// База данных курсов
const courses = {
    1: {
        title: "Введение в стартапы",
        goal: "Понять, что такое стартап и MVP.",
        results: "Базовое понимание процессов запуска.",
        instruction: "Пройдите уроки по порядку и выполните задания.",
        description: "Этот курс познакомит вас с основами стартап-культуры.",
        lecture: "Основная лекция: что такое стартап, зачем нужен MVP.",
        video: "https://www.youtube.com/embed/lvqRMFscHgo?si=c6HSRzd5MGQEJ6LG",
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
        const content = courses[id][type];

        modal.classList.add("show");
        modal.style.display = "flex";

        if (type === "video" && content.startsWith("http")) {
            // Если это ссылка на видео — вставляем iframe
            modalBody.innerHTML = `
                <h3>${courses[id].title} — ${btn.textContent}</h3>
                <iframe width="100%" height="100%" src="${content.replace("watch?v=", "embed/")}" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen class="video"></iframe>
            `;
        } else {
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
