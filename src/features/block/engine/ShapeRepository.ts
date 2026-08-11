import type { ShapeDefinition } from "./ShapeDefinition";

interface BaseShape {
    name: string;
    weight: number;
    shape: number[][];
}

function rotate(shape: number[][]): number[][] {
    return shape[0].map((_, colIndex) => shape.map((row) => row[colIndex]).reverse());
}

function flipHorizontal(shape: number[][]): number[][] {
    return shape.map((row) => [...row].reverse());
}

function normalize(shape: number[][]): number[][] {
    let minRow = shape.length;
    let minCol = shape[0]?.length ?? 0;

    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] === 1) {
                minRow = Math.min(minRow, row);
                minCol = Math.min(minCol, col);
            }
        }
    }

    return shape.slice(minRow).map((row) => row.slice(minCol));
}

function shapeKey(shape: number[][]): string {
    return normalize(shape)
        .map((row) => row.join(""))
        .join("|");
}

function generateVariants(shape: number[][]): number[][][] {
    const variants: number[][][] = [];
    const seen = new Set<string>();

    let current = shape;

    for (let i = 0; i < 4; i++) {
        const normal = normalize(current);
        const normalKey = shapeKey(normal);

        if (!seen.has(normalKey)) {
            seen.add(normalKey);
            variants.push(normal);
        }

        const flipped = normalize(flipHorizontal(current));
        const flippedKey = shapeKey(flipped);

        if (!seen.has(flippedKey)) {
            seen.add(flippedKey);
            variants.push(flipped);
        }

        current = rotate(current);
    }

    return variants;
}

const baseShapes: BaseShape[] = [
    // ===== 1 BLOCK =====
    {
        name: "Single",
        weight: 8,
        shape: [[1]],
    },

    // ===== 2 BLOCKS =====
    {
        name: "Domino",
        weight: 7,
        shape: [[1, 1]],
    },

    // ===== 3 BLOCKS =====
    {
        name: "Line3",
        weight: 6,
        shape: [[1, 1, 1]],
    },
    {
        name: "L Small",
        weight: 5,
        shape: [
            [1, 0],
            [1, 1],
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
        name: "Line4",
        weight: 5,
        shape: [[1, 1, 1, 1]],
    },
    {
        name: "L4",
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
        name: "Z",
        weight: 4,
        shape: [
            [1, 1, 0],
            [0, 1, 1],
        ],
    },

    // ===== 5 BLOCKS =====
    {
        name: "Line5",
        weight: 2,
        shape: [[1, 1, 1, 1, 1]],
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
        name: "Big L",
        weight: 3,
        shape: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 1],
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
];

export class ShapeRepository {
    static readonly shapes: ShapeDefinition[] = baseShapes.flatMap((baseShape) => {
        const variants = generateVariants(baseShape.shape);

        const variantWeight = baseShape.weight / variants.length;

        return variants.map((shape, index) => ({
            name: variants.length === 1 ? baseShape.name : `${baseShape.name} ${index + 1}`,
            weight: variantWeight,
            shape,
        }));
    });
}
