// Add a real YouTube/Instagram Reel video ID here once JK Interior records a client
// video testimonial, and the card will automatically switch from "coming soon" to
// a playable embed. No fabricated video content is shown until then.
export interface VideoTestimonial {
  customerName: string
  location: string
  service: string
  youtubeId?: string
}

export const videoTestimonials: VideoTestimonial[] = [
  { customerName: "Rahul Kumar", location: "Forbesganj", service: "PVC False Ceiling" },
  { customerName: "Priya Sharma", location: "Araria", service: "Gypsum Ceiling" },
  { customerName: "Deepak Gupta", location: "Purnia", service: "Complete Interior" },
]
