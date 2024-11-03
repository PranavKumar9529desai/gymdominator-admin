"use client"
import { useState } from "react";
import {
  Plus,
  Trash2,
  ClipboardList,
  Clock,
  FileText,
  Utensils,
  CalendarRange,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateDietPlan() {
  const [meals, setMeals] = useState([{ name: "", description: "" }]);

  const addMeal = () => {
    setMeals([...meals, { name: "", description: "" }]);
  };

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const handleMealChange = (index: number, field: string, value: string) => {
    const updatedMeals = meals.map((meal, i) => {
      if (i === index) {
        return { ...meal, [field]: value };
      }
      return meal;
    });
    setMeals(updatedMeals);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Diet plan submitted");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg my-10 ">
      <CardHeader className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white ">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="w-6 h-6" />
          Create Diet Plan
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="planName" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Plan Name
            </Label>
            <Input
              id="planName"
              placeholder="Enter diet plan name"
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Duration
            </Label>
            <Select>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1week">1 Week</SelectItem>
                <SelectItem value="2weeks">2 Weeks</SelectItem>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter plan description"
              className="border-gray-300"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-blue-600" />
                Meals
              </Label>
              <Button
                type="button"
                onClick={addMeal}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Meal
              </Button>
            </div>
            {meals.map((meal, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1 mr-2">
                      <Label htmlFor={`meal-${index}`} className="sr-only">
                        Meal Name
                      </Label>
                      <Input
                        id={`meal-${index}`}
                        placeholder="Meal name"
                        value={meal.name}
                        onChange={(e) =>
                          handleMealChange(index, "name", e.target.value)
                        }
                        className="border-gray-300"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeMeal(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor={`meal-desc-${index}`} className="sr-only">
                      Meal Description
                    </Label>
                    <Textarea
                      id={`meal-desc-${index}`}
                      placeholder="Meal description"
                      value={meal.description}
                      onChange={(e) =>
                        handleMealChange(index, "description", e.target.value)
                      }
                      className="border-gray-300"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white  flex items-center justify-center gap-2"
          >
            <CalendarRange className="w-5 h-5" />
            Create Diet Plan
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
