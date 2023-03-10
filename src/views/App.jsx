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
	const [currentDeleteItem, setCurrentDeleteItem] = useState(null)

	const input = useRef()
	const modal = useRef()

	const [todos, setTodos] = useState([]);

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

	function handleToggleState(item) {
		const newTodos = todos.map(function (elem) {
			if (elem.name !== item.name) return elem;

			return {
				...elem,
				state: item.state === STATE.DONE ? STATE.TODO : STATE.DONE,
			};
		});

		setTodos(newTodos);
	}

	function handleToggleModal(item){
		setCurrentDeleteItem(item)
		modal.current.classList.toggle("hidden");
	}


	function handleDelete() {
		const newTodos = todos.filter(function (elem) {
			if (elem.name !== currentDeleteItem.name) return elem;
		});
		setTodos(newTodos);
		handleToggleModal(currentDeleteItem)
	}

	return (
		<div className="App">
			<div ref={modal} className="modal hidden">
				<div className='confirm-delete'>
					<h1>Do you want to delete this todo ?</h1>
					<button onClick={() => handleDelete()} type='button'>YES</button>
					<button onClick={() => handleToggleModal()} type='button'>NO</button>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<input type="text" name="todo" onChange={handleChange} ref={input} value={form.todo} />
				<button type="submit">Ajouter</button>
			</form>
			<h2>TODOS</h2>
			<ul>
				{todos
					.filter(function (item) {
						return item.state === STATE.TODO;
					})
					.map(function (item) {
						return <TodoItem key={item.name} item={item} handleDelete={() => handleToggleModal(item)} handleToggleState={handleToggleState} />;
					})}
			</ul>

			<h2>DONE</h2>
			<ul>
				{todos
					.filter(function (item) {
						return item.state === STATE.DONE;
					})
					.map(function (item) {
						return <TodoItem key={item.name} item={item} handleDelete={() => handleToggleModal(item)} handleToggleState={handleToggleState} />;
					})}
			</ul>
		</div>
	);
}

export default App;
