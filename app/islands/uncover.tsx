import { type PropsWithChildren, useState } from "hono/jsx";
import { css } from "hono/css";

const base = css`
cursor: pointer;
border-bottom: 1px solid gray;
display: inline-block;
`;

const hidden = css`
${base}
color: transparent;
`;
const visible = css`
${base}
opacity: 1;
`;

interface Props {
	width?: string;
	right?: boolean;
}

export default function Uncover(props: PropsWithChildren<Props>) {
	const [cover, setCover] = useState(true);
	const toggleCover = () => setCover(!cover);
	return (
		<span
			onClick={() => toggleCover()}
			class={cover ? hidden : visible}
			style={{ width: props.width, textAlign: props.right ? "right" : "left" }}
		>
			{props.children}
		</span>
	);
}
