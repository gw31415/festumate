import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { hc } from "hono/client";
import type { AppType, Fetus } from "./api";
import Uncover from "../islands/uncover";
import ReloadButton from "../islands/reloadButton";
import Description from "../islands/description";

const className = css`
  font-family: sans-serif;
`;

export default createRoute(async (c) => {
	const origin = new URL(c.req.url).origin;
	const weeksParam = c.req.query("weeks");
	let weeks: number;
	if (weeksParam) {
		weeks = Number.parseInt(c.req.query("weeks") ?? "NaN");
		if (!Number.isInteger(weeks) || weeks < 5 || weeks > 44) {
			return c.redirect(origin);
		}
	} else {
		weeks = Math.floor(Math.random() * (44 - 5) + 5);
	}
	const client = hc<AppType>(new URL("/api", origin).toString());
	const res = await client.festumate[":weeks"].$get({
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
	const estRow = {
		name: "",
		value: 0,
	};
	if (fetus.gs !== null) {
		estRow.name = "胎嚢";
		estRow.value = fetus.gs;
	} else if (fetus.crl !== null) {
		estRow.name = "頭臀長";
		estRow.value = fetus.crl;
	} else if (fetus.bpd !== null) {
		estRow.name = "児頭大横径";
		estRow.value = fetus.bpd;
	}

	return c.render(
		<div class={className}>
			<h1>妊娠{weeks}週のデータ</h1>
			<table>
				<tr>
					<td>身長</td>
					<td>
						<Uncover width="5ch" right>
							{fetus.length}
						</Uncover>{" "}
						cm
					</td>
				</tr>
				<tr>
					<td>体重</td>
					<td>
						<Uncover width="5ch" right>
							{fetus.weight}
						</Uncover>{" "}
						g
					</td>
				</tr>
				<tr>
					<td>子宮底長</td>
					<td>
						<Uncover width="5ch" right>
							{fetus.fundus_uteri}
						</Uncover>{" "}
						cm
					</td>
				</tr>
				<tr>
					<td>
						週数測定の部位: <Uncover width="5rem">{estRow.name}</Uncover>
					</td>
					<td>
						<Uncover width="5ch" right>
							{estRow.value}
						</Uncover>{" "}
						cm
					</td>
				</tr>
			</table>
			<Description />
			<div style="display: flex; justify-content: center;">
				<ReloadButton location={weeksParam ? origin : undefined}>
					ランダム週数
				</ReloadButton>
			</div>
		</div>,
		{ title: "Festumate - 胎内測定値を推定しよう" },
	);
});
