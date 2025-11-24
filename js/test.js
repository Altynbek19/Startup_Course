// Тестовая проверка
document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submit-btn");
    if (!submitBtn) return; // чтобы код не ломался на других страницах

    submitBtn.addEventListener("click", () => {
        const answers = {
        q1: "b",
        q2: "a",
        q3: "b"
        };

    let score = 0;
    let total = 3;

    for (let key in answers) {
        const selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) {
        score++;
        }
    }

    const result = document.getElementById("result");
    result.innerHTML = `✅ Ты набрал ${score} из ${total} правильных ответов!`;

    if (score === total) {
        result.innerHTML += "<br>🎉 Отлично! Ты готов к следующему модулю.";
    } else if (score >= 2) {
        result.innerHTML += "<br>💪 Хорошо, но можно лучше!";
    } else {
        result.innerHTML += "<br>📘 Перечитай урок и попробуй снова.";
    }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Получаем id из адреса (например test.html?id=2)
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "1";

    // Наборы тестов для разных курсов
    const tests = {
        1: {
            title: "Тест по курсу 1: Введение в стартапы",
            questions: [
                {
                    q: "Что такое стартап?",
                    options: ["Обычный малый бизнес", "Компания для быстрого роста", "НКО или благотворительная организация"],
                    correct: 1
                },
                {
                    q: "Что означает MVP?",
                    options: ["Минимально жизнеспособный продукт", "Максимальный бюджет проекта", "План маркетинга"],
                    correct: 0
                }
            ]
        },
        2: {
            title: "Тест по курсу 2: Поиск идеи и рынка",
            questions: [
                {
                    q: "Что самое важное при поиске идеи?",
                    options: ["Понимание проблемы клиента", "Дизайн сайта", "Инвестиции"],
                    correct: 0
                },
                {
                    q: "Что помогает проверить гипотезу?",
                    options: ["Customer Interview", "Интуиция", "Реклама"],
                    correct: 0
                }
            ]
        },
        3: {
            title: "Тест по курсу 3: Презентация инвесторам",
            questions: [
                {
                    q: "Что главное в питче?",
                    options: ["Ясность и краткость", "Длинные детали", "Сложные диаграммы"],
                    correct: 0
                },
                {
                    q: "Сколько длится elevator pitch?",
                    options: ["30–60 секунд", "5 минут", "10 минут"],
                    correct: 0
                }
            ]
        }
    };

    // Берём нужный тест по ID
    const test = tests[id];
    if (!test) {
        document.getElementById("test-title").textContent = "Тест не найден!";
        return;
    }

    // Заголовок
    document.getElementById("test-title").textContent = test.title;

    // Формируем вопросы
    const form = document.getElementById("quiz-form");
    test.questions.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `
        <p>${index + 1}. ${item.q}</p>
        ${item.options
        .map(
            (opt, i) =>
            `<label><input type="radio" name="q${index}" value="${i}"> ${opt}</label><br>`
        )
        .join("")}
    `;
    form.appendChild(div);
    });

    // Проверка ответов
    document.getElementById("submit-btn").addEventListener("click", () => {
        let score = 0;
        test.questions.forEach((item, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected && parseInt(selected.value) === item.correct) score++;
        });
        const total = test.questions.length;
        const resultText = `✅ Результат: ${score} из ${total}`;
        document.getElementById("result").innerHTML = resultText;
// Тут сохраняем результат
        const results = JSON.parse(localStorage.getItem("testResults") || "{}");
        results[id] = { score, total, date: new Date().toLocaleDateString() };
        localStorage.setItem("testResults", JSON.stringify(results));
    });
});
