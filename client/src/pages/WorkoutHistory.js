import React, { useEffect, useState } from "react";
import WorkoutCharts from "../components/WorkoutCharts";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/Chat";
const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setWorkouts(data);
        } else {
          console.error("Failed to fetch workouts");
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case "Cardio":
        return "bg-red-100 text-red-800";
      case "Strength":
        return "bg-blue-100 text-blue-800";
      case "Flexibility":
        return "bg-green-100 text-green-800";
      case "Balance":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-orange-500">WORKOUT</span> HISTORY
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Chart Section */}
        {workouts.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              📈 Your Workout Progress
            </h2>
            <div className="w-full h-80">
              <WorkoutCharts workouts={workouts} />
            </div>
          </div>
        )}

        {/* Workouts List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            🏆 Your Workout Log
          </h2>

          {workouts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No workouts recorded yet. Get started with your fitness journey!
            </div>
          ) : (
            <ul className="space-y-4">
              {workouts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((w) => (
                  <li
                    key={w._id}
                    className="border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-800">
                          {w.name}
                        </div>
                        <div className="flex items-center mt-1 space-x-3">
                          <span className="text-gray-600">
                            ⏱️ {w.duration} minutes
                          </span>
                          {w.category && (
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                                w.category
                              )}`}
                            >
                              {w.category}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          🗓️{" "}
                          {new Date(w.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default WorkoutHistory;
