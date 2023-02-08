import { writable } from 'svelte/store';

const tempHands = writable({
    'ONE': {
        'points': 0,
    },
    'TWO': {
        'points': 0,
    },
    'THREE': {
        'points': 0,
    },
    'FOUR': {
        'points': 0,
    },
    'FIVE': {
        'points': 0,
    },
    'SIX': {
        'points': 0,
    },
    'BONUS': {
        'points': 0,
    },
    'THREE_CARD': {
        'points': 0,
    },
    'FOUR_CARD': {
        'points': 0,
    },
    'FULL_HOUSE': {
        'points': 0,
    },
    'SMALL_STRAIGHT': {
        'points': 0,
    },
    'BIG_STRAIGHT': {
        'points': 0,
    },
    'FOUR_CARD': {
        'points': 0,
    },
    'YAHTZEE': {
        'points': 0,
    },
    'CHANCE': {
        'points': 0,
    },
});

export default tempHands;
