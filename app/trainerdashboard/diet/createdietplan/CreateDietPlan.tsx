"use client"
import { useState } from "react";
import {
  Plus,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface Meal {
  id: string;
  time: string;
  name: string;
  description: string;
  calories: string;
  ingredients: string[];
}

interface DietPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  meals: Meal[];
}

const dummyMeals: Meal[] = [
  {
    id: "1",
    time: "08:00",
    name: "Breakfast",
    description: "High protein breakfast",
    calories: "400",
    ingredients: ["Oats", "Banana", "Eggs", "Milk"]
  },
  {
    id: "2",
    time: "11:00",
    name: "Mid-Morning Snack",
    description: "Protein rich snack",
    calories: "200",
    ingredients: ["Greek Yogurt", "Almonds", "Honey"]
  },
  {
    id: "3",
    time: "13:00",
    name: "Lunch",
    description: "Balanced lunch meal",
    calories: "600",
    ingredients: ["Chicken Breast", "Brown Rice", "Broccoli", "Olive Oil"]
  }
];

const dummyDietPlan: DietPlan = {
  id: "diet-1",
  name: "Weight Loss Diet Plan",
  description: "A balanced diet plan for healthy weight loss",
  duration: "4 weeks",
  meals: dummyMeals
};

export default function CreateDietPlan() {
  const [dietPlan, setDietPlan] = useState<DietPlan>(dummyDietPlan);
  const [meals, setMeals] = useState<Meal[]>(dummyMeals);
  const router = useRouter();
  const { toast } = useToast();

  const handleAddMeal = () => {
    const newMeal: Meal = {
      id: uuidv4(),
      time: "",
      name: "",
      description: "",
      calories: "",
      ingredients: []
    };
    setMeals([...meals, newMeal]);
  };

  const handleUpdateMeal = (updatedMeal: Meal) => {
    setMeals(meals.map(meal => 
      meal.id === updatedMeal.id ? updatedMeal : meal
    ));
  };

  const handleDeleteMeal = (mealId: string) => {
    setMeals(meals.filter(meal => meal.id !== mealId));
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Diet plan saved successfully!",
    });
    router.push("/trainerdashboard/diet");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg my-10">
      <form onSubmit={handleSave}>
        <div className="p-6">
          <div className="mb-4">
            <Label htmlFor="name">Diet Plan Name</Label>
            <Input
              id="name"
              value={dietPlan?.name || ""}
              onChange={(e) =>
                setDietPlan({ ...dietPlan, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={dietPlan?.description || ""}
              onChange={(e) =>
                setDietPlan({ ...dietPlan, description: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={dietPlan?.startDate || ""}
              onChange={(e) =>
                setDietPlan({ ...dietPlan, startDate: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={dietPlan?.endDate || ""}
              onChange={(e) =>
                setDietPlan({ ...dietPlan, endDate: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <Label>Meals</Label>
            {meals.map((meal) => (
              <div key={meal.id} className="mb-4">
                <div className="flex items-center mb-2">
                  <Input
                    placeholder="Meal Name"
                    value={meal.name}
                    onChange={(e) =>
                      handleUpdateMeal({ ...meal, name: e.target.value })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    className="ml-2"
                    onClick={() => handleDeleteMeal(meal.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder="Meal Description"
                  value={meal.description}
                  onChange={(e) =>
                    handleUpdateMeal({ ...meal, description: e.target.value })
                  }
                  required
                />
                <Input
                  type="time"
                  value={meal.time}
                  onChange={(e) =>
                    handleUpdateMeal({ ...meal, time: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Calories"
                  value={meal.calories}
                  onChange={(e) =>
                    handleUpdateMeal({ ...meal, calories: e.target.value })
                  }
                  required
                />
                <Textarea
                  placeholder="Ingredients (comma separated)"
                  value={meal.ingredients.join(", ")}
                  onChange={(e) =>
                    handleUpdateMeal({ ...meal, ingredients: e.target.value.split(", ") })
                  }
                  required
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddMeal}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Meal
            </Button>
          </div>
          <Button type="submit" className="w-full">
            Save Diet Plan
          </Button>
        </div>
      </form>
    </Card>
  );
}
