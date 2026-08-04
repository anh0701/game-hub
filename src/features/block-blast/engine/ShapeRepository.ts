export class ShapeRepository {
    static readonly shapes = [
        {
            name: "Single",

            weight: 8,

            shape: [[1]],
        },

        {
            name: "Domino Horizontal",

            weight: 7,

            shape: [[1, 1]],
        },

        {
            name: "Domino Vertical",

            weight: 7,

            shape: [[1], [1]],
        },

        {
            name: "Square",

            weight: 6,

            shape: [
                [1, 1],

                [1, 1],
            ],
        },

        {
            name: "L",

            weight: 5,

            shape: [
                [1, 0],

                [1, 0],

                [1, 1],
            ],
        },

        {
            name: "T",

            weight: 5,

            shape: [
                [1, 1, 1],

                [0, 1, 0],
            ],
        },

        {
            name: "Plus",

            weight: 3,

            shape: [
                [0, 1, 0],

                [1, 1, 1],

                [0, 1, 0],
            ],
        },

        {
            name: "Line5",

            weight: 2,

            shape: [[1, 1, 1, 1, 1]],
        },
    ];
}
