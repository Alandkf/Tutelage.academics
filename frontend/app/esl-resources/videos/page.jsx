import CallToAction from "@/components/CallToAction"
import VideoGrid from "@/components/esl-resources/videos/VideoGrid"
import VideoLibraryDescription from "@/components/esl-resources/videos/VideoLibraryDescription"
import VideoLibraryHero from "@/components/esl-resources/videos/VodeoLibraryHero"


const Videos = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
        <VideoLibraryHero />
        <VideoLibraryDescription />
        <VideoGrid />
        <CallToAction />
    </div>
  )
}

export default Videos