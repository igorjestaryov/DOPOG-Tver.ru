document.addEventListener("DOMContentLoaded", () => {
    const testBlocks = document.querySelectorAll(".test-block");
    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextButton = document.getElementById("next-btn");

    let currentTest;
    let currentQuestionIndex;
    let score;

    const tests = {
        basic: [
            {
                question: "К какому классу опасных грузов в соответствии с ДОПОГ относятся токсичные вещества, не представляющие при перевозке дополнительной опасности (например, триоксид мышьяка)?",
                answers: [
                    { text: "1.К классу 2.", correct: false },
                    { text: "2. К классу 5.2.", correct: false },
                    { text: "3.К классу 6.1.", correct: true },
                    { text: "4. К классу 8.", correct: false }
                ]
            },
            {
                question: "В чем измеряется температура вспышки?",
                answers: [
                    { text: "1. °С (градусы Цельсия).", correct: true },
                    { text: "2. °K (градусы Кельвина).", correct: false },
                    { text: "3. °F(градусы по Фаренгейту).", correct: false },
                    { text: "4. Па (Паскали).", correct: false }
                ]
                
            },
        
        {
            question: "К каким вредным последствиям может привести попадание коррозионных веществ в глаза?",
            answers: [
                { text: "1. Корозийные вещества не приносят никакого вреда.", correct: false },
                { text: "2. Приведет к поражению слизистых оболочек и может вызвать слепоту.", correct: true },
                { text: "3. Вызывает отравление.", correct: false },
                
            ]
            
        },
    
    {
        question: "В каком случае к транспортному средству, перевозящему опасные грузы в упаковках, должны крепиться таблички оранжевого цвета?",
        answers: [
            { text: "1. Если колличество опасных грузов на транспортной еденице превышает значения, указанные в подразделе 1.1.3.6 ДОПОГ.", correct: true },
            { text: "4. Только при перевозке легковспламляющихся, токсичных веществ и радиоактивных материалов.", correct: false },
            { text: "3. При перевозке опасных грузов в упаковках транспортное средство не обозначается таблтчками оранжевого цвета.", correct: false },
            { text: "4. Если перевозится более 100 упаковок с опасными грузами.", correct: false }
        ]
        
    },
    {
        question: "Водитель должен перевезти упаковки с опасным грузом, маркированные знаками опасности № 8. Какой из указанных предметов должен быть на транспортном средстве, если к нему, в соответствии с требованиями ДОПОГ, должны крепиться таблички оранжевого цвета?",
        answers: [
            { text: "1. Каска для водителя.", correct: false },
            { text: "2. Устройство, позволяющее отслеживать движение груза.", correct: false },
            { text: "3. Защитные очки.", correct: true },
            { text: "4. Мобильный телефон.", correct: false }
        ]
        
    },
    {
        question: "Какая запись, в соответствии с ДОПОГ, должна быть сделана в транспортном документе при перевозке контейнера-цистерны, вместимостью менее 3 м куб., с РАСТВОРОМ АММИАКА (№ ООН 2672, знак опасности № 8, ГУ ІІІ, код ограничения проезда через тоннели (E))?",
        answers: [
            { text: "1. 80/ООН 2672 АММИАЧНАЯ ВОДА,8,(Е).", correct: false },
            { text: "2. РАСТВОР АММИАКА, 8, III, (Е). ", correct: false },
            { text: "3. Раствор аммиака в малогабаритном контейнере-цистерне, корозийное или едкое.", correct: false },
            { text: "4. UN 2672, РАСТВОР АММИАКА, 8, III, (Е).", correct: true }
        ]
        
    },
    {
        question: "Грузоотправитель передает к перевозке упаковки с опасным грузом, маркированные знаками опасности и номером ООН. Должен ли грузоотправитель в транспортном документе на опасный груз указать номер ООН груза?",
        answers: [
            { text: "1. Не должен.", correct: false },
            { text: "2. Должен если колличество груза превышает максимальное значение, указанное для него в подразделе 1.1.3.6 ДОПОГ.", correct: false },
            { text: "3. Должен.", correct: true },
            { text: "4. Должен указываться только в случае междкнародной перевозки.", correct: false }
        ]
        
    },
    {
        question: "Водитель должен перевезти навалом нитрат аммония (класс 5.1). Из какого перевозочного документа он может узнать номер ООН, который должен указываться в нижней части таблички оранжевого цвета?",
        answers: [
            { text: "1. Из свидетельства об официальном утверждении типа транспортного средства.", correct: false },
            { text: "2. Из свиделтьства ДОПОГ о подготовке водителя.", correct: false },
            { text: "3. Из транспортного документа на опасный груз.", correct: true },
            { text: "4. Из удостоверения водителя.", correct: false }
        ]
        
    },
    {
        question: "Из какого перевозочного документа при перевозке опасного груза водитель может узнать о его опасных свойствах?",
        answers: [
            { text: "1. Из свидетльства о допущении транспортны средств к перевозке некоторых вопасных грузов. ", correct: false },
            { text: "2. Из письменных инструкций.", correct: true },
            { text: "3. Из свидетельства о загрузке контейнера/транспортного средства.", correct: false },
            { text: "4. Из свидетельства ДОПОГ о подготовке водителя.", correct: false }
        ]
        
    },
    {
        question: "Как должен располагаться центр тяжести груза?",
        answers: [
            { text: "1. Как можно ближе к заднему борту грузавой платформы .", correct: false },
            { text: "2. Как можно ближе к левому краю грузовой платформы.", correct: false },
            { text: "3. Как можно ниже.", correct: true },
            { text: "4. Как можно выше.", correct: false }
        ]
            },
        ],
        tanks: [
            {
                question: "Должны ли указываться, в специальном разрешение, места для стоянок и заправок транспортного средства, осуществляющего перевозку опасных грузов?",
                answers: [
                    { text: "1.Не должны", correct: false },
                    { text: "2. Должны.", correct: true },
                    { text: "3.В этом нет необходимости.", correct: false },
                    { text: "4. На усмотрение органа выдающего такое разрешение.", correct: false }
                ]
            },
            {
                question: "Какая цистерна подлежит обработке только в порожнем состоянии?",
                answers: [
                    { text: "1. Контейнер-цистерна.", correct: false },
                    { text: "2. Переносная цистерна.", correct: false },
                    { text: "3. Съемная цистерна.", correct: true },
                ]
                
            },
        
        {
            question: "Водитель автоцистерны на пункте слива разгрузил весь опасный груз из цистерны. Какой из перечисленных документов должен быть у водителя на обратном пути к автомобильному предприятию?",
            answers: [
                { text: "1. Справка о прохождении водителем обязательного медицинского осмотра.", correct: false },
                { text: "2. Транспортный документ с информацией о последнем перевозимом грузе, указанной в соответствии с подразделом 5.4.1 приложения А к ДОПОГ.", correct: true },
                { text: "3. Договор обязательного страхования ответственности субъектов перевозки опасных грузов, на случай наступления негативных последствий при перевозке опасных грузов.", correct: false },
                
            ]
            
        },
    
    {
        question: " Какое устройство, установленное на транспортном средстве типа FL, служит для размыкания электрических цепей в случае аварии при перевозке опасного груза?",
        answers: [
            { text: "1. Пламегасительное устройство (огневой предохранитель).", correct: false },
            { text: "4. Предохранительный клапан.", correct: false },
            { text: "3. Главный выключатель аккумуляторной батареи.", correct: true },
            { text: "4. Автоматическая система пожаротушения для двигательного отделения.", correct: false }
        ]
        
    },
    {
        question: "В автоцистерне перевозится опасное для окружающей среды вещество № ООН 1203 БЕНЗИН МОТОРНЫЙ. Какая запись должна быть обязательно сделана в транспортном документе?",
        answers: [
            { text: "1. Вид опасности груза: «Легко воспламеняется».", correct: false },
            { text: "2. Запись «Опасное для окружающей среды вещество».", correct: true },
            { text: "3. Плотность груза.", correct: false },
            { text: "4. Телефоны аварийных служб.", correct: false }
        ]
        
    },
    {
        question: "Требуется ли оформлять свидетельство о допуске к перевозке опасных грузов на седельный тягач, если в полуприцепе-цистерне предусматривается перевезти 20 000 литров дизельного топлива?",
        answers: [
            { text: "1. Не требуется, свидетельство необходимо только на полуприцеп-цистерну.", correct: false },
            { text: "2. Не требуется, поскольку дизельное топливо относится к группе веществ с низкой степенью опасности. ", correct: false },
            { text: "3. Не требуется, поскольку дизельное топливо не является грузом повышенной опасности.", correct: false },
            { text: "4. Требуется.", correct: true }
        ]
        
    },
    {
        question: "В транспортном документе при перевозке опасного груза в автоцистерне сделана следующая запись: “UN 1203 БЕНЗИН МОТОРНЫЙ, 3, II, (D/E), опасное для окружающей среды вещество”. Разрешен ли проезд автоцистерны через автодорожный тоннель категории С?",
        answers: [
            { text: "1. Нет.", correct: false },
            { text: "2. Да.", correct: true },
            { text: "3. Нет, так как движение всех транспортных средств, перевозящих опасные грузы в цистернах, через автодорожные тоннели запрещено.", correct: false },
            { text: "4. Данный дорожный знак не распространяется на автоцистерны, перевозящие опасные грузы в цистернах.", correct: false }
        ]
        
    },
    {
        question: "К какому типу транспортных средств относится полуприцеп-цистерна, предназначенный для перевозки жидкостей с температурой вспышки не выше 60 °С? (за исключением дизельного топлива, соответствующего стандарту EN 590:2013 + A1:2017, газойля и топлива печного легкого – № ООН 1202 – с температурой вспышки, указанной в стандарте EN 590:2013 + A1:2017)",
        answers: [
            { text: "1. Транспортное средство FL.", correct: true },
            { text: "2. Транспортное средство N3.", correct: false },
            { text: "3. Транспортное средство AT.", correct: false },
            { text: "4. В зависимости от вместимости, транспортное средство EX/II или EX/III.", correct: false }
        ]
        
    },
    {
        question: "Водителю нужно слить груз из секции цистерны, на которой прикреплена показанная на рисунке табличка оранжевого цвета. Что должен сделать водитель перед началом разгрузки?",
        answers: [
            { text: "1. Из свидетльства о допущении транспортны средств к перевозке некоторых вопасных грузов. ", correct: false },
            { text: "2. Из письменных инструкций.", correct: true },
            { text: "3. Из свидетельства о загрузке контейнера/транспортного средства.", correct: false },
            { text: "4. Из свидетельства ДОПОГ о подготовке водителя.", correct: false }
        ]
        
    },
    {
        question: "Как должен располагаться центр тяжести груза?",
        answers: [
            { text: "1. Закрыть двери кабины транспортного средства на замки.", correct: false },
            { text: "2. Заземлить шасси транспортного средства.", correct: true },
            { text: "3. Взять в руки огнетушитель.", correct: false },
            { text: "4. Прочитать письменные инструкции.", correct: false }
        ]
            },
        ],
        class1: [
            {
                question: "Какие взрывчатые вещества представляют наименьшую опасность при перевозке?",
                answers: [
                    { text: "1.Вещества подкласса 1.1, группа совместимости А.", correct: false },
                    { text: "2. Вещества подкласса 1.2, группа совместимости G.", correct: false },
                    { text: "3.Вещества подкласса 1.4, группа совместимости S.", correct: true },
                    { text: "4. Вещества подкласса 1.5, группа совместимости D.", correct: false }
                ]
            },
            {
                question: "Какой перевозочный документ содержит информацию для водителя о видах опасности груза и о действиях в случае аварии?",
                answers: [
                    { text: "1. Свидетельство ДОПОГ о подготовке водителей.", correct: false },
                    { text: "2. Письменные инструкции.", correct: true },
                    { text: "3. Свидетельство о регистрации транспортного средства.", correct: false },
                ]
                
            },
        
        {
            question: " Разрешается ли членам экипажа курить в кабине транспортного средства при перевозке взрывчатых веществ или изделий (класс 1)?",
            answers: [
                { text: "1. Разрешается только помощнику водителя.", correct: false },
                { text: "2. Запрещается.", correct: true },
                { text: "3. Запрещается только при перевозке пиротехнических веществ.", correct: false },
                { text: "4. Разрешается, если транспортное средство оборудовано самосрабатывающим или легко приводимым в действие стационарным устройством для тушения пожара в кабине транспортного средства.", correct: false },
            ]
            
        },
    
    {
        question: " Может ли горение взрывчатых веществ подкласса 1.5 перейти в детонацию?",
        answers: [
            { text: "1. Только при условии, если количество взрывчатых веществ превышает 10 кг.", correct: false },
            { text: "4. Вероятность перехода от горения к детонации крайне мала.", correct: true },
            { text: "3. Переход от горения к детонации происходит в любом случае.", correct: false },
            { text: "4. Вещества, отнесенные к подклассу 1.5 не подвержены возгораниям.", correct: false }
        ]
        
    },
    {
        question: " Может ли удар или пламя привести к детонации взрывчатого вещества?Выберите наиболее полный ответ.",
        answers: [
            { text: "1. Взрывчатые вещества и изделия не подвержены риску детонации.", correct: false },
            { text: "2. К детонации взрывчатого вещества может привести только сильный нагрев, например, в случае пожара на транспортном средстве.", correct: false },
            { text: "3. Да, во многих случаях даже слабый удар, пламя или искра могут привести к детонации взрывчатого вещества.", correct: true },
            { text: "4. Да, только в том случае, когда взрывчатое вещество запрессовано в тонкостенную металлическую оболочку или капсюль.", correct: false }
        ]
        
    },
    {
        question: "Разрешается ли на порожней, не очищенной от остатков опасного груза смесительно-зарядной машине перевозить пассажиров?",
        answers: [
            { text: "1. Не разрешается.", correct: true },
            { text: "2. Разрешается. ", correct: false },
            { text: "3. Разрешается, если количество остатков опасного груза не превышает макси мальных значений, указанных в подразделе 1.1.3.6 ДОПОГ.", correct: false },
            { text: "4. Разрешается, если на смесительно-зарядной машине не перевозятся детонаторы или упакованные взрывчатые вещества класса 1.", correct: false }
        ]
        
    },
    {
        question: "В соответствии с требованиями ДОПОГ, перевозка взрывчатых веществ и изделий (класс 1) может осуществляться на специализированных транспортных средствах. К какому типу относятся эти транспортные средства?",
        answers: [
            { text: "1. Транспортное средство BK3.", correct: false },
            { text: "2. Транспортное средство FL.", correct: false },
            { text: "3. Транспортное средство АТ.", correct: false },
            { text: "4. Транспортное средство EX/II, EX/III и MEMU.", correct: true }
        ]
        
    },
    {
        question: " Обязательно ли дополнительное специализированное обучение водителей транспортных средств, на которых осуществляются перевозки опасных грузов класса 1, в количестве превышающем указанное в подразделе 1.1.3.6 приложения А к ДОПОГ?",
        answers: [
            { text: "1. Обязательно.", correct: false },
            { text: "2. Не обязательно.", correct: false },
            { text: "3. Обязательно, только в случаях, предусмотренных ДОПОГ.", correct: true },
            { text: "4. Обязательно, только в случаях перевозки веществ и изделий, отнесенных к подклассам 1.1, 1.2 и 1.3.", correct: false }
        ]
        
    },
    {
        question: "К какому подклассу относятся взрывчатые изделия (класс 1), которые характеризуются опасностью взрыва массой?",
        answers: [
            { text: "1. К подклассу 1.1. ", correct: true },
            { text: "2. К подклассу 1.3.", correct: false },
            { text: "3. К подклассу 1.4.", correct: false },
            { text: "4. К подклассу 1.6.", correct: false }
        ]
        
    },
    {
        question: "Относятся ли пиротехнические изделия к опасным грузам класса 1 при их перевозке автомобильным транспортом?",
        answers: [
            { text: "1. Не относятся.", correct: false },
            { text: "2. Относятся.", correct: true },
            { text: "3. Относятся только пиротехнические изделия, предназначенные для проведения фейерверков.", correct: false },
            { text: "4. Относятся, только если они упакованы для розничной торговли и предназна-чены для использования в быту.", correct: false }
        ]
            },
            // Добавьте больше вопросов
        ],
        class7: [
            {
                question: "Назначены ли группы упаковки опасным грузам класса 7?",
                answers: [
                    { text: "1. Да.", correct: false },
                    { text: "2. Да, только делящимся радиоактивным материалам.", correct: false },
                    { text: "3. Да, только радиоактивным материалам особого вида.", correct: false },
                    { text: "4. Нет.", correct: true }
                ]
            },
            {
                question: "Какая из нижеперечисленных позиций перечня опасных грузов относится к классу опасности 7",
                answers: [
                    { text: "1. № ООН 0079 ГЕКСАНИТРОДИФЕНИЛАМИН (ДИПИКРИЛАМИН, ГЕКСИЛ).", correct: false },
                    { text: "2. № ООН 1992 ЛЕГКОВОСПЛАМЕНЯЮЩАЯСЯ ЖИДКОСТЬ ТОКСИЧНАЯ, Н.У.К.", correct: false },
                    { text: "3. № ООН 2807 МАТЕРИАЛ НАМАГНИЧЕННЫЙ.", correct: false },
                    { text: "4. № ООН 3328 РАДИОАКТИВНЫЙ МАТЕРИАЛ, УПАКОВКА ТИПА B(U), ДЕЛЯЩИЙСЯ.", correct: true },
                ]
                
            },
        
        {
            question: " Водитель должен перевезти упаковки с опасным грузом, маркированные знаками опасности № 7А. Какой из указанных предметов должен быть на транспортном средстве, если к нему, в соответствии с требованиями ДОПОГ, должны крепиться таблички оранжевого цвета?",
            answers: [
                { text: "1. Каска для водителя.", correct: false },
                { text: "2. Пара защитных перчаток.", correct: true },
                { text: "3. Мобильный телефон.", correct: false },
                { text: "4. Лопата.", correct: false },
            ]
            
        },
    
    {
        question: " Обязаны ли юридические и физические лица, которые осуществляют перевозку радиоактивных материалов, проводить контроль и учет индивидуальных доз облучения персонала?",
        answers: [
            { text: "1. Обязаны.", correct: true },
            { text: "4. Обязаны только по требованию персонала, занятого в перевозке радиоактивных материалов.", correct: false },
            { text: "3. Обязаны только в том случае, если расстояние перевозки превышает 50 км.", correct: false },
            { text: "4. Не обязаны.", correct: false }
        ]
        
    },
    {
        question: " Относятся ли изделия, содержащие радиоактивные материалы, к опасным грузам при их перевозке автомобильным транспортом?",
        answers: [
            { text: "1. Не относятся.", correct: false },
            { text: "2. Относятся в любом случае.", correct: false },
            { text: "3. Относятся, если они являются составной частью транспортных средств.", correct: false },
            { text: "4. Относятся изделия, содержащие радионуклиды, при условии, что концентрация активности радионуклидов, а также полная активность груза превышают значения, указанные в нормах и правилах ядерной и радиационной безопасности", correct: true }
        ]
        
    },
    {
        question: "Как определяется значение транспортного индекса (ТИ) для упаковки?",
        answers: [
            { text: "1. Определяется масса упаковки, содержащей радиоактивный материал, и полученное значение делиться на 10.", correct: false },
            { text: "2. Определяется внутренний объем упаковки для радиоактивного материала, и полученное значение умножается на 5. ", correct: false },
            { text: "3. Определяется максимальный уровень излучения в мЗв/ч (миллизиверт в час) на расстоянии 1 м от внешних поверхностей упаковки и полученное значение умножается на 100.", correct: true },
            { text: "4. Определяется максимальный уровень излучения в мЗв/ч (миллизиверт в час) в кабине водителя и полученное значение умножается на 1000.", correct: false }
        ]
        
    },
    {
        question: "Разрешается ли на транспортном средстве, перевозящем освобожденные упаковки, присутствие пассажиров?",
        answers: [
            { text: "1. Не разрешается.", correct: false },
            { text: "2. Разрешается только в том случае, если расстояние перевозки превышает 20 км.", correct: false },
            { text: "3. Разрешается только в том случае, если сума транспортных индексов не превышает 10.", correct: false },
            { text: "4. Разрешается.", correct: true }
        ]
        
    },
    {
        question: "Разрешается ли упаковки, обозначенные данными знаками опасности, грузить совместно в одно транспортное средство в обычных условиях перевозки? Разрешается ли упаковки, обозначенные данными знаками опасности, грузить совместно в одно транспортное средство в обычных условиях перевозки?",
        answers: [
            { text: "1. Разрешается, если упаковки с радиоактивным материалом находятся в специальном отсеке.", correct: false },
            { text: "2. Не разрешается.", correct: true },
            { text: "3. На усмотрение водителя.", correct: false },
            { text: "4. Разрешается.", correct: false }
        ]
        
    },
    {
        question: "Каким видом опасности должны обладать вещества для отнесения их к классу 7?",
        answers: [
            { text: "1. Легковоспламеняемостью. ", correct: false },
            { text: "2. Способностью вызывать инфекционные заболевания у людей и животных.", correct: false },
            { text: "3. Способностью к самовозгоранию.", correct: false },
            { text: "4. Опасностью испускания ионизирующего излучения..", correct: true }
        ]
        
    },
    {
        question: "Какой нормативный документ предусматривает наличие у водителя «аварийной карточки» при перевозке веществ или изделий класса 7?",
        answers: [
            { text: "1. ДОПОГ.", correct: false },
            { text: "2. НРБ 099/2009.", correct: false },
            { text: "3. НП 053-16.", correct: true }, 
        ]
            },
            // Добавьте больше вопросов
        ]
    };

    testBlocks.forEach(block => {
        block.addEventListener("click", () => {
            currentTest = block.dataset.test;
            startTest();
        });
    });

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < tests[currentTest].length) {
            setNextQuestion();
        } else {
            showResults();
        }
    });

    function startTest() {
        testBlocks.forEach(block => block.classList.add("hide"));
        quizContainer.classList.remove("hide");
        currentQuestionIndex = 0;
        score = 0;
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(tests[currentTest][currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.textContent = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("request-btn");
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
            answersElement.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add("hide");
        while (answersElement.firstChild) {
            answersElement.removeChild(answersElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        if (correct) {
            score++;
            selectedButton.classList.add("correct");
        } else {
            selectedButton.classList.add("wrong");
        }
        Array.from(answersElement.children).forEach(button => {
            if (button.dataset.correct) {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.classList.remove("hide");
    }

    function showResults() {
        resetState();
        questionElement.textContent = `Вы набрали ${score} из ${tests[currentTest].length}`;
        nextButton.textContent = "Пройти другой тест";
        nextButton.addEventListener("click", () => {
            location.reload();
        });
        nextButton.classList.remove("hide");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const answers = document.querySelectorAll(".answer");

    answers.forEach(answer => {
        answer.addEventListener("click", function() {
            const isCorrect = this.getAttribute("data-correct") === "true";

            if (isCorrect) {
                this.classList.add("correct");
            } else {
                this.classList.add("wrong");
            }
        });
    });
});


