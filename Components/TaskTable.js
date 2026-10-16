"use client";

import { useState } from "react";
import Link from "next/link";


export default function TaskTable({ tasks }) {
  const [filter, setFilter] = useState("all");
  
const filteredTasks = tasks.filter((task) => {
  if (filter === "completed") {
    return task.completed === true;
  }

  if (filter === "pending") {
    return task.completed === false;
  }

  return true;
});


  return (
    <div className="min-w-0 rounded-xl border border-[#E4E4F1] bg-white p-3 sm:p-5">

      {/* Table Header */}
<div className="mb-5 flex flex-wrap items-center justify-between gap-4">

  <h2 className="text-lg font-semibold text-[#19171A]">
    Task List
  </h2>

  {/* Filter Buttons */}
  <div className="flex max-w-full flex-wrap items-center gap-1 rounded-lg border border-[#E4E4F1] bg-[#F5F6F8] p-1">

    {["all", "pending", "completed"].map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => setFilter(item)}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          filter === item
            ? "bg-[#783FF3] text-white shadow-sm"
            : "text-[#6C7493] hover:bg-white"
        }`}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </button>
    ))}

  </div>
</div>


{/* Mobile Task Cards */}
<div className="space-y-3 md:hidden">
  {filteredTasks.length === 0 && (
    <p className="py-10 text-center text-sm text-[#6C7493]">
      No tasks found.
    </p>
  )}

  {filteredTasks.map((task) => (
    <div
      key={task.id}
      className="rounded-lg border border-[#E4E4F1] bg-white p-4"
    >
      {/* Task Title */}
      <h3 className="break-words text-sm font-medium text-[#19171A]">
        {task.title}
      </h3>

      {/* User ID and Status */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-[#6C7493]">
          User ID: {task.userId}
        </span>

        <span
          className={`rounded-md px-3 py-1 text-xs font-medium ${
            task.completed
              ? "bg-[#E8F7EE] text-[#26834A]"
              : "bg-[#FFF4E6] text-[#B76A18]"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {/* View Details */}
      <div className="mt-4 border-t border-[#E4E4F1] pt-3">
        <Link
          href={`/tasks/${task.id}`}
          className="text-sm font-medium text-[#783FF3] hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  ))}
</div>

      {/* Task Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">

          <thead className="bg-[#F5F6F8]">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-[#6C7493]">
                Task Name
              </th>

              <th className="px-4 py-3 text-sm font-medium text-[#6C7493]">
                User ID
              </th>

              <th className="px-4 py-3 text-sm font-medium text-[#6C7493]">
                Status
              </th>

              <th className="px-4 py-3 text-sm font-medium text-[#6C7493]">
                Action
              </th>
            </tr>
          </thead>

          

<tbody>
  {filteredTasks.length === 0 && (
    <tr>
      <td
        colSpan={4}
        className="px-4 py-10 text-center text-sm text-[#6C7493]"
      >
        No tasks found.
      </td>
    </tr>
  )}

  {filteredTasks.map((task) => (

    <tr
      key={task.id}
      className="border-b border-[#E4E4F1] hover:bg-[#F9FAFC]"
    >
      <td className="px-4 py-4 text-sm text-[#19171A]">
        {task.title}
      </td>

      <td className="px-4 py-4 text-sm text-[#6C7493]">
        {task.userId}
      </td>

      <td className="px-4 py-4">
        <span
          className={`rounded-md px-3 py-1 text-xs font-medium ${
            task.completed
              ? "bg-[#E8F7EE] text-[#26834A]"
              : "bg-[#FFF4E6] text-[#B76A18]"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </td>

      <td className="px-4 py-4">
        
<Link
  href={`/tasks/${task.id}`}
  className="text-sm font-medium text-[#783FF3] hover:underline"
>
  View Details
</Link>

      </td>
    </tr>
  ))}
</tbody>


        </table>
      </div>
    </div>
  );
}
