"use client"

import { motion } from "framer-motion"

const ProjectSkeleton = () => {
  return (
    <div className="mb-12">
      {/* Large main project skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative aspect-square overflow-hidden mb-4 rounded-xl bg-gray-800/10"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/5 to-transparent animate-pulse" />

        {/* Content skeleton */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div>
            {/* Title skeleton */}
            <div className="h-8 md:h-10 lg:h-12 bg-gray-700/10 rounded-lg mb-3 w-3/4 animate-pulse transition-opacity duration-500" />
            {/* Subtitle skeleton */}
            <div className="h-5 bg-gray-700/8 rounded-lg w-1/2 animate-pulse transition-opacity duration-500" />
          </div>

          <div className="flex justify-between items-end">
            {/* Category skeleton */}
            <div className="h-4 bg-gray-700/8 rounded w-24 animate-pulse transition-opacity duration-500" />
            {/* Button skeleton */}
            <div className="w-14 h-14 bg-gray-700/10 rounded-lg animate-pulse transition-opacity duration-500" />
          </div>
        </div>
      </motion.div>

      {/* Three small skeleton squares */}
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeInOut" }}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-800/10"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/5 to-transparent animate-pulse" />

            {/* Button skeleton */}
            <div className="absolute bottom-4 right-4">
              <div className="w-8 h-8 bg-gray-700/10 rounded-md animate-pulse transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const ImageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Show 4 skeleton projects */}
      {[0, 1, 2, 3].map((index) => (
        <ProjectSkeleton key={index} />
      ))}
    </div>
  )
}

export default ImageSkeleton
