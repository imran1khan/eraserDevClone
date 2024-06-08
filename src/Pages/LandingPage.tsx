import Footer from "../components/Footer"
import LandingPageHeader from "../components/LandingPageHeader"
import Main from "../components/LandingMain"

function LandingPage() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-neutral-900 via-gray-900 to-neutral-900 text-white">
      <LandingPageHeader />
      <Main />
      <Footer />
    </div>
  )
}

export default LandingPage
