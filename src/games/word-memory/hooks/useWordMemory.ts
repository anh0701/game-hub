import { useCallback, useEffect, useRef, useState } from "react";

import type { VocabularyWord, WordCard } from "../models/WordCard";

import { WordMemoryGameController } from "../controllers/WordMemoryGameController";
import type { WordMemoryGamePhase } from "../models/WordMemoryGameState";

interface UseWordMemoryOptions {
    vocabulary: VocabularyWord[];

    memorizeTime: number;

    onComplete?: () => void;
}

export function useWordMemory(options: UseWordMemoryOptions) {
    const { vocabulary, memorizeTime, onComplete } = options;

    const controllerRef = useRef<WordMemoryGameController | null>(null);

    const checkingRef = useRef(false);

    const [cards, setCards] = useState<WordCard[]>([]);

    const [phase, setPhase] = useState<WordMemoryGamePhase>("memorizing");

    const [memorizeTimeRemaining, setMemorizeTimeRemaining] = useState(memorizeTime);

    const [matchedPairs, setMatchedPairs] = useState(0);

    const [isChecking, setIsChecking] = useState(false);

    const totalPairs = vocabulary.length;

    const [moves, setMoves] = useState(0);

    const [wrongMatches, setWrongMatches] = useState(0);

    const [currentCombo, setCurrentCombo] = useState(0);

    const [bestCombo, setBestCombo] = useState(0);

    const [score, setScore] = useState(0);

   
    const syncState = useCallback(() => {
        const controller = controllerRef.current;

        if (!controller) {
            return;
        }

        const state = controller.getState();

        setCards(state.cards);

        setPhase(state.phase);

        setMatchedPairs(state.matchedPairs);

        setMoves(state.moves);

        setWrongMatches(state.wrongMatches);

        setCurrentCombo(state.currentCombo);

        setBestCombo(state.bestCombo);

        setScore(state.score);
    }, []);

    
    const createGame = useCallback(() => {
        checkingRef.current = false;

        setIsChecking(false);

        const controller = new WordMemoryGameController(vocabulary);

        controllerRef.current = controller;

        setMemorizeTimeRemaining(memorizeTime);

        syncState();
    }, [vocabulary, memorizeTime, syncState]);

    
    useEffect(() => {
        createGame();
    }, [createGame]);

    
    useEffect(() => {
        if (phase !== "memorizing") {
            return;
        }

        if (memorizeTimeRemaining <= 0) {
            const controller = controllerRef.current;

            if (!controller) {
                return;
            }

            controller.startPlaying();

            syncState();

            return;
        }

        const timer = window.setTimeout(() => {
            setMemorizeTimeRemaining((previous) => previous - 1);
        }, 1000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [phase, memorizeTimeRemaining, syncState]);


    const handleCardClick = useCallback(
        async (cardId: string) => {
            const controller = controllerRef.current;

            if (!controller) {
                return;
            }

            if (checkingRef.current) {
                return;
            }

            const selected = controller.selectCard(cardId);

            if (!selected) {
                return;
            }

            syncState();

            const selectedCards = controller.getSelectedCards();

            /**
             * Only one card selected
             */
            if (selectedCards.length < 2) {
                return;
            }

            /**
             * Two cards selected
             */
            checkingRef.current = true;

            setIsChecking(true);

            await new Promise<void>((resolve) => {
                window.setTimeout(resolve, 800);
            });

            const result = controller.checkMatch();

            syncState();

            checkingRef.current = false;

            setIsChecking(false);

            /**
             * Game completed
             */
            if (controller.getPhase() === "completed") {
                onComplete?.();
            }
        },
        [onComplete, syncState]
    );


    const startPlaying = useCallback(() => {
        const controller = controllerRef.current;

        if (!controller) {
            return;
        }

        if (controller.getPhase() !== "memorizing") {
            return;
        }

        controller.startPlaying();

        syncState();
    }, [syncState]);

   
    const restart = useCallback(() => {
        createGame();
    }, [createGame]);

    return {
        cards,

        phase,

        memorizeTimeRemaining,

        matchedPairs,

        totalPairs,

        moves,

        wrongMatches,

        currentCombo,

        bestCombo,

        score,

        isChecking,

        handleCardClick,

        startPlaying,

        restart,
    };
}
