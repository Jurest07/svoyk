themes = [
    [
        "ЭТО ЧТО ЗА СНАРЯЖЕНИЕ",
        "ЛЕГЕНДЫ ТУРКЛУБА",
        "ВЕРШИНЫ МИРА",
        "НИШЕВЫЕ ТРЕКИ У КОСТРА",
        "Я ГУБКИНЕЦ - И ЭТО ЗВУЧИТ ГОРДО",
        "ШЛАКОБЛОКУНЬ",
    ],
    [
        "ВОПРОС ОТ ТУРОЗАВРА",
        "ХИТЫ ЛЕСНОЙ ДИСКОТЕКИ",
        "МЕМОЛОГИЯ",
        "ГВОЗДЬ ПОГОДЫ",
        "ВЕРШИНЫ РОССИИ",
    ],
]

points = [
    [200, 400, 600, 800, 1200],
    [200, 400, 600, 800, 1200],
];

uniquePoints = {
    'r1t6':[500, 500, 500, 500, 500],
};

databaseQuestions = [];
for (let i = 0; i < themes.length; i++) {
    databaseQuestions[i] = {};
    for (let j = 0; j < themes[i].length; j++) {
        databaseQuestions[i][themes[i][j]] = {};
    }
}

for (let i = 0; i < themes.length; i++) {
    for (let j = 0; j < themes[i].length; j++) {
        const theme = themes[i][j];
        const themeId = `r${i + 1}t${j + 1}`;
        const themePoints = uniquePoints[themeId] || points[i];
        themePoints.forEach((pts, index) => {
            const questionId = index + 1;
            const fileName = `${themeId}q${questionId}`;
            databaseQuestions[i][theme][questionId] = {
                q:      null,
                a:      null,
                qImg:   null,
                aImg:   null,
                qVideo: null,
                aVideo: null,
                qMusic: null,
                aMusic: null,
                type:   null,
                catBag: false,
                points: pts,
            }
            const question = databaseQuestions[i][theme][questionId];
            const media = mediaIndex[fileName];
            if (question && media) {
                Object.assign(question, media);
            }
        })
    }
}
console.log(databaseQuestions);