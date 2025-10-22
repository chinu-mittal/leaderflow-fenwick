import { useState, useCallback } from "react";
import { FenwickTree } from "@/lib/fenwickTree";
import { Player, PlayerData } from "@/types/player";
import LeaderboardHeader from "@/components/LeaderboardHeader";
import ActionButtons from "@/components/ActionButtons";
import SearchBar from "@/components/SearchBar";
import LeaderboardTable from "@/components/LeaderboardTable";
import ScoreChart from "@/components/ScoreChart";

const MAX_SCORE = 100;

const Index = () => {
  const [tree] = useState(() => new FenwickTree(MAX_SCORE));
  const [players, setPlayers] = useState<PlayerData>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedPlayer, setUpdatedPlayer] = useState<string | null>(null);

  const updateScore = useCallback(
    (name: string, newScore: number) => {
      setPlayers((prev) => {
        const updated = { ...prev };
        
        // Remove old score from tree if player exists
        if (updated[name]) {
          tree.update(updated[name], -1);
        }
        
        // Add new score
        updated[name] = newScore;
        tree.update(newScore, 1);
        
        return updated;
      });
      
      setUpdatedPlayer(name);
    },
    [tree]
  );

  const getLeaderboard = useCallback((): Player[] => {
    const total = tree.query(MAX_SCORE);
    
    return Object.entries(players)
      .map(([name, score]) => ({
        name,
        score,
        rank: total - tree.query(score) + 1,
      }))
      .sort((a, b) => b.score - a.score);
  }, [players, tree]);

  const leaderboard = getLeaderboard();

  return (
    <div className="min-h-screen bg-background">
      <LeaderboardHeader />
      <ActionButtons onUpdateScore={updateScore} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <LeaderboardTable 
        players={leaderboard} 
        searchQuery={searchQuery}
        updatedPlayer={updatedPlayer}
      />
      {leaderboard.length > 0 && <ScoreChart players={leaderboard} />}
    </div>
  );
};

export default Index;
