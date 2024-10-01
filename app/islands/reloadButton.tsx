import type { PropsWithChildren } from "hono/jsx";

interface Props {
	location?: string;
}

export default function ReloadButton(props: PropsWithChildren<Props>) {
	return (
		<button
			type="button"
			onClick={() => {
				if (props.location) {
					window.location.replace(props.location);
				} else {
					window.location.reload();
				}
			}}
		>
			{props.children}
		</button>
	);
}
