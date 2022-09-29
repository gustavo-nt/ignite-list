import { Notepad } from "phosphor-react";
import { useCallback, useMemo, useState } from "react";

import "./styles/global.scss";
import styles from "./styles/app.module.scss";

import { Header } from "./components/Header";
import { TodoItem } from "./components/TodoItem";

export interface Task {
  id: number;
  content: string;
  isComplete: boolean;
}

const App = () => {
  const [todoList, setTodoList] = useState<Task[]>([]);

  const todoListConcluedLength = useMemo(() => {
    return todoList.filter((todo) => todo.isComplete).length;
  }, [todoList]);

  const handleCreateNewTodo = useCallback(
    (newTodo: Task) => {
      const isAlreadyExists = todoList.find(
        (todo) => todo.content === newTodo.content
      );

      if (isAlreadyExists) {
        return alert("Tarefa já criada");
      }

      setTodoList([...todoList, newTodo]);
    },
    [todoList]
  );

  const handleRemoveTask = useCallback(
    (id: number) => {
      const todoListWithoutDeletedOne = todoList.filter(
        (todo) => todo.id !== id
      );

      setTodoList(todoListWithoutDeletedOne);
    },
    [todoList]
  );

  const handleToggleTaskCompletion = useCallback(
    (id: number) => {
      const todo = todoList.find((todo) => todo.id === id);

      if (!todo) {
        return;
      }

      const updateTodoList = todoList.map((item) => {
        if (item.id == todo.id) {
          return {
            ...item,
            isComplete: !item.isComplete,
          };
        }

        return item;
      });

      setTodoList(updateTodoList);
    },
    [todoList]
  );

  return (
    <>
      <Header onCreateTodo={handleCreateNewTodo} />

      <div className={styles.wrapper}>
        <div className={styles.todoListHeader}>
          <div>
            <p>Tarefas criadas</p>
            <span>{todoList.length}</span>
          </div>

          <div>
            <p>Concluídas</p>
            <span>
              {todoList.length === 0
                ? "0"
                : `${todoListConcluedLength} de ${todoList.length}`}
            </span>
          </div>
        </div>

        {todoList.length > 0 ? (
          <div className={styles.todoListContent}>
            {todoList.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onDeleteTask={handleRemoveTask}
                onToggleTask={handleToggleTaskCompletion}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyTodoList}>
            <Notepad size={56} />
            <b>Você ainda não tem tarefas cadastradas</b>
            <span>Crie tarefas e organize seus itens à fazer</span>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
