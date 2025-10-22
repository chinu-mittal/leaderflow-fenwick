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
    <div className="max-w-2xl mx-auto px-4 my-8">
      <Card className="p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <UserPlus className="w-6 h-6" />
          Add New Player
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="playerName">Player Name</Label>
              <Input
                id="playerName"
                type="text"
                placeholder="Enter player name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playerScore">Score (0-100)</Label>
              <Input
                id="playerScore"
                type="number"
                placeholder="Enter score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                min="0"
                max="100"
              />
            </div>
          </div>
          <Button type="submit" className="w-full md:w-auto">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Player
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddPlayerForm;
