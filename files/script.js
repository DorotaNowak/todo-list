const Title = ({todoCount}) => {
    return (
        <div>
            <div>
                <h1>To do ({todoCount})</h1>
            </div>
        </div>
    );
}


/*
Not important tasks have id greater or equal 0. Important tasks have id = -1.
We sort the array and display the most important tasks with id -1 first.
 */

const TodoForm = ({addTodo}) => {
    let input;
    return (
        <form id="myform">
            <input className="form-control col-md-12" ref={node => {
                input = node;
            }}/>
            <button type="submit" className="btn btn-primary" id="not_important" onClick={(e) => {
                e.preventDefault();
                addTodo(input.value, window.id++);
                input.value = '';
            }}> Not important
            </button>
            <button type="submit" className="btn btn-danger" id="btn_important" onClick={(e) => {
                e.preventDefault();
                addTodo(input.value, -1);
                input.value = '';
            }}> Important
            </button>
        </form>

    );
};

const Todo = ({todo, remove}) => {
    // Each Todo
    return (<a href="#" className="list-group-item" onClick={() => {
        remove(todo.id)
    }}>{todo.text}</a>); //wyswietla nazwe i id
}

const TodoList = ({todos, remove}) => {
    // Map through the todos
    // Tworzy tablicę koponentów Todo
    todos.sort(function (a, b) {
        return (a.id - b.id);
    })
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove}/>)
    });

    return (<div className="list-group" style={{marginTop: '30px'}}>{todoNode}</div>);
}


window.id = 0;

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            data: [],
            done: [{id: 100, text: 'Shopping'}, {id: 101, text: 'Cook dinner'}]
        }
    }

    // Lifecycle method
    componentDidMount() {
        this.setState({data: this.state.data});
    }

    addTodo = (val, id) => {
        // Assemble data
        const todo = {text: val, id: id};
        // Update data
        this.setState({data: this.state.data.concat([todo])});
        // inny sposób: spread operator
        // this.setState({data: [...this.state.data, todo]});
    }

    handleDone(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) return todo;
        });

        const todoDone = this.state.data.filter((todo) => {
            if (todo.id === id) return todo;
        });

        this.setState({data: remainder, done: [...this.state.done, ...todoDone]});
    }

    handleRemove(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.done.filter((todo) => {
            if (todo.id !== id) return todo;
        });

        this.setState({done: remainder});
    }

    render() {
        // Render JSX
        return (
            <div>
                <Title todoCount={this.state.data.length}/>
                <TodoForm addTodo={this.addTodo}/>
                <TodoList
                    todos={this.state.data}
                    remove={this.handleDone.bind(this)}
                />
                <h1> Done </h1>
                <TodoList
                    todos={this.state.done}
                    remove={this.handleRemove.bind(this)}
                />
            </div>
        );
    }
}

ReactDOM.render(<TodoApp/>, document.getElementById('root'));