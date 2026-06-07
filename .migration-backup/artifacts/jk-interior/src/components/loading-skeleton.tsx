export function GallerySkeleton() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`bg-gray-200 rounded-xl animate-pulse ${
                i === 0 ? "col-span-2 aspect-video" : "aspect-square"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialSkeleton() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-xl animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQSkeleton() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyUsSkeleton() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
