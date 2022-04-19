/*----配置文件----*/

// L型方块
const blockL = [
    [
        [1, 0],
        [1, 0],
        [1, 1]
    ],
    [
        [0, 0, 1],
        [1, 1, 1]
    ],
    [
        [1, 1],
        [0, 1],
        [0, 1]
    ],
    [
        [1, 1, 1],
        [1, 0, 0]
    ]
];

// J型方块
const blockJ = [
    [
        [0, 1],
        [0, 1],
        [1, 1]
    ],
    [
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [1, 1],
        [1, 0],
        [1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 1]
    ]
];

// I型方块
const blockI = [
    [
        [1, 1, 1, 1]
    ],
    [
        [1],
        [1],
        [1],
        [1]
    ],
    [
        [1, 1, 1, 1]
    ],
    [
        [1],
        [1],
        [1],
        [1]
    ]
];

// O型方块
const blockO = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1],
        [1, 1]
    ]
];

// T型方块
const blockT = [
    [
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [1, 0],
        [1, 1],
        [1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        [0, 1],
        [1, 1],
        [0, 1]
    ]
];

// S型方块
const blockS = [
    [
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0],
        [1, 1],
        [0, 1]
    ],
    [
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0],
        [1, 1],
        [0, 1]
    ]
];

// Z型方块
const blockZ = [
    [
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1],
        [1, 1],
        [1, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1],
        [1, 1],
        [1, 0]
    ]
]

/*----网格大小、方块大小----*/
const ROWS = 30;
const COLS = 20;
const BLOCK_SIZE = 20;