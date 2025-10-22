const LeaderboardHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
        <span className="text-5xl">🏆</span>
        Real-Time Leaderboard
      </h1>
      <p className="text-sm mt-2 opacity-90">Powered by Fenwick Tree Algorithm</p>
    </header>
  );
};

export default LeaderboardHeader;
