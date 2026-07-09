'use client'

import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className="w-full h-full relative">
      <Spline
        scene={scene}
        className={className}
      />
    </div>
  )
}
