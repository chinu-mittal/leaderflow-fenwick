import { Player } from "@/types/player";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ScoreChartProps {
  players: Player[];
}

const ScoreChart = ({ players }: ScoreChartProps) => {
  const chartData = players.map((player) => ({
    name: player.name,
    score: player.score,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <Card className="p-6 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📊</span>
          Score Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default ScoreChart;
