"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function TaskDetailsPanel() {
    const router = useRouter();
    const params = useParams();
const [task, setTask] = useState(null);
const [error, setError] = useState(null);


useEffect(() => {
  setTask(null);
  setError(null);

  fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch task details");
      }

      return response.json();
    })
    .then((data) => {
      setTask(data);
    })
    .catch((error) => {
      setError(error.message);
    });
}, [params.id]);


if (error) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="h-full w-full max-w-[580px] bg-white p-8 shadow-xl">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Task Details
          </h2>

          <button
            onClick={() => router.back()}
            className="text-2xl text-gray-500"
            aria-label="Close task details"
          >
            &times;
          </button>
        </div>

        <div className="mt-10 rounded-lg bg-red-50 p-4">
          <p className="font-medium text-red-700">
            Unable to load task details
          </p>
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        </div>

      </div>
    </div>
  );
}

if (!task) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="h-full w-full max-w-[580px] bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Task Details
          </h2>

          <button
            onClick={() => router.back()}
            className="text-2xl text-gray-500"
            aria-label="Close task details"
          >
            &times;
          </button>
        </div>

        <p className="mt-10 text-gray-500">
          Loading task details...
        </p>
      </div>
    </div>
  );
}


  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="h-full w-full max-w-[580px] overflow-y-auto bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Task Details
          </h2>
          
<button
  onClick={() => router.back()}
  className="text-2xl text-gray-500"
  aria-label="Close task details"
>
  &times;
</button>

        </div>

        {/* Status */}
        <div className="mt-10">
          
<span
  className={`rounded-lg px-4 py-2 ${
    task.completed
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700"
  }`}
>
  {task.completed ? "Completed" : "Pending"}
</span>

        </div>

        {/* Task Title */}
       <h1 className="mt-10 text-3xl font-semibold text-gray-900">
  {task.title}
</h1>

        <p className="mt-2 text-gray-500">Task #{task.id}</p>

        {/* Task Information */}
        <div className="mt-8 divide-y divide-gray-200 border-t border-gray-200">

          <div className="grid grid-cols-2 py-6">
            <span className="text-gray-500">Status</span>
            <span className={task.completed ? "text-green-700" : "text-orange-700"}>{task.completed ? "Completed" : "Pending"}</span>
          </div>

          <div className="grid grid-cols-2 py-6">
            <span className="text-gray-500">User ID</span>
            <span className="text-gray-900">{task.userId}</span>
          </div>

          <div className="grid grid-cols-2 py-6">
            <span className="text-gray-500">Task ID</span>
            <span className="text-gray-900">{task.id}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
