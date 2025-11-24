// Пример данных курсов
const courses = {
    1: {
    title: "Введение в стартапы",
    description: "Что такое стартап, как рождаются идеи и зачем нужен MVP.",
    lesson: "Стартап — это компания, созданная для быстрого роста. В этом уроке ты узнаешь, как мыслить как предприниматель и создавать решения, которые нужны людям.",
    task: "Опиши в 3 предложениях идею своего стартапа. Что она решает и для кого?"
    },
    2: {
    title: "Поиск идеи и проблемы",
    description: "Как найти идею, которая решает боль пользователей.",
    lesson: "Лучшие стартапы начинаются с проблем, а не с технологий. Изучи боли людей, прежде чем придумывать продукт.",
    task: "Напиши 3 проблемы, которые ты заметил у людей вокруг, и подумай, какую из них можно решить."
    }
};

// Определяем, какой курс открыт
const params = new URLSearchParams(window.location.search);
const id = params.get("id") || 1;

if (courses[id]) {
    document.getElementById("course-title").innerText = courses[id].title;
    document.getElementById("course-description").innerText = courses[id].description;
    document.getElementById("lesson-text").innerText = courses[id].lesson;
    document.getElementById("task-text").innerText = courses[id].task;
} else {
    document.getElementById("course-title").innerText = "Курс не найден";
}

// Кнопка теста

document.getElementById("test-btn").addEventListener("click", () => {
    window.location.href = `test.html?id=${id}`;
});