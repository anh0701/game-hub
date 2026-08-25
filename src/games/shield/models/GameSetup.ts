export type ShieldType = "hand" | "circle" | "star";

export type ShieldColor = "white" | "red" | "blue" | "green" | "yellow" | "purple" | "orange";

export type MapType = "bugs" | "rocks" | "meteors";

export interface GameSetup {
    shieldType: ShieldType;
    shieldColor: ShieldColor;
    mapType: MapType;
}
