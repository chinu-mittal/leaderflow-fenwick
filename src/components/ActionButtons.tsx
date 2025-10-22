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
    <div className="flex flex-wrap items-center justify-center gap-3 my-6 px-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={() => onUpdateScore(action.name, action.score)}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
