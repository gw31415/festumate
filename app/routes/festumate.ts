import { Hono } from "hono";

/** 胎児データ */
export interface Fetus {
	/** 週数 (週) */
	weeks: number;
	/** 身長 (cm) */
	length: number;
	/** 体重 (g) */
	weight: number;
	/** 子宮底長 (cm) */
	fundus_uteri: number;
	/** 胎嚢径 (cm) */
	gs: number | null;
	/** 頭臀長 (cm) */
	crl: number | null;
	/**児頭大横径 (cm) */
	bpd: number | null;
}

/**
 * 胎児データを計算する
 * @param weeks 週数
 * @returns 胎児データ
 */
function festumate(weeks: number): Fetus {
	if (weeks < 5 || weeks > 44) {
		throw new Error("週数が範囲外です");
	}
	const months = Math.floor(weeks / 4) + 1;
	const length = months <= 5 ? months * months : months * 5;
	const mmm = months * months * months;
	const weight = months <= 5 ? mmm * 2 : mmm * 3;
	const fundus_uteri = months <= 5 ? months * 3 : months * 3 + 3;
	let gs: number | null = null;
	let crl: number | null = null;
	let bpd: number | null = null;
	if (weeks < 5) {
	} else if (weeks < 8) {
		gs = weeks - 4;
	} else if (weeks < 12) {
		crl = weeks - 7;
	} else {
		bpd = weeks / 4;
	}
	return { weeks, weight, length, fundus_uteri, gs, crl, bpd };
}

const app = new Hono();

const routes = app.get("/:weeks", async (c) => {
	const weeks = Number.parseInt(c.req.param("weeks"));
	if (!Number.isInteger(weeks)) {
		return c.json({ error: "週数が不正です" }, 400);
	}
	if (weeks < 5 || weeks > 44) {
		return c.json(
			{ error: "週数が範囲外です. 5週から44週までの間で指定してください" },
			400,
		);
	}
	return c.json(festumate(weeks));
});

export type AppType = typeof routes;

export default app;
