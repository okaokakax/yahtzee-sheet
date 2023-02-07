<script lang="ts">
	import Dice from "../lib/Dice.svelte";
	import DiceStore from "../stores/DiceStore.js"

	// とりあえずサブスクライブしてるだけ。このストアを使い、役を判定するのはまた今度
	$: console.log($DiceStore);
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
						<!-- @TODO 得点の計算 -->
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
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">3の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">4の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">5の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">6の目</span>
						<br />
						<span class="point-description">該当する目の合計</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">ボーナス</span>
						<br />
						<span class="point-description">1~6の目の合計が63点以上の場合+35点</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
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
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">4カード</span>
						<br />
						<span class="point-description">出目の合計</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">フルハウス</span>
						<br />
						<span class="point-description">25点</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">小さいストレート</span>
						<br />
						<span class="point-description">30点</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">大きいストレート</span>
						<br />
						<span class="point-description">40点</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">ヤッツィー</span>
						<br />
						<span class="point-description">50点</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
				<tr class="point-row">
					<th scope="row">
						<span class="point-title">チャンス</span>
						<br />
						<span class="point-description">ダイスの目の合計</span>
					</th>
					<td>
						<!-- @TODO 得点の計算 -->
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
