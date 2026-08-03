import type { ShapeDefinition } from "./ShapeDefinition";

export class ShapeRepository {

    static readonly shapes: ShapeDefinition[] = [

        {
            name: "Single",

            weight: 8,

            shape: [

                [1]

            ],

            anchor: {

                row: 0,

                col: 0,

            },

        },

        {

            name: "Domino Horizontal",

            weight: 7,

            shape: [

                [1, 1]

            ],

            anchor: {

                row: 0,

                col: 0,

            },

        },

        {

            name: "Domino Vertical",

            weight: 7,

            shape: [

                [1],

                [1]

            ],

            anchor: {

                row: 0,

                col: 0,

            },

        },

        {

            name: "Square",

            weight: 6,

            shape: [

                [1,1],

                [1,1]

            ],

            anchor: {

                row: 0,

                col: 0,

            },

        },

        {

            name: "L",

            weight: 5,

            shape: [

                [1,0],

                [1,0],

                [1,1]

            ],

            anchor: {

                row: 2,

                col: 0,

            },

        },

        {

            name: "T",

            weight: 5,

            shape: [

                [1,1,1],

                [0,1,0]

            ],

            anchor: {

                row: 0,

                col: 1,

            },

        },

        {

            name: "Plus",

            weight: 3,

            shape: [

                [0,1,0],

                [1,1,1],

                [0,1,0]

            ],

            anchor: {

                row: 1,

                col: 1,

            },

        },

        {

            name: "Line5",

            weight: 2,

            shape: [

                [1,1,1,1,1]

            ],

            anchor: {

                row: 0,

                col: 2,

            },

        }

    ];

}