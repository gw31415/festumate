import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { hc } from "hono/client";
import type { AppType, Fetus } from "./festumate";
import Uncover from "../islands/uncover";
import ReloadButton from "../islands/reloadButton";

const className = css`
  font-family: sans-serif;
`;

export default createRoute(async (c) => {
	const weeks = Math.floor(Math.random() * (44 - 5) + 5);
	const client = hc<AppType>(
		new URL("/festumate", new URL(c.req.url).origin).toString(),
	);
	const res = await client[":weeks"].$get({
		param: { weeks: weeks.toString() },
	});
	if (!res.ok) {
		console.error(await res.text());
		return c.render(
			<div class={className}>
				<h1>Internal server error</h1>
			</div>,
			{ title: "Festumate" },
		);
	}

	const fetus: Fetus = await res.json();

	return c.render(
		<div class={className}>
			<h1>妊娠{weeks}週のデータ</h1>
			<table>
				<tr>
					<td>身長</td>
					<td>
						<Uncover>{fetus.length}</Uncover> cm
					</td>
				</tr>
				<tr>
					<td>体重</td>
					<td>
						<Uncover>{fetus.weight}</Uncover> g
					</td>
				</tr>
				<tr>
					<td>子宮底長</td>
					<td>
						<Uncover>{fetus.fundus_uteri}</Uncover> cm
					</td>
				</tr>
				{fetus.gs !== null && (
					<tr>
						<td>胎嚢径</td>
						<td>
							<Uncover>{fetus.gs}</Uncover> cm
						</td>
					</tr>
				)}
				{fetus.crl !== null && (
					<tr>
						<td>頭臀長</td>
						<td>
							<Uncover>{fetus.crl}</Uncover> cm
						</td>
					</tr>
				)}
				{fetus.bpd !== null && (
					<tr>
						<td>児頭大横径</td>
						<td>
							<Uncover>{fetus.bpd}</Uncover> cm
						</td>
					</tr>
				)}
			</table>
			<div style="display: flex; justify-content: center;">
				<ReloadButton>再読み込み</ReloadButton>
			</div>
		</div>,
		{ title: "Festumate - 胎児データを予測しよう" },
	);
});
