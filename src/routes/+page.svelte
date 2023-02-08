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

	function resetAllTempHands() {
		Object.keys($TempHandsStore).forEach(tempHand => {
			$TempHandsStore[tempHand].points = 0;
		});
	}

	function detectHands(dices, tempHandsStore) {
		const sortedAllDices = Array.from(dices).sort((a, b) => {
			return a - b;
		});
		const dicesSet = new Set(Array.from(sortedAllDices).map((dice) => dice));

		const diceFaceCountArray = [];
		dicesSet.forEach((dice) => {
			diceFaceCountArray[dice] = sortedAllDices.filter(
				sortedAllDice => sortedAllDice === dice
			).length;
		});

		// nの目
		let sumOfAllDice = 0;
		Object.keys(DICE_FACES).forEach(face => {
			const sumOfDiceFace = calculateSumOfDiceFace(dices, DICE_FACES[face]);
			tempHandsStore[face].points = sumOfDiceFace;
			sumOfAllDice += sumOfDiceFace;
		});

		// チャンス
		tempHandsStore['CHANCE'].points = sumOfAllDice;

		// ↑　これは毎回計算していい

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
		if (!tempHandsStore['SMALL_STRAIGHT'].points) {
			SMALL_STRAIGHT_PATTERNS.some((SMALL_STRAIGHT_PATTERN) => {
				if (Array.from(dicesSet).join('').includes(SMALL_STRAIGHT_PATTERN.join(''))) {
					tempHandsStore['SMALL_STRAIGHT'].points = 30;
					return true;
				}
				return false;
			});
		}
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
		resetAllTempHands()
		detectHands($DiceStore, $TempHandsStore)
	}

</script>

<div class="container-fluid">
	<div class="row player-name-wrapper mt-4">
		<h3>hoge さんの番です。サイコロを振り直し、結果を入力してください。</h3>
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
					<th scope="col">hoge</th>
					<!-- @TODO 名前の指定 -->
					<!-- @TODO 名前の追加 -->
				</tr>
				<tr class="point-row">
					<th scope="row" class="text-bg-secondary">
						<span class="point-title">1の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						{ $HandsStore.ONE.is_recorded ? $HandsStore.ONE.recorded_points : $TempHandsStore.ONE.points }
					</td>
					<!-- @TODO プレイヤー数に応じたカラム数の増減 -->
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">2の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						{ $HandsStore.TWO.is_recorded ? $HandsStore.TWO.recorded_points : $TempHandsStore.TWO.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">3の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						{ $HandsStore.THREE.is_recorded ? $HandsStore.THREE.recorded_points : $TempHandsStore.THREE.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">4の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						{ $HandsStore.FOUR.is_recorded ? $HandsStore.FOUR.recorded_points : $TempHandsStore.FOUR.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">5の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						{ $HandsStore.FIVE.is_recorded ? $HandsStore.FIVE.recorded_points : $TempHandsStore.FIVE.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">6の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						{ $HandsStore.SIX.is_recorded ? $HandsStore.SIX.recorded_points : $TempHandsStore.SIX.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">ボーナス</span>
						<br />
						<span class="point-description">1~6の目の合計が63点以上の場合+35点</span>
					</th>
					<td>
						{ $HandsStore.BONUS.is_recorded ? $HandsStore.BONUS.recorded_points : $TempHandsStore.BONUS.points }
					</td>
				</tr>
				<tr class="empty-row" />
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">3カード</span>
						<br />
						<span class="point-description">出目の合計</span>
					</th>
					<td>
						{ $HandsStore.THREE_CARD.is_recorded ? $HandsStore.THREE_CARD.recorded_points : $TempHandsStore.THREE_CARD.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">4カード</span>
						<br />
						<span class="point-description">出目の合計</span>
					</th>
					<td>
						{ $HandsStore.FOUR_CARD.is_recorded ? $HandsStore.FOUR_CARD.recorded_points : $TempHandsStore.FOUR_CARD.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">フルハウス</span>
						<br />
						<span class="point-description">25点</span>
					</th>
					<td>
						{ $HandsStore.FULL_HOUSE.is_recorded ? $HandsStore.FULL_HOUSE.recorded_points : $TempHandsStore.FULL_HOUSE.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">小さいストレート</span>
						<br />
						<span class="point-description">30点</span>
					</th>
					<td>
						{ $HandsStore.SMALL_STRAIGHT.is_recorded ? $HandsStore.SMALL_STRAIGHT.recorded_points : $TempHandsStore.SMALL_STRAIGHT.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">大きいストレート</span>
						<br />
						<span class="point-description">40点</span>
					</th>
					<td>
						{ $HandsStore.BIG_STRAIGHT.is_recorded ? $HandsStore.BIG_STRAIGHT.recorded_points : $TempHandsStore.BIG_STRAIGHT.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">ヤッツィー</span>
						<br />
						<span class="point-description">50点</span>
					</th>
					<td>
						{ $HandsStore.YAHTZEE.is_recorded ? $HandsStore.YAHTZEE.recorded_points : $TempHandsStore.YAHTZEE.points }
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">チャンス</span>
						<br />
						<span class="point-description">ダイスの目の合計</span>
					</th>
					<td>
						{ $HandsStore.CHANCE.is_recorded ? $HandsStore.CHANCE.recorded_points : $TempHandsStore.CHANCE.points }
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
