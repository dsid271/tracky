import type { Task, TaskStatus } from '@/types';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import TaskItem from './TaskItem';
import { CalendarRange } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: number, status: TaskStatus) => void;
  onNotesChange: (taskId: number, notes: string) => void;
  isReadOnly: boolean;
}

export default function TaskList({ tasks, onStatusChange, onNotesChange, isReadOnly }: TaskListProps) {
  const tasksByWeek = useMemo(() => {
    return tasks.reduce((acc, task) => {
      (acc[task.week] = acc[task.week] || []).push(task);
      return acc;
    }, {} as Record<number, Task[]>);
  }, [tasks]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarRange className="h-5 w-5 text-muted-foreground" />
          Daily Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['week-1']} className="w-full">
          {Object.entries(tasksByWeek).map(([week, weekTasks]) => (
            <TaskItem
              key={`week-${week}`}
              week={parseInt(week)}
              tasks={weekTasks}
              onStatusChange={onStatusChange}
              onNotesChange={onNotesChange}
              isReadOnly={isReadOnly}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
