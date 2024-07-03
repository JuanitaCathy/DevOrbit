"use client";

import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, ListTodo } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskList: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks-${roomId}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [roomId]);

  useEffect(() => {
    localStorage.setItem(`tasks-${roomId}`, JSON.stringify(tasks));
  }, [tasks, roomId]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="tasks-container">
      <div className="task-input flex items-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="input-task"
          placeholder="Add a new task..."
        />
        <button onClick={addTask} className="add-task-btn">
          <PlusCircle />
        </button>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item flex items-center justify-between">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-task-btn">
              &#10005;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
