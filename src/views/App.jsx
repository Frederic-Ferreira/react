import { useRef, useState } from 'react';
import { TodoItem } from '../components/TodoItem';

import '../App.css';

const STATE = {
	TODO: 'todo',
	DONE: 'done',
};

function App() {
	const [form, setForm] = useState({
		todo: '',
	});
	const input = useRef()

	const [todos, setTodos] = useState([]);

	function handleClickColor(){
		console.log('button clicked')
		input.current.style.background = 'black'
	}

	function handleSubmit(event) {
		event.preventDefault();

		setTodos([
			...todos,
			{
				name: form.todo,
				state: STATE.TODO,
			},
		]);

		setForm({
			...form,
			todo: '',
		});
	}

	function handleChange(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	function handleClick(item) {
		const newTodos = todos.map(function (elem) {
			if (elem.name !== item.name) return elem;

			return {
				...elem,
				state: item.state === STATE.DONE ? STATE.TODO : STATE.DONE,
			};
		});

		setTodos(newTodos);
	}

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<input type="text" name="todo" onChange={handleChange} ref={input} value={form.todo} />
				<button onClick={handleClickColor}>Change color</button>
				<button type="submit">Ajouter</button>
			</form>
			<h2>TODOS</h2>
			<ul>
				{todos
					.filter(function (item) {
						return item.state === STATE.TODO;
					})
					.map(function (item) {
						return <TodoItem key={item.name} item={item} handleClick={handleClick} />;
					})}
			</ul>

			<h2>DONE</h2>
			<ul>
				{todos
					.filter(function (item) {
						return item.state === STATE.DONE;
					})
					.map(function (item) {
						return <TodoItem key={item.name} item={item} handleClick={handleClick} />;
					})}
			</ul>
		</div>
	);
}

export default App;
