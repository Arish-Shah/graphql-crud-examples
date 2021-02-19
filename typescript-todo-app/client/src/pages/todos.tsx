import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  useUserQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} from "../generated/graphql";

interface Props {
  setToken: (tokenString: string) => void;
}

function TodosPage({ setToken }: Props) {
  const { data } = useUserQuery();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current?.value) {
      addTodo({
        variables: {
          title: inputRef.current.value
        }
      });
    }
  };

  const handleTodoChange = (_id: string, done: boolean) => {
    updateTodo({
      variables: { _id, done }
    });
  };

  const handleDelete = (_id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo({
        variables: {
          _id
        }
      });
    }
  };

  const handleLogout = () => {
    setToken("");
  };

  return data ? (
    <Fragment>
      <div className="flex justify-between">
        <h2>Hi, {data?.user?.name}</h2>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </div>
      <main className="container">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter task" ref={inputRef} />
          <button>Add</button>
        </form>
        <ul className="todos">
          {data.user?.todos?.map(todo => (
            <li key={todo._id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={e => handleTodoChange(todo._id, e.target.checked)}
                />
                <span>{todo.done ? <del>{todo.title}</del> : todo.title}</span>
              </label>
              <span onClick={() => handleDelete(todo._id)}>&times;</span>
            </li>
          ))}
        </ul>
      </main>
    </Fragment>
  ) : null;
}

export default TodosPage;
