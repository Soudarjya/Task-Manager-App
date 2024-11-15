import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { style } from "framer-motion/client";
function App() {
  const [tasks, settasks] = useState([]);
  const [Title, setTitle] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const priorities = ["high", "low", "medium"];


  //Receive the tasks you stored from local storage
  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("tasks"));
    {
      settasks(arr);
    }
  }, []);


  //Function to add a Task
  const handleAddTask = (e) => {
    e.preventDefault();
    //Check that task title is not empty
    if (!Title) {
      alert("Enter a Text");
      return;
    }
    const task = {
      id: Date.now(),
      text: Title,
      iscompleted: false,
      priority: "low",
    };
    settasks((tasks) => {
      const arr = [...tasks, task];
      localStorage.setItem("tasks", JSON.stringify(arr));
      return arr;
    });
    setTitle("");
  };

//Search a task on the searchbar
  const searchTask = async (term) => {
    console.log(term);
    if (term.trim() === "") {
      const arr = JSON.parse(localStorage.getItem("tasks"));
      settasks(arr);
      return;
    }
    const filteredTask = tasks.filter((task) =>
      task.text.toLowerCase().includes(term.toLowerCase())
    );
    settasks(filteredTask);
  };

  //Set a  task as completed or not
  const changeCompletionStatus = (id) => {
    const filteredTask = tasks.map((task) =>
      task.id === id ? { ...task, iscompleted: !task.iscompleted } : task
    );
    localStorage.setItem("tasks", JSON.stringify(filteredTask));
    settasks(filteredTask);
  };

  //Delete a Task
  const deleteTask = (id) => {
    const arr = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(arr));
    settasks(arr);
  };

  //Change the priority of a task
  const handlePriorityChange = (id, value) => {
    console.log(id);
    console.log(value);

    const arr = tasks.map((task) =>
      task.id === id ? { ...task, priority: value } : task
    );
    localStorage.setItem("tasks", JSON.stringify(arr));
    settasks(arr);
  };

  //Sort High priority tasks
  const HandleHigh = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const filteredTask = tasks.filter((task) => task.priority == "high");
    settasks(filteredTask);
  };

  //Sort Low priority tasks
  const HandleLow = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const filteredTask = tasks.filter((task) => task.priority == "low");
    settasks(filteredTask);
  };

  //Sort Medium priority tasks
  const HandleMedium = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const filteredTask = tasks.filter((task) => task.priority == "medium");
    settasks(filteredTask);
  };

  
  return (
    <div className="task-manager">
      <h1 className="heading">Task Manager</h1>
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search a Task"
          onChange={(e) => searchTask(e.target.value)}
        ></input>
        <motion.button
          whileTap={{ scale: 0.8 }}
          style={{ background: "none", border: "none" }}
        >
          <button onClick={HandleHigh} className="filter-button">
            High Priority Tasks
          </button>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          style={{ background: "none", border: "none" }}
        >
          <button onClick={HandleMedium} className="filter-button">
            Medium Priority Tasks
          </button>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          style={{ background: "none", border: "none" }}
        >
          <button onClick={HandleLow} className="filter-button">
            Low Priority Tasks
          </button>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          style={{ background: "none", border: "none" }}
        >
          <button
            className="filter-button"
            onClick={() => {
              settasks(JSON.parse(localStorage.getItem("tasks")));
            }}
          >
            No filter
          </button>
        </motion.button>
      </div>
      <div className="task-list">
        <AnimatePresence>
          {tasks.length !== 0 ? (
            tasks.map((i) => {
              return (
                <motion.li
                  style={{ listStyle: "none" }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="task-item">
                    <span
                      className="task-text"
                      style={{
                        textDecoration: i.iscompleted ? "line-through" : "none",
                      }}
                    >
                      {i.text}
                    </span>
                    <select
                      className="task-dropdown"
                      value={i.priority}
                      onChange={(e) =>
                        handlePriorityChange(i.id, e.target.value)
                      }
                    >
                      {priorities.map((levels) => {
                        return (
                          <option key={levels} value={levels}>
                            {levels}
                          </option>
                        );
                      })}
                    </select>
                    <label className="task-checkbox">
                      <input
                        className="checkbox"
                        defaultChecked={i.iscompleted ? true : false}
                        type="checkbox"
                        onClick={() => changeCompletionStatus(i.id)}
                      />
                      completed
                    </label>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      style={{ background: "none", border: "none" }}
                    >
                      <button
                        className="task-delete-button"
                        onClick={() => deleteTask(i.id)}
                      >
                        Delete
                      </button>
                    </motion.button>
                  </div>
                </motion.li>
              );
            })
          ) : (
            <h1>No Tasks</h1>
          )}
        </AnimatePresence>
      </div>
      <form className="add-task-container" onSubmit={handleAddTask}>
        <input
          placeholder="Enter a Task"
          className="add-task-input"
          type="text"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button className="add-task-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default App;
