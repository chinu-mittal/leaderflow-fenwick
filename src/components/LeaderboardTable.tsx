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

  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <Card className="overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="py-4 px-6 text-left font-semibold">Player</th>
                <th className="py-4 px-6 text-left font-semibold">Score</th>
                <th className="py-4 px-6 text-left font-semibold">Rank</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr
                    key={player.name}
                    className={`border-b border-border transition-all duration-800 hover:bg-accent ${
                      highlightedPlayer === player.name ? "bg-highlight" : ""
                    }`}
                  >
                    <td className="py-4 px-6 font-medium">{player.name}</td>
                    <td className="py-4 px-6">{player.score}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                        {player.rank}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 px-6 text-center text-muted-foreground">
                    No players found
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
