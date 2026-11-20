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

databaseQuestions = [];
for (let i = 0; i < themes.length; i++) {
    databaseQuestions[i] = {};
    for (let j = 0; j < themes[i].length; j++) {
        databaseQuestions[i][themes[i][j]] = {};
    }
}

for (let i = 0; i < themes.length; i++) {
    for (let j = 0; j < themes[i].length; j++) {
        for (let k = 0; k < points[i].length; k++) {
            databaseQuestions[i][themes[i][j]][points[i][k]] = {
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
            }
            let fileName = `r${i + 1}t${j + 1}q${k + 1}`;
            const question = databaseQuestions[i][themes[i][j]][points[i][k]];
            const media = mediaIndex[fileName];
            if (question && media) {
                Object.assign(question, media);
            }
        }
    }
}
console.log(databaseQuestions);