import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CampaignGrid } from "@/components/CampaignGrid";
import { AIInsights } from "@/components/AIInsights";
import { CampaignDetails } from "@/components/CampaignDetails";
import { SearchDiscovery } from "@/components/SearchDiscovery";
import { UserProfile } from "@/components/UserProfile";
import { CreateCampaign } from "@/components/CreateCampaign";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "campaign" | "search" | "profile" | "create">("home");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setCurrentView("campaign");
  };

  const handleNavigation = (view: "home" | "search" | "profile" | "create") => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView("home");
    setSelectedCampaignId(null);
  };

  if (currentView === "campaign" && selectedCampaignId) {
    return <CampaignDetails campaignId={selectedCampaignId} onBack={handleBack} />;
  }

  if (currentView === "search") {
    return <SearchDiscovery onCampaignSelect={handleCampaignSelect} />;
  }

  if (currentView === "profile") {
    return <UserProfile onBack={handleBack} />;
  }

  if (currentView === "create") {
    return <CreateCampaign onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigation} />
      <main>
        <HeroSection onNavigate={handleNavigation} />
        <CampaignGrid onCampaignSelect={handleCampaignSelect} />
        <AIInsights />
      </main>
    </div>
  );
};

export default Index;