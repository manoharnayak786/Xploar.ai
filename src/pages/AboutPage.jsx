import useAos from "../hooks/useAos";
import AboutHero from "../components/about/AboutHero";
import MissionVision from "../components/about/MissionVision";
import CoreValues from "../components/about/CoreValues";
import Founders from "../components/about/Founders";
import CtaSection from "../components/home/CtaSection"; // Reusing CTA
import AboutPageSEO from "../components/seo/AboutPageSEO";
import VoiceDashboard from "../components/common/VoiceDashboard";

const AboutPage = ({ onOpenModal }) => {
  useAos();

  return (
    <>
      <AboutPageSEO />
      <AboutHero />
      <MissionVision />
      <CoreValues />
      <Founders />
      
      {/* Voice Interaction Dashboard */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <VoiceDashboard />
        </div>
      </section>
      
      <CtaSection onOpenModal={onOpenModal} />
    </>
  );
};

export default AboutPage;
