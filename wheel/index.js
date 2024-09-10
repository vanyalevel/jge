/*
 * Copyright (c) 2020. shtrih
 */

const dataSets = {
    inventory: [
        'LEGO The Lord of the Rings',
        'Star Wars: The Force Unleashed II',
        'Turok (2008)',
        'Heavy Rain',
        'Fahrenheit: Indigo Prophecy Remastered',
        'Prince of Persia: Warrior Within',
        'Dying Light',
        'Sleeping Dogs: Definitive Edition',
        'Kung Fu Panda',
        'Илья Муромец и Соловей-Разбойник',
    ],

    wheel2: [        
       'LIMBO',
       "Mirror's Edge",
       'Outlast',
       'Grand Theft Auto: Vice City',
       'Plants vs. Zombies',
       'Goat Simulator',
       'Stray',
       'Detroit: Become Human',
       'Blitzkrieg 2 Anthology',
       'LEGO Star Wars: The Skywalker Saga',
       'Watch Dogs',
       "Teenage Mutant Ninja Turtles: Shredder's Revenge",
    ],

    wheel9: [
    'Shrek 2',
    'Dishonored',
    'Sonic Adventure DX',
    'The Stanley Parable: Ultra Deluxe',
    'Black Mesa',
    'Blasphemous',
    'Ghostrunner',
    'Doki Doki Literature Club!',
    'Overlord 2',
    'Warhammer 40,000: Space Marine',
    'Katana ZERO',
    'South Park: The Stick of Truth',
    ],

wheel4: [
'Devil May Cry 3',
'The Binding of Isaac: Repentance', 
'Harry Potter Chamber of Secrets',
'Hotline Miami',
'Fallout 2',
'The Last of Us Part 1',
'Metal Gear Solid (1998)',
'Hyper Light Drifter',
'Call of Duty World at War',
'Super Meat Boy',
    ],

wheel5: [
'Sonic Heroes',
'Neighbours back From Hell',
'Slime Rancher',
'Batman: Arkham Knight',
"Assassin's Creed III",
"Marvel's Spider-Man: Game of the Year Edition",
'Game Dev Tycoon',
'LEGO Jurassic World',
'Spore',
'Jurassic World Evolution 2',
        ],

wheel3: [
'Ratchet & Clank Future: Tools of Destruction',
'Spider-Man: Web of Shadows',
'Necrosmith',
'Shank',
'Serious Sam 4',
'Samurai Jack: Battle Through Time',
'Bully',
'Ratatouille',
'Barnyard',
"Assassin's Creed II",
'Portal 2',
'Shank 2',
],

    effects: [
        'Халява',
        'Казуалыч',
        'Кайфуй малютка',
        'Пока духота',
        'Задрот',
        'Englando',
        'Спасибо папаша',
        'Псих',
        'Заело',
        'Больше Жубчиков',
        'Пират',
        'Помоги Дружище',
        'Помощь зала',
        'Игровая макака',
        'Летсплеер-долбоеб',
        'Реверс',
        '#ялюблюигры',
        'Левша',
        '#яненавижуигры',
        'Переводчик',
        'Тормоз',
    ],
    coin: [
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Ребро!',
    ],
    streamers: [
        'MistaFaker',
        'Lasqa',
        'Liz0n',
        'Melharucos',
        'UselessMouth',
        'UncleBjorn',
    ],
    debuffs: [
        'Мистер Ржавчик',
        'Облизанный ободок унитаза',
        'Скупщик гречи',
        'ОПЯТЬ НДИДИ',
        'Вор',
        'Чат выбирает',
        'Тест на вирус',
        'Штаны на 40 хрывень',
        'Залутанная локация',
        'Конченное событие',
        'Комбо неудач',
        'Дух Рэмбо',
        'Не та позиция тебе выпала, стремлер',
        'Чуйка на говно',
        'Три топора',
        'Аттракцион невиданной щедрости',
        'Предательский столб',
        'Падение пиццианской башни',
    ]
};
let currentDataSet = 'inventory',
    editedDataSets = {};

const editDialog = document.getElementById('dialog-edit'),
    editButton = document.getElementById('btn-edit'),
    editConfirmButton = editDialog.getElementsByClassName('apply')[0],
    editOptions = editDialog.getElementsByClassName('options')[0],
    editPresets = editDialog.getElementsByClassName('presets')[0],
    optionClick = function (option, checked) {
        editedDataSets[currentDataSet][option] = checked;
    },
    generateOptions = function (dataObject) {
        let options = '';
        for (let i in dataObject) {
            options += `<label><input type="checkbox" onchange="optionClick('${i}', this.checked)" ${dataObject[i] ? 'checked' : ''} />${i}</label><br />`;
        }

        return options;
    },
    resetEditedDataSet = function () {
        editedDataSets[currentDataSet] = Object.fromEntries(dataSets[currentDataSet].map(v => v).sort().map(v => [v, true]));
    },
    editedDataToArray = function () {
        let result = [];

        for (let [key, value] of Object.entries(editedDataSets[currentDataSet])) {
            if (value) {
                result.push(key)
            }
        }

        return result;
    }
;

editButton.addEventListener('click', function () {
    if (currentDataSet === 'custom') {
        p5Instance.mouseDragEnable(false);
        customDialog.style.display = 'block';

        return;
    }

    editDialog.style.display = 'block';
    p5Instance.mouseDragEnable(false);

    editPresets.innerHTML = '';
    editPresets.append(...presets.getNodes(currentDataSet));
    editOptions.innerHTML = generateOptions(editedDataSets[currentDataSet]);
});
editConfirmButton.addEventListener('click', function () {
    editDialog.style.display = 'none';
    p5Instance.mouseDragEnable();

    p5Instance.setData(editedDataToArray());
});

class Preset {
    constructor(title, disabledEntries, isDefault) {
        this._title = title;
        this._disabledEntries = disabledEntries;
        this._isDefault = Boolean(isDefault);
    }

    get isDefault() {
        return this._isDefault;
    }

    get domNode() {
        const el = document.createElement('a');

        el.setAttribute('href', '#');
        el.appendChild(document.createTextNode(this._title));
        el.addEventListener('click', this.handleClick.bind(this));

        return el;
    }

    handleClick() {
        resetEditedDataSet();

        for(const i in this._disabledEntries) {
            if (editedDataSets[currentDataSet][this._disabledEntries[i]]) {
                editedDataSets[currentDataSet][this._disabledEntries[i]] = false;
            }
        }

        editOptions.innerHTML = generateOptions(editedDataSets[currentDataSet]);

        return false;
    }
}

class PresetAll extends Preset {
    constructor(isDefault) {
        super('Выбрать всё', [], isDefault);
    }
}

class PresetWithoutSpecialRolls extends Preset {
    constructor(isDefault) {
        super(
            'Без спецроллов',
            [
                'Чуйка на говно',
                'Выбор Бумера',
                'Выбор Зумера',
                'Чат здесь закон',
                'Я здесь закон',
                'Never Lucky',
            ],
            isDefault
        );
    }
}

class Presets {
    constructor() {
        this._presets = {
            // inventory: [
            //     new PresetAll(),
            // ],
            effects: [
                new PresetAll(),
                new PresetWithoutSpecialRolls(true),
            ],
            debuffs: [
                new PresetAll(),
                new PresetWithoutSpecialRolls(true),
            ],
            streamers: [
                new PresetAll(),
            ],
        };
    }

    hasPreset(dataSetKey) {
        return !!this._presets[dataSetKey];
    }

    getNodes(dataSetKey) {
        let result = [];

        for(const i in this._presets[dataSetKey]) {
            if (i % 2) {
                result.push(document.createTextNode(', '));
            }
            result.push(this._presets[dataSetKey][i].domNode);
        }

        return result;
    }

    applyDefaults(dataSetKey) {
        for(const i in this._presets[dataSetKey]) {
            if (this._presets[dataSetKey][i].isDefault) {
                this._presets[dataSetKey][i].handleClick();
            }
        }
    }
}

const presets = new Presets;

function getImageURI(index) {
    let result = '../hpg-inventory/images/000.png',
        offset = 0
    ;
    switch (currentDataSet) {
        case "inventory":
        offset = 50;
        result = '../hpg-inventory/images/0' + ('0' + (index + 1 + offset)).slice(-2) + '.png';
        break;
            
        case "effects":
            result = '../hpg-inventory/images/0' + ('0' + (index+1 + offset)).slice(-2) + '.png';
            break;
            
        case "debuffs":
            const mapping = [
                1,
                2,
                7,
                10,
                12,
                13,
                16,
                18,
                20,
                21,
                22,
                23,
                26,
                25,
                31,
                44,
                48,
                49
            ];
            result = '../hpg-inventory/images/0' + ('0' + (mapping[index])).slice(-2) + '.png';
            break;
            
        case "wheel2":
        offset = 60;
        result = '../hpg-inventory/images/0' + ('0' + (index + 1 + offset)).slice(-2) + '.png';
        break;

        case "wheel4":
        offset = 87;
        result = '../hpg-inventory/images/0' + ('0' + (index + 1 + offset)).slice(-2) + '.png';
        break;

        case "wheel9":
        offset = 75;
        result = '../hpg-inventory/images/0' + ('0' + (index + 1 + offset)).slice(-2) + '.png';
        break;

        case "wheel5":
        offset = 00;
        result = '../hpg-inventory/gameimages/0' + ('0' + (index + 1 + offset)).slice(-2) + '.png';
        break;
            
        case "wheel3":
        offset = 011;
        result = '../hpg-inventory/gameimages/0' + ('0' + (index + 1 + offset)).slice(-2) + '.png';
        break;
            
        case "coin":
            result = '../images/coin-obverse-20.png';
            if (index === 1) {
                result = '../images/coin-reverse-20.png';
            }
            if (index === 10) {
                result = '../images/coin-gurt.png';
            }
            break;

        case "streamers":
            result = '../images/streamers/'+ dataSets[currentDataSet][index] +'.png';
            break;
    }

    return result;
}

const p5Instance = new p5(wheelSketch);

p5Instance.onAfterSetup = function () {
    p5Instance.setVideos([
        ['videos/oxseniron.mp4'],
        ['videos/ganzydance.mp4'],
        ['videos/JOJO\'S BIZARRE MAKEUP TUTORIAL.mp4', 6],
        ['videos/[SFM] Shrekophone.mp4', 15],
        ['videos/04.mp4'],
        ['videos/10.mp4'],
        ['videos/14686000376951.webm'],
        ['videos/AndrewBoxer.mp4'],
        ['videos/agruchedet.mp4'],
        ['videos/clockwork.mp4'],
        ['videos/pashakdt2.mp4'],
        ['videos/Pashabassboost.mp4'],
        ['videos/agrch diss.mp4'],
        ['videos/sobiraem.mp4'],
        
    ]);
};

const image = document.querySelector('#item-image img');
p5Instance.onSelectItem = function(data, selectedKey) {
    if (dataSets[currentDataSet]) {
        image.src = getImageURI(dataSets[currentDataSet].indexOf(data[selectedKey]));
    }
    else {
        image.src = '../hpg-inventory/images/000.png';
    }
};

const customDialog = document.getElementById('custom-list'),
    customTextarea = customDialog.getElementsByTagName('textarea')[0],
    customButton = customDialog.getElementsByTagName('button')[0]
;

customButton.addEventListener('click', function () {
    customDialog.style.display = 'none';

    p5Instance.setData(customTextarea.value.split('\n'));
    p5Instance.mouseDragEnable();
});

let radios = document.querySelectorAll('[name="list"]');
for(let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function () {
        currentDataSet = this.value;

        if (this.value === 'custom') {
            p5Instance.mouseDragEnable(false);
            customDialog.style.display = 'block';

            return;
        }

        customDialog.style.display = 'none';
        p5Instance.mouseDragEnable();

        if (presets.hasPreset(currentDataSet)) {
            if (!editedDataSets[currentDataSet]) {
                resetEditedDataSet();
                presets.applyDefaults(currentDataSet);
            }

            p5Instance.setData(editedDataToArray());
            editButton.removeAttribute('disabled');
        }
        else {
            p5Instance.setData(dataSets[currentDataSet]);
            editButton.setAttribute('disabled', 'disabled');
        }
    });

    // Выбираем начальный вариант при загрузке страницы
    if (radios[i].hasAttribute('checked')) {
        radios[i].dispatchEvent(new Event('click'));
    }
}
