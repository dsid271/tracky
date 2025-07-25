import type { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ClipboardList } from 'lucide-react';
import { useMemo } from 'react';

interface StatsCardsProps {
  tasks: Task[];
  completedTasks: number;
  totalTasks: number;
  completionPercentage: number;
}

export default function StatsCards({ tasks, completedTasks, totalTasks, completionPercentage }: StatsCardsProps) {
  
  const weeklySummaries = useMemo(() => {
    const summaries: { week: number; completed: number; total: number }[] = [];
    const weeks = [...new Set(tasks.map(t => t.week))];
    
    weeks.forEach(week => {
      const weekTasks = tasks.filter(t => t.week === week);
      const completedInWeek = weekTasks.filter(t => t.status === 'Done').length;
      summaries.push({
        week,
        completed: completedInWeek,
        total: weekTasks.length
      });
    });
    return summaries;
  }, [tasks]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Overall Progress</CardTitle>
          <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionPercentage}% Complete</div>
          <p className="text-xs text-muted-foreground">
            {completedTasks} of {totalTasks} days done. Keep going!
          </p>
          <Progress value={completionPercentage} className="mt-4" />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {weeklySummaries.map(summary => {
          const weeklyPercentage = summary.total > 0 ? Math.round((summary.completed / summary.total) * 100) : 0;
          return (
            <Card key={summary.week}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Week {summary.week} Summary</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{summary.completed} / {summary.total} tasks</div>
                <p className="text-xs text-muted-foreground">{weeklyPercentage}% completed this week</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
