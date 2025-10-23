import { Player } from "@/types/player";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

interface TopThreePodiumProps {
  players: Player[];
}

const TopThreePodium = ({ players }: TopThreePodiumProps) => {
  const topThree = players.slice(0, 3);
  
  if (topThree.length === 0) return null;

  const getPodiumHeight = (rank: number) => {
    if (rank === 1) return "h-48";
    if (rank === 2) return "h-40";
    return "h-32";
  };

  const getPodiumIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-12 h-12" />;
    if (rank === 2) return <Medal className="w-10 h-10" />;
    return <Award className="w-8 h-8" />;
  };

  const getPodiumColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400/20 to-yellow-600/20 border-yellow-500/50";
    if (rank === 2) return "from-gray-300/20 to-gray-500/20 border-gray-400/50";
    return "from-orange-400/20 to-orange-600/20 border-orange-500/50";
  };

  const getPodiumOrder = () => {
    if (topThree.length === 1) return [topThree[0]];
    if (topThree.length === 2) return [topThree[1], topThree[0]];
    return [topThree[1], topThree[0], topThree[2]];
  };

  const orderedPlayers = getPodiumOrder();

  return (
    <div className="max-w-4xl mx-auto px-4 my-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <Card className="p-8 shadow-2xl border-2 border-primary/10 bg-gradient-subtle">
        <h3 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <span className="text-4xl">🏆</span>
          Top 3 Champions
        </h3>
        <div className="flex items-end justify-center gap-4 min-h-[250px]">
          {orderedPlayers.map((player) => (
            <div
              key={player.name}
              className="flex flex-col items-center animate-scale-in"
              style={{ animationDelay: `${player.rank * 0.1}s` }}
            >
              <div className="mb-4 text-primary animate-pulse-glow">
                {getPodiumIcon(player.rank)}
              </div>
              <div className="text-center mb-2 min-w-[120px]">
                <div className="font-bold text-lg truncate px-2">{player.name}</div>
                <div className="text-2xl font-black text-primary">{player.score}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
              <div
                className={`w-32 ${getPodiumHeight(player.rank)} bg-gradient-to-br ${getPodiumColor(player.rank)} border-2 rounded-t-xl flex items-center justify-center transition-all hover:scale-105`}
              >
                <div className="text-4xl font-black opacity-30">#{player.rank}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TopThreePodium;
