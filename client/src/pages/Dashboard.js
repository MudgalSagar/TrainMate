import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const calculatecalories = (category, duration) => {
    const Caloriesperminute = {
      Cardio: 10,
      Strength: 8,
      Flexibility: 5,
      Balance: 4,
    };
    const rate = Caloriesperminute[category] || 0;
    return rate * duration;
  };

  const fetchWorkouts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/workouts");
      const data = await res.json();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/workouts/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, duration, category }),
      });

      if (res.ok) {
        setName("");
        setDuration("");
        setCategory("");
        fetchWorkouts();
      }
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  const handleDeleteWorkout = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/workouts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setWorkouts((prev) => prev.filter((w) => w._id !== id));
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  const handleEditWorkout = (workout) => {
    setEditingId(workout._id);
    setName(workout.name);
    setDuration(workout.duration);
    setCategory(workout.category);
  };

  const handleUpdateWorkout = async (e) => {
    e.preventDefault();

    if (!name || !duration) {
      alert("Please fill in both name and duration fields");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/workouts/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, duration, category }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to update workout"
        );
      }

      setName("");
      setDuration("");
      setCategory("");
      setEditingId(null);
      fetchWorkouts();
      alert("Workout updated successfully!");
    } catch (err) {
      console.error("Update error details:", err);
      alert(`Update failed: ${err.message}`);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setDuration("");
    setCategory("");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleHistory = () => {
    navigate("/history");
  };

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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center bg-[url('https://media.istockphoto.com/id/1213615970/photo/gym-background-fitness-weight-equipment-on-empty-dark-floor.jpg?s=612x612&w=0&k=20&c=WyPxLxpfd9Pi6l0BMyWsqrrZIi_SrMmgTtYn8k08qQI=')] bg-cover bg-center">
      {" "}
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              <span className="text-orange-500">FITNESS</span> DASHBOARD
            </h1>
            <div className="space-x-4">
              <button
                onClick={handleHistory}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
              >
                Workout History
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {editingId ? "✏️ Edit Workout" : "➕ Add New Workout"}
            </h2>
            <form
              onSubmit={editingId ? handleUpdateWorkout : handleAddWorkout}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Workout Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Running, Deadlifts"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Duration in minutes"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Strength">Strength</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Balance">Balance</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition transform hover:scale-105"
                >
                  {editingId ? "Update Workout" : "Add Workout"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Your Workouts
            </h2>

            {workouts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No workouts recorded yet. Start adding your first workout!
              </div>
            ) : (
              <ul className="space-y-3">
                {workouts.map((w) => (
                  <li
                    key={w._id}
                    className="border-b border-gray-100 pb-3 last:border-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-800">
                          {w.name}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600">{w.duration} min</span>
                        {w.category && (
                          <span
                            className={`ml-2 px-2 py-1 text-xs rounded-full ${getCategoryColor(
                              w.category
                            )}`}
                          >
                            {w.category}
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            const calories = calculatecalories(
                              w.category,
                              w.duration
                            );
                            alert(
                              `🔥 You burned approximately ${calories} calories!`
                            );
                          }}
                          className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm rounded-md transition"
                        >
                          Calories
                        </button>

                        <button
                          onClick={() => handleEditWorkout(w)}
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm rounded-md transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteWorkout(w._id)}
                          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-sm rounded-md transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
