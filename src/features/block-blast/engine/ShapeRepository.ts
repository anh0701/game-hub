export interface ShapeDefinition {

    name: string;

    weight: number;

    shape: number[][];

}

export const SHAPES: ShapeDefinition[] = [

    {
        name: "Single",
        weight: 10,
        shape: [
            [1]
        ]
    },

    {
        name: "Line2H",
        weight: 8,
        shape: [
            [1, 1]
        ]
    },

    {
        name: "Line2V",
        weight: 8,
        shape: [
            [1],
            [1]
        ]
    },

    {
        name: "Square2",
        weight: 6,
        shape: [
            [1, 1],
            [1, 1]
        ]
    },

    {
        name: "Cross",

        weight: 2,

        shape: [
            [0,1,0],
            [1,1,1],
            [0,1,0]
        ]
    },

];