import { useState, useEffect } from "react";
import { CampaignCard } from "./CampaignCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import campaign1 from "@/assets/campaign-1.jpg";
import campaign2 from "@/assets/campaign-2.jpg";
import campaign3 from "@/assets/campaign-3.jpg";
import campaign4 from "@/assets/campaign-4.jpg";
import campaign5 from "@/assets/campaign-5.jpg";
import campaign6 from "@/assets/campaign-6.jpg";
import { 
  Filter, 
  SortDesc, 
  TrendingUp, 
  Clock, 
  Target,
  Sparkles,
  Brain,
  RefreshCw
} from "lucide-react";

export function CampaignGrid() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("trending");
  const [campaigns, setCampaigns] = useState([
    {
      id: "1",
      title: "Revolutionary Solar-Powered Vertical Farm",
      description: "Bringing sustainable agriculture to urban environments with cutting-edge vertical farming technology powered entirely by renewable energy.",
      image: campaign1,
      creator: "EcoTech Innovations",
      goal: 250000,
      raised: 187650,
      backers: 1247,
      daysLeft: 15,
      category: "Technology",
      trending: true,
      aiScore: 92,
      securityRating: 98,
      mood: "inspiring" as const
    },
    {
      id: "2", 
      title: "Open Source AI Education Platform",
      description: "Making AI education accessible to everyone with an open-source platform featuring interactive learning modules and real-world projects.",
      image: campaign2,
      creator: "AI4All Foundation",
      goal: 150000,
      raised: 124300,
      backers: 856,
      daysLeft: 8,
      category: "Education",
      trending: true,
      aiScore: 88,
      securityRating: 95,
      mood: "hopeful" as const
    },
    {
      id: "3",
      title: "Community-Driven Music NFT Marketplace",
      description: "Empowering independent musicians with a decentralized marketplace for music NFTs, featuring royalty sharing and fan governance.",
      image: campaign3,
      creator: "SoundChain Labs",
      goal: 500000,
      raised: 342850,
      backers: 2103,
      daysLeft: 22,
      category: "Music",
      trending: false,
      aiScore: 85,
      securityRating: 93,
      mood: "inspiring" as const
    },
    {
      id: "4",
      title: "Smart Water Purification for Remote Communities",
      description: "Solar-powered water purification systems with IoT monitoring for remote communities lacking access to clean water.",
      image: campaign4,
      creator: "CleanWater Global",
      goal: 300000,
      raised: 98750,
      backers: 542,
      daysLeft: 5,
      category: "Health",
      trending: false,
      aiScore: 76,
      securityRating: 89,
      mood: "urgent" as const
    },
    {
      id: "5",
      title: "Biodegradable Packaging Revolution",
      description: "Revolutionary packaging made from mycelium and agricultural waste, offering a sustainable alternative to plastic packaging.",
      image: campaign5,
      creator: "GreenPack Industries",
      goal: 400000,
      raised: 289400,
      backers: 1678,
      daysLeft: 12,
      category: "Environment",
      trending: true,
      aiScore: 90,
      securityRating: 96,
      mood: "hopeful" as const
    },
    {
      id: "6",
      title: "Decentralized Healthcare Records System",
      description: "Secure, patient-controlled health records on blockchain with AI-powered health insights and predictive analytics.",
      image: campaign6,
      creator: "HealthChain Solutions",
      goal: 750000,
      raised: 456780,
      backers: 3241,
      daysLeft: 18,
      category: "Healthcare",
      trending: true,
      aiScore: 94,
      securityRating: 99,
      mood: "inspiring" as const
    }
  ]);

  const categories = ["all", "Technology", "Education", "Music", "Health", "Environment", "Healthcare"];
  const sortOptions = [
    { value: "trending", label: "Trending", icon: TrendingUp },
    { value: "ending", label: "Ending Soon", icon: Clock },
    { value: "funded", label: "Most Funded", icon: Target },
    { value: "ai", label: "AI Score", icon: Brain }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        raised: campaign.raised + Math.floor(Math.random() * 200) + 50,
        backers: campaign.backers + (Math.random() > 0.7 ? 1 : 0)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredCampaigns = campaigns
    .filter(campaign => filter === "all" || campaign.category === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case "trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.aiScore - a.aiScore;
        case "ending":
          return a.daysLeft - b.daysLeft;
        case "funded":
          return b.raised - a.raised;
        case "ai":
          return b.aiScore - a.aiScore;
        default:
          return 0;
      }
    });

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-secondary text-secondary-foreground">
            <Sparkles className="w-4 h-4 mr-2" />
            Discover Amazing Projects
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Trending Campaigns
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore innovative projects powered by our community. 
            Each campaign is AI-scored for success probability and security audited.
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
          {/* Categories */}
          <div className="flex flex-wrap items-center space-x-2">
            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "glassmorphism"}
                size="sm"
                onClick={() => setFilter(category)}
                className="mb-2"
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <SortDesc className="w-5 h-5 text-muted-foreground" />
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? "default" : "glassmorphism"}
                size="sm"
                onClick={() => setSortBy(option.value)}
                className="flex items-center space-x-1"
              >
                <option.icon className="w-4 h-4" />
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Live Stats Bar */}
        <div className="glass p-4 rounded-xl mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                {filteredCampaigns.length} active campaigns
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <Button variant="glassmorphism" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign, index) => (
            <div 
              key={campaign.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CampaignCard {...campaign} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            <TrendingUp className="w-5 h-5 mr-2" />
            Load More Campaigns
          </Button>
        </div>
      </div>
    </section>
  );
}