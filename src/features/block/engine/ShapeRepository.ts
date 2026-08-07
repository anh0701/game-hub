export class ShapeRepository {
    static readonly shapes = [
        // ===== 1 BLOCK =====
        {
            name: "Single",
            weight: 8,
            shape: [[1]],
        },

        // ===== 2 BLOCKS =====
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

        // ===== 3 BLOCKS =====
        {
            name: "Line3 Horizontal",
            weight: 6,
            shape: [[1, 1, 1]],
        },
        {
            name: "Line3 Vertical",
            weight: 6,
            shape: [[1], [1], [1]],
        },
        {
            name: "L Small └",
            weight: 5,
            shape: [
                [1, 0],
                [1, 1],
            ],
        },
        {
            name: "L Small ┘",
            weight: 5,
            shape: [
                [0, 1],
                [1, 1],
            ],
        },
        {
            name: "L Small ┌",
            weight: 5,
            shape: [
                [1, 1],
                [1, 0],
            ],
        },
        {
            name: "L Small ┐",
            weight: 5,
            shape: [
                [1, 1],
                [0, 1],
            ],
        },

        // ===== 4 BLOCKS =====
        {
            name: "Square",
            weight: 6,
            shape: [
                [1, 1],
                [1, 1],
            ],
        },
        {
            name: "Line4 Horizontal",
            weight: 5,
            shape: [[1, 1, 1, 1]],
        },
        {
            name: "Line4 Vertical",
            weight: 5,
            shape: [[1], [1], [1], [1]],
        },
        {
            name: "L4 └",
            weight: 5,
            shape: [
                [1, 0],
                [1, 0],
                [1, 1],
            ],
        },
        {
            name: "L4 ┘",
            weight: 5,
            shape: [
                [0, 1],
                [0, 1],
                [1, 1],
            ],
        },
        {
            name: "L4 ┌",
            weight: 5,
            shape: [
                [1, 1],
                [1, 0],
                [1, 0],
            ],
        },
        {
            name: "L4 ┐",
            weight: 5,
            shape: [
                [1, 1],
                [0, 1],
                [0, 1],
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
            name: "T Down",
            weight: 5,
            shape: [
                [0, 1, 0],
                [1, 1, 1],
            ],
        },
        {
            name: "T Left",
            weight: 5,
            shape: [
                [1, 0],
                [1, 1],
                [1, 0],
            ],
        },
        {
            name: "T Right",
            weight: 5,
            shape: [
                [0, 1],
                [1, 1],
                [0, 1],
            ],
        },
        {
            name: "Z",
            weight: 4,
            shape: [
                [1, 1, 0],
                [0, 1, 1],
            ],
        },
        {
            name: "S",
            weight: 4,
            shape: [
                [0, 1, 1],
                [1, 1, 0],
            ],
        },

        // ===== 5 BLOCKS =====
        {
            name: "Line5",
            weight: 2,
            shape: [[1, 1, 1, 1, 1]],
        },
        {
            name: "Line5 Vertical",
            weight: 2,
            shape: [[1], [1], [1], [1], [1]],
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
            name: "Big L └",
            weight: 3,
            shape: [
                [1, 0, 0],
                [1, 0, 0],
                [1, 1, 1],
            ],
        },
        {
            name: "Big L ┘",
            weight: 3,
            shape: [
                [0, 0, 1],
                [0, 0, 1],
                [1, 1, 1],
            ],
        },
        {
            name: "Big L ┌",
            weight: 3,
            shape: [
                [1, 1, 1],
                [1, 0, 0],
                [1, 0, 0],
            ],
        },
        {
            name: "Big L ┐",
            weight: 3,
            shape: [
                [1, 1, 1],
                [0, 0, 1],
                [0, 0, 1],
            ],
        },
        {
            name: "U",
            weight: 3,
            shape: [
                [1, 0, 1],
                [1, 1, 1],
            ],
        },
        {
            name: "Corner",
            weight: 4,
            shape: [
                [1, 1, 1],
                [1, 0, 0],
            ],
        },
        {
            name: "Corner Mirror",
            weight: 4,
            shape: [
                [1, 1, 1],
                [0, 0, 1],
            ],
        },
    ];
}
