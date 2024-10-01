import { useState } from "hono/jsx";
import { css } from "hono/css";

const base = css`
cursor: pointer;
border-bottom: 1px solid gray;
`;

const hidden = css`
${base}
color: transparent;
`;
const visible = css`
${base}
opacity: 1;
`;

export default function Uncover(props: { children: any } = { children: undefined }) {
	const [cover, setCover] = useState(true);
	const toggleCover = () => setCover(!cover);
	return (
		<span onClick={() => toggleCover()} class={cover ? hidden : visible}>
			{props.children}
		</span>
	);
}
