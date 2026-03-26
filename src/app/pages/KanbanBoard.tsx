import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ArrowLeft, Plus, MoreVertical, User } from 'lucide-react';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const ItemType = 'TASK';

function TaskCard({ task, columnId }: { task: Task; columnId: string; moveTask: (taskId: string, toColumn: string) => void }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task.id, fromColumn: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const priorityColors = {
    low: 'bg-gray-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  };

  return (
    <motion.div
      ref={drag as any}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-lg p-4 border border-white/10 cursor-move hover:border-[#FF2D8D]/50 transition-all mb-3"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm flex-1">{task.title}</h4>
        <Button variant="ghost" size="sm" className="p-0 h-auto">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </Button>
      </div>
      <p className="text-xs text-gray-400 mb-3">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
        {task.assignee && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <User className="w-3 h-3" />
            {task.assignee}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function KanbanColumn({ column, moveTask }: { column: Column; moveTask: (taskId: string, toColumn: string) => void }) {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: { id: string; fromColumn: string }) => {
      if (item.fromColumn !== column.id) {
        moveTask(item.id, column.id);
      }
    },
  });

  return (
    <div ref={drop as any} className="shrink-0 w-80">
      <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${column.color}`} />
            <h3 className="text-sm">{column.title}</h3>
            <span className="text-xs text-gray-400">({column.tasks.length})</span>
          </div>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} columnId={column.id} moveTask={moveTask} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'backlog',
      title: 'Backlog',
      color: 'bg-gray-500',
      tasks: [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create mockups for the updated landing page',
          assignee: 'Sarah',
          priority: 'medium',
        },
        {
          id: '2',
          title: 'Update user documentation',
          description: 'Add new features to the user guide',
          assignee: 'Mike',
          priority: 'low',
        },
      ],
    },
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-blue-500',
      tasks: [
        {
          id: '3',
          title: 'Implement payment gateway',
          description: 'Integrate Stripe payment processing',
          assignee: 'Alex',
          priority: 'high',
        },
        {
          id: '4',
          title: 'Create API endpoints',
          description: 'Build REST API for mobile app',
          assignee: 'Jordan',
          priority: 'high',
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-yellow-500',
      tasks: [
        {
          id: '5',
          title: 'Fix authentication bug',
          description: 'Resolve login issues on mobile',
          assignee: 'Taylor',
          priority: 'high',
        },
        {
          id: '6',
          title: 'Optimize database queries',
          description: 'Improve app performance',
          assignee: 'Chris',
          priority: 'medium',
        },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      color: 'bg-purple-500',
      tasks: [
        {
          id: '7',
          title: 'Code review for feature X',
          description: 'Review pull request #123',
          assignee: 'Sam',
          priority: 'medium',
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-500',
      tasks: [
        {
          id: '8',
          title: 'Deploy to production',
          description: 'Release version 2.0',
          priority: 'high',
        },
        {
          id: '9',
          title: 'Setup CI/CD pipeline',
          description: 'Automated testing and deployment',
          assignee: 'Morgan',
          priority: 'medium',
        },
      ],
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const moveTask = (taskId: string, toColumnId: string) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      let task: Task | undefined;

      // Find and remove task from source column
      for (let i = 0; i < newColumns.length; i++) {
        const taskIndex = newColumns[i].tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          task = newColumns[i].tasks[taskIndex];
          newColumns[i].tasks.splice(taskIndex, 1);
          break;
        }
      }

      // Add task to destination column
      if (task) {
        const toColumnIndex = newColumns.findIndex((c) => c.id === toColumnId);
        if (toColumnIndex !== -1) {
          newColumns[toColumnIndex].tasks.push(task);
        }
      }

      return newColumns;
    });
  };

  const handleAddTask = (columnId: string) => {
    if (!newTask.title) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      assignee: newTask.assignee || undefined,
      priority: newTask.priority,
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );

    setNewTask({ title: '', description: '', assignee: '', priority: 'medium' });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background text-foreground pb-20 md:pb-8">
        <Navigation />

        <div className="px-4 pt-20 md:pt-24">
          <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="mb-1">Kanban Board</h1>
                <p className="text-sm text-gray-400">Drag and drop tasks between columns</p>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1A1A1F] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Add a new task to your board
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="task-title">Title</Label>
                    <Input
                      id="task-title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
                      placeholder="Enter task title..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="task-description">Description</Label>
                    <Textarea
                      id="task-description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
                      placeholder="Enter task description..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="task-assignee">Assignee</Label>
                    <Input
                      id="task-assignee"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
                      placeholder="Assign to..."
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <div className="flex gap-2 mt-2">
                      {(['low', 'medium', 'high'] as const).map((priority) => (
                        <button
                          key={priority}
                          onClick={() => setNewTask({ ...newTask, priority })}
                          className={`flex-1 py-2 px-4 rounded-lg border transition-all capitalize ${newTask.priority === priority
                            ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                            : 'border-white/10 hover:border-white/20'
                            }`}
                        >
                          {priority}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddTask('backlog')}
                    className="w-full bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
                  >
                    Add Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto pb-8">
            <div className="flex gap-6 min-w-max px-2">
              {columns.map((column) => (
                <KanbanColumn key={column.id} column={column} moveTask={moveTask} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
