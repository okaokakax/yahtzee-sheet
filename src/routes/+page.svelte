<script>
	import Dice from "../lib/Dice.svelte";
	import DiceStore from "../stores/DiceStore.js"
	import HandsStore from "../stores/HandsStore.js"
	import TempHandsStore from "../stores/TempHandsStore.js"

	const DICE_FACES = {
		'ONE': 1,
		'TWO': 2,
		'THREE': 3,
		'FOUR': 4,
		'FIVE': 5,
		'SIX': 6
	};
	const BONUS_THRESHOLD = 63;
	const BIG_STRAIGHT_PATTERNS = [
		[1, 2, 3, 4, 5],
		[2, 3, 4, 5, 6],
	];
	const SMALL_STRAIGHT_PATTERNS = [
		[1, 2, 3, 4],
		[2, 3, 4, 5],
		[3, 4, 5, 6],
	];

	let sumOfPoints = 0;
	let toGetBonus = BONUS_THRESHOLD;

	function resetAllTempHands() {
		Object.keys($TempHandsStore).forEach(tempHand => {
			$TempHandsStore[tempHand].points = 0;
		});
	}

	function detectHands(dices, tempHandsStore) {
		// 後でストレート判定に使うのでソート
		const sortedAllDices = Array.from(dices).sort((a, b) => {
			return a - b;
		});
		// あとでヤッツィー判定に使うのでset作る
		const dicesSet = new Set(Array.from(sortedAllDices).map((dice) => dice));

		// どの出目が何個出たか
		const diceFaceCountArray = [];
		dicesSet.forEach((dice) => {
			diceFaceCountArray[dice] = sortedAllDices.filter(
				sortedAllDice => sortedAllDice === dice
			).length;
		});

		// nの目
		// チャンス用の合計もここで計算してしまう
		let sumOfAllDice = 0;
		Object.keys(DICE_FACES).forEach(face => {
			const sumOfDiceFace = calculateSumOfDiceFace(dices, DICE_FACES[face]);
			tempHandsStore[face].points = sumOfDiceFace;
			sumOfAllDice += sumOfDiceFace;
		});

		// チャンス
		tempHandsStore['CHANCE'].points = sumOfAllDice;

		// ヤッツィー
		if (dicesSet.size === 1) {
			tempHandsStore['THREE_CARD'].points = sumOfAllDice;
			tempHandsStore['FOUR_CARD'].points = sumOfAllDice;
			tempHandsStore['FULL_HOUSE'].points = 25;
			tempHandsStore['SMALL_STRAIGHT'].points = 30;
			tempHandsStore['BIG_STRAIGHT'].points = 40;
			tempHandsStore['YAHTZEE'].points = 50;
		}

		// 3カード
		if (!tempHandsStore['THREE_CARD'].points && calculateMax(diceFaceCountArray) >= 3) {
			tempHandsStore['THREE_CARD'].points = sumOfAllDice;
		}

		// 4カード
		if (!tempHandsStore['FOUR_CARD'].points && calculateMax(diceFaceCountArray) >= 4) {
			tempHandsStore['FOUR_CARD'].points = sumOfAllDice;
		}

		// フルハウス
		if (!tempHandsStore['FULL_HOUSE'].points) {
			// 出目が3・2だったらフルハウス
			if (calculateMin(diceFaceCountArray) === 2 && calculateMax(diceFaceCountArray) === 3) {
				tempHandsStore['FULL_HOUSE'].points = 25;
			}
		}

		// 大きいストレート
		if (!tempHandsStore['BIG_STRAIGHT'].points) {
			// 比較を最低1回に留めるために、forEachではなくsomeを使う。
			BIG_STRAIGHT_PATTERNS.some((BIG_STRAIGHT_PATTERN) => {
				if (JSON.stringify(BIG_STRAIGHT_PATTERN) === JSON.stringify(Array.from(dicesSet))) {
					tempHandsStore['SMALL_STRAIGHT'].points = 30;
					tempHandsStore['BIG_STRAIGHT'].points = 40;
					return true;
				}
				return false;
			});
		}

		// 小さいストレート
		if (!tempHandsStore['SMALL_STRAIGHT'].points) {
			SMALL_STRAIGHT_PATTERNS.some((SMALL_STRAIGHT_PATTERN) => {
				if (Array.from(dicesSet).join('').includes(SMALL_STRAIGHT_PATTERN.join(''))) {
					tempHandsStore['SMALL_STRAIGHT'].points = 30;
					return true;
				}
				return false;
			});
		}

		// ストアの更新
		$TempHandsStore = tempHandsStore;
	}

	/**
	 * すべてのサイコロの出目から、指定された目の合計を計算する
	 * @param dices すべてのサイコロ
	 * @param roll 指定された出目
	 * @returns 出目の合計
	 */
	const calculateSumOfDiceFace = (dices, roll) => {
		return roll * dices.filter((dice) => dice === roll).length;
	};

	/**
	 * Numberの集合の最大値を返却する
	 * @param numberArray 数値の集合
	 * @return 最大値
	 */
	const calculateMax = (numberArray) => {
		return numberArray.reduce((a, b) => Math.max(a, b));
	};

	/**
	 * Numberの集合の最小値を返却する
	 * @param numberArray 数値の集合
	 * @return 最小値
	 */
	const calculateMin = (numberArray) => {
		return numberArray.reduce((a, b) => Math.min(a, b));
	};

	$: {
		// 一時手役をリセットしてから手役の判定を行う
		resetAllTempHands();
		detectHands($DiceStore, $TempHandsStore);
	}

	$: {
		sumOfPoints = getSumOfPoints($HandsStore);
		toGetBonus = getPointsToGetBonus();
	}

	/**
	 * 得点の記録
	 *
	 * @param {string} handsKey 手役のキー
	 */
	const recordPoints = (handsKey) => {
		// 記録済みチェック
		if ($HandsStore[handsKey].is_recorded) {
			alert('この役は記録済みです。');
			return;
		}
		const willRecordPoints = $TempHandsStore[handsKey].points;
		$HandsStore[handsKey].recorded_points = willRecordPoints;
		$HandsStore[handsKey].is_recorded = true;
		// ボーナスチェック
		if (getOneToSixSum() >= BONUS_THRESHOLD) {
			$HandsStore['BONUS'].recorded_points = 35;
			$HandsStore['BONUS'].is_recorded = true;
		}
	}

	/**
	 * 1から6の目の合計を取得する
	 *
	 * @returns {number} 1から6の目の合計
	 */
	const getOneToSixSum = () => {
		let sum = 0;
		Object.keys(DICE_FACES).forEach(face => {
			sum += $HandsStore[face].recorded_points;
		});
		return sum;
	}

	/**
	 * ボーナスまでの点数を取得する
	 *
	 * @returns {number} ボーナスまでの点数
	 */
	const getPointsToGetBonus = () => {
		const oneToSixSum = getOneToSixSum();
		return BONUS_THRESHOLD - oneToSixSum;
	}

	/**
	 * すべての出目の合計を取得する
	 *
	 * @param {HandsStore} HandsStore 手役ストア
	 *
	 * @returns {number} 出目の合計
	 */
	const getSumOfPoints = (HandsStore) => {
		const sum = Object.keys(HandsStore).reduce((sum, hand) => sum + parseInt(HandsStore[hand].recorded_points || 0) , 0);
		return sum;
	}

</script>

<div class="container-fluid">
	<div class="row player-name-wrapper mt-4">
		<h3>サイコロを振り直し、結果を入力してください。</h3>
		<!-- @TODO 今回のフェーズでは名前入力に対応しないが、次回フェーズ以降対応する -->
	</div>
	<div class="row dice-wrapper">
		<div
			class="d-grid dice-container"
			style="grid-template-columns: repeat(5, 1fr); column-gap: 2rem;"
		>
			<Dice />
		</div>
	</div>
	<div class="row result-table mt-4">
		<table class="table table-bordered">
			<tbody>
				<tr>
					<th />
					<th class="text-center" scope="col">点数</th>
					<!-- @TODO 名前の指定 -->
					<!-- @TODO 名前の追加 -->
				</tr>
				<tr class="point-row">
					<th scope="row" class="text-bg-secondary">
						<span class="point-title">1の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.ONE.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('ONE')}">
							{ $HandsStore.ONE.is_recorded ? $HandsStore.ONE.recorded_points : $TempHandsStore.ONE.points }
						</a>
					</td>
					<!-- @TODO プレイヤー数に応じたカラム数の増減 -->
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">2の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.TWO.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('TWO')}">
							{ $HandsStore.TWO.is_recorded ? $HandsStore.TWO.recorded_points : $TempHandsStore.TWO.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">3の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.THREE.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('THREE')}">
							{ $HandsStore.THREE.is_recorded ? $HandsStore.THREE.recorded_points : $TempHandsStore.THREE.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">4の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.FOUR.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('FOUR')}">
							{ $HandsStore.FOUR.is_recorded ? $HandsStore.FOUR.recorded_points : $TempHandsStore.FOUR.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">5の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.FIVE.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('FIVE')}">
							{ $HandsStore.FIVE.is_recorded ? $HandsStore.FIVE.recorded_points : $TempHandsStore.FIVE.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">6の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.SIX.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('SIX')}">
							{ $HandsStore.SIX.is_recorded ? $HandsStore.SIX.recorded_points : $TempHandsStore.SIX.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">ボーナス</span>
						<br />
						<span class="point-description">1~6の目の合計が63点以上の場合+35点</span>
					</th>
					<td class="point-cell">
						{#if $HandsStore.BONUS.is_recorded}
							<a class="point-cell-event-handler 'recorded' point-cell-event-handler--not-clickable" href="#/">
								{ $HandsStore.BONUS.recorded_points }
							</a>
						{:else}
							<a class="point-cell-event-handler 'not-recorded point-cell-event-handler--not-clickable" href="#/">
								ボーナスまであと{ toGetBonus }点
							</a>
						{/if}
					</td>
				</tr>
				<tr class="empty-row" />
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">3カード</span>
						<br />
						<span class="point-description">出目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.THREE_CARD.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('THREE_CARD')}">
							{ $HandsStore.THREE_CARD.is_recorded ? $HandsStore.THREE_CARD.recorded_points : $TempHandsStore.THREE_CARD.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">4カード</span>
						<br />
						<span class="point-description">出目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.FOUR_CARD.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('FOUR_CARD')}">
							{ $HandsStore.FOUR_CARD.is_recorded ? $HandsStore.FOUR_CARD.recorded_points : $TempHandsStore.FOUR_CARD.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">フルハウス</span>
						<br />
						<span class="point-description">25点</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.FULL_HOUSE.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('FULL_HOUSE')}">
							{ $HandsStore.FULL_HOUSE.is_recorded ? $HandsStore.FULL_HOUSE.recorded_points : $TempHandsStore.FULL_HOUSE.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">小さいストレート</span>
						<br />
						<span class="point-description">30点</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.SMALL_STRAIGHT.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('SMALL_STRAIGHT')}">
							{ $HandsStore.SMALL_STRAIGHT.is_recorded ? $HandsStore.SMALL_STRAIGHT.recorded_points : $TempHandsStore.SMALL_STRAIGHT.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">大きいストレート</span>
						<br />
						<span class="point-description">40点</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.BIG_STRAIGHT.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('BIG_STRAIGHT')}">
							{ $HandsStore.BIG_STRAIGHT.is_recorded ? $HandsStore.BIG_STRAIGHT.recorded_points : $TempHandsStore.BIG_STRAIGHT.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">ヤッツィー</span>
						<br />
						<span class="point-description">50点</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.YAHTZEE.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('YAHTZEE')}">
							{ $HandsStore.YAHTZEE.is_recorded ? $HandsStore.YAHTZEE.recorded_points : $TempHandsStore.YAHTZEE.points }
						</a>
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">チャンス</span>
						<br />
						<span class="point-description">サイコロの目の合計</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler {$HandsStore.CHANCE.is_recorded ? 'recorded' : 'not-recorded'}" href="#/" on:click="{() => recordPoints('CHANCE')}">
							{ $HandsStore.CHANCE.is_recorded ? $HandsStore.CHANCE.recorded_points : $TempHandsStore.CHANCE.points }
						</a>
					</td>
				</tr>
				<tr class="point-row point-row--sum">
					<th scope="row">
						<span class="point-title">合計点</span>
					</th>
					<td class="point-cell">
						<a class="point-cell-event-handler point-cell-event-handler--not-clickable" href="#/">
							{ sumOfPoints }
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style lang="scss">
	.point-row {
		&--sum {
			border-top: 4px solid;
			border-color: inherit;
		}
	}
	.point-cell {
		padding: 0;
		height: 0;
	}

	.point-cell-event-handler {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		color: inherit;
		text-decoration: none;
		background-color: beige;
		font-weight: bold;
		&.not-recorded {
			background-color: lightgreen;
			font-weight: normal;
		}
		&--not-clickable {
			pointer-events: none;
		}
	}
</style>