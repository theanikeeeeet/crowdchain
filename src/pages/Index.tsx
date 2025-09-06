import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CampaignGrid } from "@/components/CampaignGrid";
import { AIInsights } from "@/components/AIInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CampaignGrid />
        <AIInsights />
      </main>
    </div>
  );
};

export default Index;