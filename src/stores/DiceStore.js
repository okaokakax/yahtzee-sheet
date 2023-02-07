import { writable } from 'svelte/store';

const dices = writable([
    1,
    1,
    1,
    1,
    1,
]);

export default dices;