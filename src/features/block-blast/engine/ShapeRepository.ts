export interface ShapeDefinition {
    name: string;
    weight: number;
    shape: number[][];
}

export const SHAPES: ShapeDefinition[] = [

    {
        name: "Single",
        weight: 12,
        shape: [
            [1]
        ]
    },
    {
        name: "Line2H",
        weight: 10,
        shape: [
            [1,1]
        ]
    },
    {
        name: "Line2V",
        weight: 10,
        shape: [
            [1],
            [1]
        ]
    },
    {
        name: "Line3H",
        weight: 9,
        shape: [
            [1,1,1]
        ]
    },
    {
        name: "Line3V",
        weight: 9,
        shape: [
            [1],
            [1],
            [1]
        ]
    },
    {
        name: "Line4H",
        weight: 6,
        shape: [
            [1,1,1,1]
        ]
    },
    {
        name: "Line4V",
        weight: 6,
        shape: [
            [1],
            [1],
            [1],
            [1]
        ]
    },
    {
        name: "Line5H",
        weight: 3,
        shape: [
            [1,1,1,1,1]
        ]
    },
    {
        name: "Line5V",
        weight: 3,
        shape: [
            [1],
            [1],
            [1],
            [1],
            [1]
        ]
    },
    {
        name: "Square2",
        weight: 8,
        shape: [
            [1,1],
            [1,1]
        ]
    },
    {
        name: "Square3",
        weight: 2,
        shape: [
            [1,1,1],
            [1,1,1],
            [1,1,1]
        ]
    },
    {
        name: "L1",
        weight: 7,
        shape: [
            [1],
            [1],
            [1,1]
        ]
    },
    {
        name: "L2",
        weight: 7,
        shape: [
            [1,1],
            [1],
            [1]
        ]
    },
    {
        name: "L3",
        weight: 7,
        shape: [
            [1,1],
            [0,1],
            [0,1]
        ]
    },
    {
        name: "L4",
        weight: 7,
        shape: [
            [0,1],
            [0,1],
            [1,1]
        ]
    },
    {
        name: "SmallL1",
        weight: 8,
        shape: [
            [1,1],
            [1,0]
        ]
    },
    {
        name: "SmallL2",
        weight: 8,
        shape: [
            [1,1],
            [0,1]
        ]
    },
    {
        name: "SmallL3",
        weight: 8,
        shape: [
            [1,0],
            [1,1]
        ]
    },
    {
        name: "SmallL4",
        weight: 8,
        shape: [
            [0,1],
            [1,1]
        ]
    },
    {
        name: "TUp",
        weight: 5,
        shape: [
            [1,1,1],
            [0,1,0]
        ]
    },
    {
        name: "TDown",
        weight: 5,
        shape: [
            [0,1,0],
            [1,1,1]
        ]
    },
    {
        name: "TLeft",
        weight: 5,
        shape: [
            [1,0],
            [1,1],
            [1,0]
        ]
    },
    {
        name: "TRight",
        weight: 5,
        shape: [
            [0,1],
            [1,1],
            [0,1]
        ]
    },
    {
        name: "Z1",
        weight: 5,
        shape: [
            [1,1,0],
            [0,1,1]
        ]
    },
    {
        name: "Z2",
        weight: 5,
        shape: [
            [0,1,1],
            [1,1,0]
        ]
    },
    {
        name: "Plus",
        weight: 2,
        shape: [
            [0,1,0],
            [1,1,1],
            [0,1,0]
        ]
    },
    {
        name: "U",
        weight: 2,
        shape: [
            [1,0,1],
            [1,1,1]
        ]
    },
    {
        name: "C",
        weight: 2,
        shape: [
            [1,1,1],
            [1,0,0],
            [1,1,1]
        ]
    },
    {
        name: "CornerBig1",
        weight: 3,
        shape: [
            [1,1,1],
            [1,0,0],
            [1,0,0]
        ]
    },
    {
        name: "CornerBig2",
        weight: 3,
        shape: [
            [1,1,1],
            [0,0,1],
            [0,0,1]
        ]
    },
    {
        name: "CornerBig3",
        weight: 3,
        shape: [
            [1,0,0],
            [1,0,0],
            [1,1,1]
        ]
    },
    {
        name: "CornerBig4",
        weight: 3,
        shape: [
            [0,0,1],
            [0,0,1],
            [1,1,1]
        ]
    }

];