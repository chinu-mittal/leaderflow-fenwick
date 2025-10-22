const LeaderboardHeader = () => {
  return (
    <header className="relative bg-gradient-hero text-primary-foreground py-8 px-4 shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
      <div className="relative z-10 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold flex items-center justify-center gap-3 mb-2">
          <span className="text-6xl md:text-7xl animate-pulse-glow">🏆</span>
          Real-Time Leaderboard
        </h1>
        <p className="text-sm md:text-base mt-2 opacity-90">Powered by Fenwick Tree Algorithm • O(log n) Complexity</p>
      </div>
    </header>
  );
};

export default LeaderboardHeader;
