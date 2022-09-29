import { Trash } from "phosphor-react";
import { Task } from "../../App";

import styles from "./styles.module.scss";

interface TodoItemProps {
  todo: Task;
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
}

export const TodoItem = ({
  todo,
  onDeleteTask,
  onToggleTask,
}: TodoItemProps) => {
  return (
    <label className={styles.todoItem}>
      <input readOnly type="checkbox" onChange={(e) => onToggleTask(todo.id)} />
      <span>{todo.content}</span>
      <Trash
        size={20}
        className={styles.trashIcon}
        onClick={() => onDeleteTask(todo.id)}
      />
    </label>
  );
};
