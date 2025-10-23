import { ScoreHistory } from "@/types/player";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface PlayerPerformanceChartProps {
  playerName: string;
  history: ScoreHistory[];
  onClose: () => void;
}

const PlayerPerformanceChart = ({ playerName, history, onClose }: PlayerPerformanceChartProps) => {
  const chartData = history.map((entry, index) => ({
    index: index + 1,
    score: entry.score,
    time: format(new Date(entry.timestamp), "HH:mm:ss"),
  }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <Card 
        className="w-full max-w-3xl p-8 shadow-2xl border-2 border-primary/20 bg-card animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">📈</span>
            {playerName}'s Performance
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
          >
            ×
          </button>
        </div>
        
        {history.length > 1 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="playerScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="index" 
                label={{ value: "Update #", position: "insideBottom", offset: -5 }}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                label={{ value: "Score", angle: -90, position: "insideLeft" }}
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
                formatter={(value: number, name: string) => [value, "Score"]}
                labelFormatter={(label) => `Update #${label}`}
              />
              <Line 
                type="monotone"
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
                activeDot={{ r: 7, fill: "hsl(var(--primary-glow))" }}
                fill="url(#playerScore)"
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <span className="text-4xl mb-4 block">📊</span>
            Not enough data yet. Update the score at least once more to see the performance graph.
          </div>
        )}
        
        <div className="mt-6 p-4 bg-accent/20 rounded-lg">
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-muted-foreground">Total Updates:</span>
              <span className="ml-2 font-bold">{history.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Current Score:</span>
              <span className="ml-2 font-bold text-primary">{history[history.length - 1]?.score}</span>
            </div>
            {history.length > 1 && (
              <div>
                <span className="text-muted-foreground">Change:</span>
                <span className={`ml-2 font-bold ${
                  history[history.length - 1].score > history[0].score ? "text-green-500" : "text-red-500"
                }`}>
                  {history[history.length - 1].score > history[0].score ? "+" : ""}
                  {history[history.length - 1].score - history[0].score}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlayerPerformanceChart;
