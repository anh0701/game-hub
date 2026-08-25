import { characters } from "../data/characters";

export function getCharacter(characterId: string) {
    return characters.find((character) => character.id === characterId);
}
