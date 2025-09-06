import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  TrendingUp,
  Clock,
  Target,
  Zap,
  Brain,
  X
} from "lucide-react";
import { CampaignCard } from "./CampaignCard";
import { cn } from "@/lib/utils";

interface SearchDiscoveryProps {
  onCampaignSelect?: (campaignId: string) => void;
}

export function SearchDiscovery({ onCampaignSelect }: SearchDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("trending");
  const [category, setCategory] = useState("all");
  const [fundingRange, setFundingRange] = useState([0, 1000000]);
  const [timeRange, setTimeRange] = useState("all");
  const [aiScore, setAiScore] = useState([0]);

  // Mock search results
  const searchResults = [
    {
      id: "1",
      title: "Revolutionary AR Smart Glasses",
      description: "Next-generation augmented reality glasses with AI integration",
      image: "/src/assets/campaign-1.jpg",
      creator: "TechVision Inc.",
      goal: 500000,
      raised: 387500,
      backers: 1247,
      daysLeft: 23,
      category: "Technology",
      trending: true,
      aiScore: 94,
      securityRating: 98,
      mood: "inspiring" as const
    },
    {
      id: "2", 
      title: "Sustainable Urban Garden Kit",
      description: "Complete hydroponic system for apartment living",
      image: "/src/assets/campaign-2.jpg",
      creator: "GreenLife Solutions",
      goal: 75000,
      raised: 52500,
      backers: 342,
      daysLeft: 15,
      category: "Environment",
      trending: false,
      aiScore: 87,
      securityRating: 95,
      mood: "hopeful" as const
    },
    {
      id: "3",
      title: "AI-Powered Music Composer",
      description: "Revolutionary software that creates music with artificial intelligence",
      image: "/src/assets/campaign-3.jpg", 
      creator: "AudioTech Labs",
      goal: 200000,
      raised: 145000,
      backers: 678,
      daysLeft: 31,
      category: "Technology",
      trending: true,
      aiScore: 91,
      securityRating: 92,
      mood: "inspiring" as const
    }
  ];

  const quickFilters = [
    { label: "Trending", value: "trending", icon: TrendingUp },
    { label: "Ending Soon", value: "ending-soon", icon: Clock },
    { label: "Nearly Funded", value: "nearly-funded", icon: Target },
    { label: "AI Recommended", value: "ai-recommended", icon: Brain },
    { label: "Staff Pick", value: "staff-pick", icon: Zap }
  ];

  const categories = [
    "All Categories",
    "Technology", 
    "Design",
    "Games",
    "Film & Video",
    "Music",
    "Art",
    "Food",
    "Fashion",
    "Environment",
    "Health"
  ];

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setCategory("all");
    setFundingRange([0, 1000000]);
    setTimeRange("all");
    setAiScore([0]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search projects, creators, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-secondary/20 border-border/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {quickFilters.map(filter => {
                const Icon = filter.icon;
                const isActive = activeFilters.includes(filter.value);
                return (
                  <Button
                    key={filter.value}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(filter.value)}
                    className={cn(
                      "hover-scale transition-all",
                      isActive && "animate-pulse-glow"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="hover-scale"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-2 justify-center">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {activeFilters.map(filter => (
                  <Badge key={filter} variant="secondary" className="hover-scale">
                    {quickFilters.find(f => f.value === filter)?.label}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => toggleFilter(filter)}
                    />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="border-b border-border/50 bg-secondary/20 animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.toLowerCase().replace(/\s+/g, '-')} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Funding Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Funding Goal: ${fundingRange[0].toLocaleString()} - ${fundingRange[1].toLocaleString()}
                </label>
                <Slider
                  value={fundingRange}
                  onValueChange={setFundingRange}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
              </div>

              {/* Time Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Remaining</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any time</SelectItem>
                    <SelectItem value="week">Less than a week</SelectItem>
                    <SelectItem value="month">Less than a month</SelectItem>
                    <SelectItem value="three-months">Less than 3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* AI Score */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Minimum AI Score: {aiScore[0]}%
                </label>
                <Slider
                  value={aiScore}
                  onValueChange={setAiScore}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Search results for "${searchQuery}"` : "Discover Projects"}
          </h2>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="most-funded">Most Funded</SelectItem>
              <SelectItem value="ai-score">AI Score</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-medium">AI Search Enhancement:</span>
              <span className="text-muted-foreground">
                Found {searchResults.length} projects matching your criteria with 94% relevance
              </span>
            </div>
          </div>
        )}

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map(campaign => (
            <div key={campaign.id} onClick={() => onCampaignSelect?.(campaign.id)}>
              <CampaignCard {...campaign} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="hover-scale">
            <TrendingUp className="w-4 h-4 mr-2" />
            Load More Projects
          </Button>
        </div>

        {/* AI Insights */}
        <Card className="mt-12">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">AI Discovery Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">87%</div>
                <div className="text-muted-foreground">Match accuracy</div>
              </div>
              <div className="text-center p-4 bg-success/5 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">+24%</div>
                <div className="text-muted-foreground">Success rate vs average</div>
              </div>
              <div className="text-center p-4 bg-warning/5 rounded-lg">
                <div className="text-2xl font-bold text-warning mb-1">156</div>
                <div className="text-muted-foreground">Similar projects analyzed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}