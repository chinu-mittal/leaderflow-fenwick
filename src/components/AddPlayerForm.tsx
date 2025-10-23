import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const playerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  score: z.number().min(0, "Score must be at least 0").max(100, "Score must be at most 100"),
});

interface AddPlayerFormProps {
  onAddPlayer: (name: string, score: number) => void;
}

const AddPlayerForm = ({ onAddPlayer }: AddPlayerFormProps) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = playerSchema.parse({
        name,
        score: Number(score),
      });

      onAddPlayer(validated.name, validated.score);
      toast.success(`${validated.name} added with score ${validated.score}!`);
      
      // Reset form
      setName("");
      setScore("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 my-8 animate-scale-in" style={{ animationDelay: '0.1s' }}>
      <Card className="p-8 shadow-xl border-2 border-primary/20 glass-effect hover:shadow-2xl transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 font-display">
          <UserPlus className="w-7 h-7 text-primary" />
          Add New Player
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="playerName" className="text-base font-semibold font-display">Player Name</Label>
              <Input
                id="playerName"
                type="text"
                placeholder="Enter player name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="py-6 text-base shadow-md hover:shadow-lg transition-all border-2 focus:border-primary bg-card/80 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playerScore" className="text-base font-semibold font-display">Score (0-100)</Label>
              <Input
                id="playerScore"
                type="number"
                placeholder="Enter score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                min="0"
                max="100"
                className="py-6 text-base shadow-md hover:shadow-lg transition-all border-2 focus:border-primary bg-card/80 backdrop-blur-sm"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-gradient-primary hover:shadow-xl transition-all duration-300 hover:scale-105 py-6 text-base font-semibold font-display shadow-md"
            size="lg"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add Player
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddPlayerForm;
