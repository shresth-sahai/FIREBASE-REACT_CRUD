// App.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2 } from 'lucide-react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Simulated Firebase functionality since we can't include Firebase directly
  const simulatedDb = {
    tasks: [],
    async addTask(task) {
      const newTask = {
        id: Date.now(),
        text: task,
        timestamp: new Date().toISOString()
      };
      this.tasks.push(newTask);
      return newTask;
    },
    async getTasks() {
      return this.tasks;
    },
    async updateTask(id, newText) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].text = newText;
        return this.tasks[taskIndex];
      }
      return null;
    },
    async deleteTask(id) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        return true;
      }
      return false;
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await simulatedDb.getTasks();
    setTasks(fetchedTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    await simulatedDb.addTask(newTask);
    setNewTask('');
    fetchTasks();
  };

  const handleUpdate = async (id) => {
    if (!editingText.trim()) return;

    await simulatedDb.updateTask(id, editingText);
    setEditingId(null);
    setEditingText('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await simulatedDb.deleteTask(id);
    fetchTasks();
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Task Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="flex-1"
            />
            <Button type="submit">Add Task</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id}>
            <CardContent className="flex items-center justify-between p-4">
              {editingId === task.id ? (
                <div className="flex gap-2 flex-1">
                  <Input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleUpdate(task.id)}>Save</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <span className="flex-1">{task.text}</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => startEditing(task)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;
