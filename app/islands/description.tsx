import { css } from "hono/css";
import { useRef } from "hono/jsx";

export default function Description() {
	const dialog = useRef<HTMLDialogElement>(null);

	return (
		<>
			<a href="javascript:void(0)" onClick={() => dialog.current?.showModal()}>
				ヒント
			</a>
			<dialog
				ref={dialog}
				class={css`
				width: 80%;
				height: 80%;
			`}
				onClick={() => {
					dialog.current?.close();
				}}
			>
				<header>公式集</header>
				<main>
					<h2>基本データ</h2>
					<table>
						<thead>
							<tr>
								<th>測定値</th>
								<th>～5ヶ月</th>
								<th>6ヶ月～</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>身長 (cm)</th>
								<td>
									(月数)<sup>2</sup>
								</td>
								<td>5 × (月数)</td>
							</tr>
							<tr>
								<th>体重 (g)</th>
								<td>
									2 × (月数)<sup>3</sup>
								</td>
								<td>
									3 × (月数)<sup>3</sup>
								</td>
							</tr>
							<tr>
								<th>子宮底長 (cm)</th>
								<td>3 × (月数)</td>
								<td>3 × (月数) + 3</td>
							</tr>
						</tbody>
					</table>
					<h2>胎児の成長</h2>
					<table>
						<thead>
							<tr>
								<th>期間</th>
								<th>部位</th>
								<th>公式 (cm)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>5週～7週</td>
								<th>胎嚢</th>
								<td>週数 - 4</td>
							</tr>
							<tr>
								<td>8週～11週</td>
								<th>頭臀長</th>
								<td>週数 - 7</td>
							</tr>
							<tr>
								<td>12週～16週</td>
								<th>児頭大横径</th>
								<td>週数 ÷ 4</td>
							</tr>
						</tbody>
					</table>
				</main>
			</dialog>
		</>
	);
}
