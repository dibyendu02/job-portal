"use client";

import React, { useState } from "react";
import { Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Job card */}
      <div
        className="job-card border border-gray-300 p-4 m-2 rounded-md cursor-pointer hover:shadow-md flex gap-4 items-start dark:border-gray-700"
        onClick={() => setOpen(true)}
      >
        <img
          src={job.companyLogo}
          alt={`${job.company} logo`}
          className="w-12 h-12 rounded bg-gray-100 dark:bg-gray-800 object-contain"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {job.title}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {job.company}
          </p>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
            {job.shortDescription}
          </p>
        </div>
      </div>

      {/* Bottom Sheet Modal */}
      {open && (
        <div
          className="fixed  bg-black bg-opacity-60 z-40"
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed bottom-0 left-0 right-0 bg-black text-white rounded-t-xl p-4 shadow-xl z-50 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="text-white text-xl font-bold px-2 hover:text-gray-300"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>{job.company}</strong> • {job.location}
            </p>

            <h4 className="font-semibold mt-4 text-white">Skills Required</h4>
            <ul className="list-disc list-inside text-sm text-gray-200">
              {job.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>

            <h4 className="font-semibold mt-4 text-white">Job Description</h4>
            <p className="text-sm text-gray-300 whitespace-pre-line">
              {job.longDescription}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
