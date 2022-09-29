import { Task } from "../../App";
import { PlusCircle } from "phosphor-react";
import { FormEvent, useCallback, useState } from "react";

import logoImg from "../../assets/logo.svg";
import styles from "./styles.module.scss";

interface HeaderProps {
  onCreateTodo: (newTodo: Task) => void;
}

export const Header = ({ onCreateTodo }: HeaderProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      onCreateTodo({
        id: Math.floor(Math.random() * 1000),
        content: taskTitle,
        isComplete: false,
      });

      setTaskTitle("");
    },
    [taskTitle, onCreateTodo]
  );

  return (
    <div className={styles.container}>
      <img src={logoImg} alt="Logo do site" />

      <form className={styles.searchForm} onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={taskTitle}
          placeholder="Adicione uma nova tarefa"
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button type="submit" disabled={taskTitle === ""}>
          Criar
          <PlusCircle size={20} />
        </button>
      </form>
    </div>
  );
};
