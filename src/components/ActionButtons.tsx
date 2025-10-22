import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onUpdateScore: (name: string, score: number) => void;
}

const ActionButtons = ({ onUpdateScore }: ActionButtonsProps) => {
  const actions = [
    { label: "+50 Alice", name: "Alice", score: 50 },
    { label: "+70 Bob", name: "Bob", score: 70 },
    { label: "+30 Charlie", name: "Charlie", score: 30 },
    { label: "Alice → 80", name: "Alice", score: 80 },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-8 px-4 animate-scale-in">
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={() => onUpdateScore(action.name, action.score)}
          className="transition-all duration-300 hover:scale-110 hover:shadow-glow bg-gradient-primary border-0 font-semibold"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
