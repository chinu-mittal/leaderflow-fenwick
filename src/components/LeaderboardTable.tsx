import { Player } from "@/types/player";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface LeaderboardTableProps {
  players: Player[];
  searchQuery: string;
  updatedPlayer: string | null;
}

const LeaderboardTable = ({ players, searchQuery, updatedPlayer }: LeaderboardTableProps) => {
  const [highlightedPlayer, setHighlightedPlayer] = useState<string | null>(null);

  useEffect(() => {
    if (updatedPlayer) {
      setHighlightedPlayer(updatedPlayer);
      const timer = setTimeout(() => setHighlightedPlayer(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [updatedPlayer]);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankBadgeClass = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg";
    if (rank === 2) return "bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-md";
    if (rank === 3) return "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md";
    return "bg-primary/10 text-primary";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 my-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <Card className="overflow-hidden shadow-2xl border-2 border-primary/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-primary text-primary-foreground">
                <th className="py-5 px-6 text-left font-bold text-base">Player</th>
                <th className="py-5 px-6 text-left font-bold text-base">Score</th>
                <th className="py-5 px-6 text-left font-bold text-base">Rank</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player, index) => (
                  <tr
                    key={player.name}
                    className={`border-b border-border transition-all duration-800 hover:bg-accent/50 hover:scale-[1.01] ${
                      highlightedPlayer === player.name ? "bg-highlight animate-pulse-glow" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-5 px-6 font-semibold text-base">{player.name}</td>
                    <td className="py-5 px-6 font-medium text-base">
                      <span className="inline-flex items-center gap-1">
                        {player.score}
                        <span className="text-xs text-muted-foreground">pts</span>
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-lg font-bold text-sm transition-all ${getRankBadgeClass(player.rank)}`}>
                        #{player.rank}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 px-6 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl opacity-50">🔍</span>
                      <span>No players found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LeaderboardTable;
