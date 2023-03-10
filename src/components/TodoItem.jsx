export function TodoItem({ item, handleToggleState, handleDelete }) {
	return (
		<li>
			<span>{item.name}</span>
			<button type="button" onClick={() => handleToggleState(item)}>
				TODO
			</button>
			<button style={{background: 'red', color: 'white'}} type="button" onClick={() => handleDelete()}>DELETE</button>
		</li>
	);
}
