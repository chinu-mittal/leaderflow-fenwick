const LeaderboardHeader = () => {
  return (
    <header className="relative bg-gradient-hero text-primary-foreground py-12 px-4 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnpNNiAzNGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTYgNjBjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div className="relative z-10 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-black flex items-center justify-center gap-4 font-display">
          <span className="text-6xl md:text-8xl animate-float drop-shadow-2xl">🏆</span>
          <span className="bg-gradient-to-r from-white via-white to-primary-foreground/80 bg-clip-text text-transparent">
            Real-Time Leaderboard
          </span>
        </h1>
      </div>
    </header>
  );
};

export default LeaderboardHeader;
