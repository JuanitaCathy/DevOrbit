'use client';
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardList, ListTodo } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskList: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isTaskListVisible, setIsTaskListVisible] = useState(false);

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
    if (tasks.length >= 5) {
      alert('You can only have up to 5 tasks at the moment.');
      return;
    }
    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-list-container">
      <button
        onClick={() => setIsTaskListVisible(!isTaskListVisible)}
        className="task-icon-btn flex items-center p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full shadow-lg"
      >
        <ClipboardList size={28} />
      </button>

      {isTaskListVisible && (
        <div className="task-list mt-4">
          <div className="task-input flex items-center mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="input-task bg-gray-600 border border-gray-300 px-3 py-2 rounded-lg mr-2 focus:outline-none focus:border-blue-500 flex-1 text-gray-200"
            />
            <button
              onClick={addTask}
              className="add-task-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              <ListTodo size={24} />
            </button>
          </div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item flex items-center py-2 px-4 mb-2 rounded-lg ${task.completed ? 'bg-gray-600' : 'bg-gray-400'}`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mr-4"
              />
              <span
                className={`task-text flex-1 ${task.completed ? 'line-through text-white' : 'text-black'}`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-task-btn ml-4 text-red-600 hover:text-red-700 focus:outline-none"
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
