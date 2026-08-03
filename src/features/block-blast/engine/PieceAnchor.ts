export interface Anchor {

    row: number;

    col: number;

}

export class PieceAnchor {

    static calculate(shape: number[][]): Anchor {

        const blocks: Anchor[] = [];

        // Lấy toàn bộ block = 1
        for (let row = 0; row < shape.length; row++) {

            for (let col = 0; col < shape[row].length; col++) {

                if (shape[row][col] === 1) {

                    blocks.push({
                        row,
                        col,
                    });

                }

            }

        }

        if (blocks.length === 0) {

            return {
                row: 0,
                col: 0,
            };

        }

        // Tính centroid
        const centerRow =
            blocks.reduce(
                (sum, block) => sum + block.row,
                0
            ) / blocks.length;

        const centerCol =
            blocks.reduce(
                (sum, block) => sum + block.col,
                0
            ) / blocks.length;

        // Tìm block gần centroid nhất
        let anchor = blocks[0];

        let minDistance = Number.MAX_VALUE;

        for (const block of blocks) {

            const distance =
                (block.row - centerRow) ** 2 +
                (block.col - centerCol) ** 2;

            if (distance < minDistance) {

                minDistance = distance;

                anchor = block;

            }

        }

        return anchor;

    }

}