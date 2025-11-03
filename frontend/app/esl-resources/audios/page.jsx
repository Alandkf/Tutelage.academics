import CallToAction from "@/components/CallToAction"
import AudioLibraryDescription from "@/components/esl-resources/audios/AudioLibraryDescription"
import AudioLibraryHero from "@/components/esl-resources/audios/AudioLibraryHero"



const Page = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
        <AudioLibraryHero />
        <AudioLibraryDescription />
        {/* <AudioGrid /> */}
        <CallToAction />
    </div>
  )
}

export default Page