export function TodoItem({ item, handleClick }) {
	return (
		<li>
			<span>{item.name}</span>
			<button type="button" onClick={() => handleClick(item)}>
				TODO
			</button>
		</li>
	);
}
