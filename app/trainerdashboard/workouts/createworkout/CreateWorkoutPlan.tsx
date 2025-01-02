"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  ClipboardList,
  Clock,
  FileText,
  Dumbbell,
  Target,
  ChevronDown,
  Repeat,
  Timer,
  Activity,
  Weight,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes: string;
  category?: string;
  equipmentNeeded?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

interface WorkoutDay {
  name: string;
  exercises: Exercise[];
}

const exerciseCategories = [
  "Strength", "Cardio", "Flexibility", "Balance",
  "Core", "Olympic", "Calisthenics", "Recovery"
];

const exerciseTemplates = {
  "Strength": ["Bench Press", "Deadlift", "Squats", "Rows"],
  "Cardio": ["Running", "Cycling", "Jump Rope", "HIIT"],
  "Core": ["Planks", "Crunches", "Russian Twists", "Leg Raises"],
  // Add more templates...
};

export default function CreateWorkoutPlan() {
  const [currentStep, setCurrentStep] = useState(1);
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([
    { name: "Day 1", exercises: [{ name: "", sets: "", reps: "", rest: "", notes: "" }] }
  ]);
  const [previewMode, setPreviewMode] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Schedule" },
    { number: 3, title: "Exercises" },
    { number: 4, title: "Review" }
  ];

  const addWorkoutDay = () => {
    setWorkoutDays([
      ...workoutDays,
      { 
        name: `Day ${workoutDays.length + 1}`, 
        exercises: [{ name: "", sets: "", reps: "", rest: "", notes: "" }] 
      }
    ]);
  };

  const addExercise = (dayIndex: number) => {
    const updatedDays = [...workoutDays];
    updatedDays[dayIndex].exercises.push({ name: "", sets: "", reps: "", rest: "", notes: "" });
    setWorkoutDays(updatedDays);
  };

  const removeExercise = (dayIndex: number, exerciseIndex: number) => {
    const updatedDays = [...workoutDays];
    updatedDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setWorkoutDays(updatedDays);
  };

  const updateExercise = (dayIndex: number, exerciseIndex: number, field: keyof Exercise, value: string) => {
    const updatedDays = [...workoutDays];
    updatedDays[dayIndex].exercises[exerciseIndex][field] = value;
    setWorkoutDays(updatedDays);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Workout plan:", workoutDays);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto p-6"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${currentStep >= step.number 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'}
              `}>
                {step.number}
              </div>
              <span className="text-sm mt-2">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-4">
          <div className="h-2 bg-gray-200 rounded">
            <div 
              className="h-full bg-blue-600 rounded transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            />
          </div>
        </div>
      </div>

      <Card className="w-full bg-white shadow-xl">
        <CardHeader className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Dumbbell className="w-6 h-6" />
            Create Workout Plan
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <CardContent className="space-y-6 mt-4">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="planName" className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        Plan Name
                      </Label>
                      <Input
                        id="planName"
                        placeholder="Enter workout plan name"
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
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Schedule Configuration */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* ...schedule fields... */}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Exercise Configuration */}
                  <Accordion type="single" collapsible className="space-y-4">
                    {workoutDays.map((day, dayIndex) => (
                      <AccordionItem 
                        key={dayIndex} 
                        value={`day-${dayIndex}`}
                        className="border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="px-4 hover:no-underline">
                          <span className="flex items-center gap-2">
                            <Dumbbell className="w-4 h-4 text-blue-600" />
                            {day.name}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-4">
                          {day.exercises.map((exercise, exerciseIndex) => (
                            <Card key={exerciseIndex} className="bg-gray-50">
                              <CardContent className="pt-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="flex items-center gap-2 mb-2">
                                      <Weight className="w-4 h-4 text-blue-600" />
                                      Exercise Name
                                    </Label>
                                    <Input
                                      value={exercise.name}
                                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, "name", e.target.value)}
                                      placeholder="Exercise name"
                                      className="border-gray-300"
                                    />
                                  </div>
                                  <div className="grid grid-cols-3 gap-2">
                                    <div>
                                      <Label className="flex items-center gap-2 mb-2">
                                        <Repeat className="w-4 h-4 text-blue-600" />
                                        Sets
                                      </Label>
                                      <Input
                                        value={exercise.sets}
                                        onChange={(e) => updateExercise(dayIndex, exerciseIndex, "sets", e.target.value)}
                                        placeholder="Sets"
                                        className="border-gray-300"
                                      />
                                    </div>
                                    <div>
                                      <Label className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4 text-blue-600" />
                                        Reps
                                      </Label>
                                      <Input
                                        value={exercise.reps}
                                        onChange={(e) => updateExercise(dayIndex, exerciseIndex, "reps", e.target.value)}
                                        placeholder="Reps"
                                        className="border-gray-300"
                                      />
                                    </div>
                                    <div>
                                      <Label className="flex items-center gap-2 mb-2">
                                        <Timer className="w-4 h-4 text-blue-600" />
                                        Rest
                                      </Label>
                                      <Input
                                        value={exercise.rest}
                                        onChange={(e) => updateExercise(dayIndex, exerciseIndex, "rest", e.target.value)}
                                        placeholder="Rest"
                                        className="border-gray-300"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <Label className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    Notes
                                  </Label>
                                  <div className="flex gap-2">
                                    <Textarea
                                      value={exercise.notes}
                                      onChange={(e) => updateExercise(dayIndex, exerciseIndex, "notes", e.target.value)}
                                      placeholder="Exercise notes"
                                      className="border-gray-300 flex-1"
                                    />
                                    <Button
                                      type="button"
                                      onClick={() => removeExercise(dayIndex, exerciseIndex)}
                                      variant="ghost"
                                      size="icon"
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          <Button
                            type="button"
                            onClick={() => addExercise(dayIndex)}
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                          >
                            <Plus className="w-4 h-4 mr-1" /> Add Exercise
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Preview Mode */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {/* Workout plan preview content */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-gradient-to-br from-blue-600 to-indigo-600"
              >
                Create Workout Plan
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
