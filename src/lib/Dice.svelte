<script lang="ts">
    import DiceStore from '../stores/DiceStore.js';
    
    /**
     * 現在の出目で出目ストアを更新する。
     */
    function updateDiceStore() {
        const dices = getDices();
        $DiceStore = dices;
    }

    /**
     * 現在の出目を取得する。
     *
     * @returns 出目の集まり
     */
    const getDices = () => {
        let dices: number[] = [];
        const diceNodeList: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.dice');
        diceNodeList.forEach(dice => {
            dices.push(Number(dice.value));
        })
        return dices;
    }
</script>

{#each Array(5) as _, diceIndex (diceIndex)}
    <select id="dice-{diceIndex + 1}" class="dice" on:change="{updateDiceStore}">
        {#each Array(6) as _, rollIndex (rollIndex)}
            <option value="{rollIndex + 1}">{rollIndex + 1}</option>
        {/each}
    </select>
{/each}