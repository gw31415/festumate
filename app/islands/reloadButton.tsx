export default function ReloadButton(
	props: { children: any } = { children: undefined },
) {
	return (
		<button onClick={() => window.location.reload()}>{props.children}</button>
	);
}
