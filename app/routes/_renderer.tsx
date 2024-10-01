import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

export default jsxRenderer(({ children, title }) => {
	return (
		<html lang="ja">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title}</title>
				<meta
					name="description"
					content="Quiz App that tries to predict physical measurements based on the number of fetal weeks. In addition to height and weight, you can also memorize data such as uterine fundal length."
				/>
				<link rel="icon" href="/favicon.png" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
				/>
				<Script src="/app/client.ts" async />
				<Style />
			</head>
			<body>{children}</body>
		</html>
	);
});
