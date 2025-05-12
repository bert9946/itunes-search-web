export default function KindLabel(kind: { kind?: string; wrapperType?: string }) {
	return (
		<span className="mt-auto inline-block bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs self-start">
			{kind.kind || kind.wrapperType}
		</span>
	);
}
