import { writable } from 'svelte/store';

const hands = writable({
    'ONE': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'TWO': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'THREE': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'FOUR': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'FIVE': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'SIX': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'BONUS': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'THREE_CARD': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'FOUR_CARD': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'FULL_HOUSE': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'SMALL_STRAIGHT': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'BIG_STRAIGHT': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'FOUR_CARD': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'YAHTZEE': {
        'recorded_points': 0,
        'is_recorded': false,
    },
    'CHANCE': {
        'recorded_points': 0,
        'is_recorded': false,
    },
});

export default hands;