import React from 'react'

export default function Image({ src, alt, width, height, className = '', priority = false }: { src: string; alt: string; width?: number | string; height?: number | string; className?: string; priority?: boolean; }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      fetchPriority={priority ? 'high' : 'low'}
    />
  )
}
