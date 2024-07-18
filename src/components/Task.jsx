import React from "react";
import { CgClose } from "react-icons/cg";
import { CgInfo } from "react-icons/cg";
import { VscCheckAll } from "react-icons/vsc";
import { useHistory } from "react-router-dom";

import "./Task.css";

const Task = ({ task, handleTaskClick, handleTaskRemove }) => {
  const history = useHistory();

  const handleTaskDetailsClick = () => {
    history.push(`/${task.title}`);
  };
  const handleMarkAsCompleted = () => {
    handleTaskClick(task.id);
  };

  return (
    <div
      className="task-contanier"
      style={
        task.completed
          ? { borderLeft: "5px solid chartreuse" }
          : { borderLeft: "5px  solid red" }
      }
    >
      <div className="task-title" onClick={() => handleTaskClick(task.id)}>
        {task.title}
      </div>
      <div className="buttons-containers">
        <button
          className="mark-task-completed-button"
          onClick={handleMarkAsCompleted}
        >
          <VscCheckAll />
        </button>
        <button
          className="remove-task-button"
          onClick={() => handleTaskRemove(task.id)}
        >
          <CgClose />
        </button>
        <button
          className="see-task-details-button"
          onClick={handleTaskDetailsClick}
        >
          <CgInfo />
        </button>
      </div>
    </div>
  );
};

export default Task;
