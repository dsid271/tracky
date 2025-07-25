import type { Task, TaskStatus } from '@/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Circle, CircleCheck, CircleDot, BookOpen } from 'lucide-react';

interface TaskItemProps {
  week: number;
  tasks: Task[];
  onStatusChange: (taskId: number, status: TaskStatus) => void;
  onNotesChange: (taskId: number, notes: string) => void;
  isReadOnly: boolean;
}

const statusConfig = {
  "Not Started": {
    icon: <Circle className="h-4 w-4" />,
    className: 'bg-muted text-muted-foreground border-transparent',
  },
  "In Progress": {
    icon: <CircleDot className="h-4 w-4 text-yellow-500" />,
    className: 'bg-yellow-100 text-yellow-800 border-transparent dark:bg-yellow-900/50 dark:text-yellow-300',
  },
  "Done": {
    icon: <CircleCheck className="h-4 w-4 text-green-500" />,
    className: 'bg-green-100 text-green-800 border-transparent dark:bg-green-900/50 dark:text-green-300',
  },
};

export default function TaskItem({ week, tasks, onStatusChange, onNotesChange, isReadOnly }: TaskItemProps) {
  const completedInWeek = tasks.filter(t => t.status === 'Done').length;
  const totalInWeek = tasks.length;
  const isWeekComplete = completedInWeek === totalInWeek;

  return (
    <AccordionItem value={`week-${week}`}>
      <AccordionTrigger className={cn("text-lg font-semibold hover:no-underline", isWeekComplete && "text-green-500")}>
        <div className="flex items-center gap-3">
          {isWeekComplete ? <CircleCheck className="h-6 w-6" /> : <BookOpen className="h-6 w-6 text-primary" />}
          Week {week}
          <span className="text-sm font-normal text-muted-foreground">({completedInWeek}/{totalInWeek} completed)</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pl-4 border-l-2 border-primary/20">
          {tasks.map(task => (
            <div key={task.id} className={cn("p-4 rounded-lg transition-all", task.status === 'Done' ? 'bg-green-500/10' : 'bg-card')}>
              <div className="flex items-start gap-4">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.status === 'Done'}
                  onCheckedChange={(checked) => onStatusChange(task.id, checked ? 'Done' : 'Not Started')}
                  className="mt-1"
                  disabled={isReadOnly}
                />
                <div className="grid gap-1.5 w-full">
                  <label htmlFor={`task-${task.id}`} className={cn("font-medium", !isReadOnly && "cursor-pointer")}>
                    Day {task.day}: {task.title}
                  </label>
                  <div className="flex items-center gap-4">
                    <Select value={task.status} onValueChange={(value: TaskStatus) => onStatusChange(task.id, value)} disabled={isReadOnly}>
                      <SelectTrigger className="w-[150px] h-8 text-xs">
                        <SelectValue placeholder="Set status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(statusConfig).map(status => (
                          <SelectItem key={status} value={status}>
                            <div className="flex items-center gap-2">
                              {statusConfig[status as TaskStatus].icon}
                              {status}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                     <Badge variant="outline" className={cn('text-xs', statusConfig[task.status].className)}>
                        {task.status}
                     </Badge>
                  </div>
                  <Textarea
                    placeholder="Add notes or resources..."
                    value={task.notes}
                    onChange={(e) => onNotesChange(task.id, e.target.value)}
                    className="mt-2 text-sm"
                    disabled={isReadOnly}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
