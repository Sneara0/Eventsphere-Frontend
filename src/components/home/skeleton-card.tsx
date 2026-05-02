"use client"
import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="flex flex-col h-[500px] w-full bg-zinc-100/50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800/50 overflow-hidden relative group">
      
      {/* ১. Image Placeholder with Shimmer */}
      <div className="relative h-60 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer" />
      </div>

      {/* ২. Content Area */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        
        {/* Location Tag */}
        <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          <div className="h-6 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-2 py-2">
          <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
        </div>

        {/* Meta Info (Price/Date) */}
        <div className="mt-auto pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-2 w-10 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded relative overflow-hidden">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
          </div>
          <div className="space-y-2 text-right">
            <div className="h-2 w-10 ml-auto bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded relative overflow-hidden">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Button Placeholder */}
        <div className="h-14 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard