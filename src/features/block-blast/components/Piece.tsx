import type { Piece } from "../models/Piece";

interface Props {
    piece: Piece;
}

export default function Piece({ piece }: Props) {

    return (

        <div className="inline-grid gap-1">

            {
                piece.shape.map((row, r) =>

                    <div
                        key={r}
                        className="flex gap-1"
                    >

                        {
                            row.map((cell, c) =>

                                <div
                                    key={c}
                                    className={`
                                        h-6
                                        w-6
                                        rounded

                                        ${cell
                                            ? "bg-cyan-400"
                                            : "opacity-0"
                                        }
                                    `}
                                />

                            )
                        }

                    </div>

                )
            }

        </div>

    );

}