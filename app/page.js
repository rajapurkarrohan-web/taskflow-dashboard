"use client";
import { useState, useEffect } from "react";
import SummaryCard from "@/Components/SummaryCard";
import TaskTable from "@/Components/TaskTable";


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  
const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.completed === true
).length;

const pendingTasks = totalTasks - completedTasks;


  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        setTasks(data);
        console.log("Fetched Tasks:", data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  return (

    <div className="min-h-screen bg-[#E9EDF5] p-3">
      <div className="flex min-h-[calc(100vh-24px)] overflow-hidden rounded-2xl border border-[#E1E5EC] bg-white shadow-sm">

        {/* Left Sidebar */}
        <aside className="hidden md:block w-60 shrink-0 bg-[#211E2B] p-4 text-white">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#783FF3] text-lg font-bold">
              T
            </div>
            <span className="text-base font-semibold">
              TaskFlow
            </span>
          </div>

          <nav className="space-y-2">
            <a
              href="/"
              className="flex items-center rounded-lg bg-[#39305E] px-4 py-3 text-sm font-medium text-white"
            >
              Dashboard
            </a>

            <a
              href="#tasks"
              className="flex items-center rounded-lg px-4 py-3 text-sm text-[#C6C0D0] hover:bg-[#302B3D]"
            >
              My Tasks
            </a>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="min-w-0 flex-1 bg-[#FCFDFE] p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#19171A]">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#6C7493]">
              Track your tasks and monitor progress.
            </p>
          </div>

          {/* Summary cards will go here */}
          
<div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
  <SummaryCard
    title="Total Tasks"
    value={totalTasks}
    color="bg-[#EFF8FB]"
  />

  <SummaryCard
    title="Completed"
    value={completedTasks}
    color="bg-[#EDF8F0]"
  />

  <SummaryCard
    title="Pending"
    value={pendingTasks}
    color="bg-[#F5F0FC]"
  />
</div>


          {/* Task Table Section */}
<TaskTable tasks={tasks} />
        </main>

      </div>
    </div>
  );
}
