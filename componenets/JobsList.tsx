"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Job } from "@/types/job";

const JobCard = React.lazy(() => import("./JobCard"));

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs?page=${page}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const newJobs: Job[] = await res.json();

        if (newJobs.length === 0) {
          setHasMore(false);
        } else {
          setJobs((prev) => [...prev, ...newJobs]);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchJobs();
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    const el = loader.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading, hasMore]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold my-4">Job Openings</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <Suspense fallback={<div>Loading job…</div>} key={job.id}>
            <JobCard job={job} />
          </Suspense>
        ))}
      </div>

      {loading && (
        <div className="text-gray-500 my-4">Loading more jobs...</div>
      )}
      {!hasMore && (
        <div className="text-gray-400 my-4">No more jobs to load.</div>
      )}

      <div ref={loader} style={{ height: "1px" }} />
    </div>
  );
}
