import { useState, useCallback } from "react";
import { FenwickTree } from "@/lib/fenwickTree";
import { Player, PlayerData } from "@/types/player";
import LeaderboardHeader from "@/components/LeaderboardHeader";
import ActionButtons from "@/components/ActionButtons";
import AddPlayerForm from "@/components/AddPlayerForm";
import SearchBar from "@/components/SearchBar";
import LeaderboardTable from "@/components/LeaderboardTable";
import ScoreChart from "@/components/ScoreChart";
import TopThreePodium from "@/components/TopThreePodium";

const MAX_SCORE = 100;

const Index = () => {
  const [tree] = useState(() => new FenwickTree(MAX_SCORE));
  const [players, setPlayers] = useState<PlayerData>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedPlayer, setUpdatedPlayer] = useState<string | null>(null);

  const updateScore = useCallback(
    (name: string, newScore: number) => {
      const timestamp = Date.now();
      
      setPlayers((prev) => {
        const updated = { ...prev };
        
        // Remove old score from tree if player exists
        if (updated[name]) {
          tree.update(updated[name].score, -1);
        }
        
        // Add new score
        const history = updated[name]?.history || [];
        updated[name] = {
          score: newScore,
          timestamp,
          history: [...history, { score: newScore, timestamp }],
        };
        tree.update(newScore, 1);
        
        return updated;
      });
      
      setUpdatedPlayer(name);
    },
    [tree]
  );

  const getLeaderboard = useCallback((): Player[] => {
    return Object.entries(players)
      .map(([name, data]) => ({
        name,
        score: data.score,
        timestamp: data.timestamp,
        rank: 0,
      }))
      .sort((a, b) => {
        // Sort by score descending, then by timestamp ascending (earlier = higher rank)
        if (b.score !== a.score) return b.score - a.score;
        return a.timestamp - b.timestamp;
      })
      .map((player, index) => ({
        ...player,
        rank: index + 1, // Assign rank based on sorted position
      }));
  }, [players]);

  const leaderboard = getLeaderboard();

  return (
    <div className="min-h-screen bg-background">
      <LeaderboardHeader />
      <ActionButtons onUpdateScore={updateScore} />
      <AddPlayerForm onAddPlayer={updateScore} />
      {leaderboard.length > 0 && <TopThreePodium players={leaderboard} />}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <LeaderboardTable 
        players={leaderboard}
        playersData={players}
        searchQuery={searchQuery}
        updatedPlayer={updatedPlayer}
      />
      {leaderboard.length > 0 && <ScoreChart players={leaderboard} />}
    </div>
  );
};

export default Index;
