import type { LeaderboardEntry, AllProgress } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Medal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';


interface LeaderboardProps {
  users: LeaderboardEntry[];
  allProgress: AllProgress | null;
  currentUser: string;
}

export default function Leaderboard({ users, allProgress, currentUser }: LeaderboardProps) {
  
  const leaderboardData = users.map(user => {
    const userProgress = allProgress ? allProgress[user.id as keyof AllProgress] : null;
    const tasks = userProgress?.tasks || [];
    const daysCompleted = tasks.filter(task => task.status === 'Done').length;
    const totalDays = tasks.length > 0 ? tasks.length : 30;
    const progressPercentage = totalDays > 0 ? Math.round((daysCompleted / totalDays) * 100) : 0;
    
    return {
      ...user,
      daysCompleted,
      progress: progressPercentage,
    };
  }).sort((a, b) => b.progress - a.progress);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Leaderboard</CardTitle>
        <Users className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((user, index) => (
              <TableRow key={user.id} className={cn(user.id === currentUser && 'bg-primary/10')}>
                <TableCell className="font-medium">
                  <div className="flex items-center justify-center">
                    {index === 0 && leaderboardData[0].progress > 0 ? <Medal className="h-5 w-5 text-yellow-500" /> : index + 1}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar" />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={user.progress} className="w-full h-2" />
                    <span className="text-xs text-muted-foreground font-mono">{user.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">{user.daysCompleted} / 30</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
