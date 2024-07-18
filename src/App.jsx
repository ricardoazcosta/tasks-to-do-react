import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import TaskDetails from "./components/TaskDetails";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [error, setError] = useState("");

  useEffect(() => {
    // Função para salvar as tarefas no localStorage
    const saveTasksToLocalStorage = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Chamada sempre que o estado das tarefas for atualizado
    saveTasksToLocalStorage();
  }, [tasks]);

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed };
      return task;
    });

    setTasks(newTasks);
  };

  const handleTaskAddition = (taskTitle) => {
    if (taskTitle.trim() === "") {
      setError("A tarefa não pode ser vazia!");
      return;
    }

    if (taskTitle.length <= 2) {
      setError("A tarefa deve ter mais de 2 caracteres!");
      return;
    }

    setError(""); // Limpa a mensagem de erro se a tarefa for válida

    const newTask = {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const handleTaskRemove = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };
  return (
    <Router>
      <div className="container">
        <Header />
        <Route
          path="/"
          exact
          render={() => {
            return (
              <>
                <AddTask handleTaskAddition={handleTaskAddition} />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskRemove={handleTaskRemove}
                />
              </>
            );
          }}
        />
        <Route path="/:taskTitle" exact component={TaskDetails} />
      </div>
    </Router>
  );
};

export default App;
