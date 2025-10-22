import { Player } from "@/types/player";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ScoreChartProps {
  players: Player[];
}

const ScoreChart = ({ players }: ScoreChartProps) => {
  const chartData = players.map((player) => ({
    name: player.name,
    score: player.score,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 my-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <Card className="p-8 shadow-2xl border-2 border-primary/10 bg-gradient-subtle">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-4xl">📊</span>
          Score Distribution
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "2px solid hsl(var(--primary))",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)",
              }}
            />
            <Line 
              type="monotone"
              dataKey="score" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 6 }}
              activeDot={{ r: 8, fill: "hsl(var(--primary-glow))" }}
              fill="url(#colorScore)"
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default ScoreChart;
