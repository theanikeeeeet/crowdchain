import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  Share2, 
  Clock, 
  Users, 
  Target,
  TrendingUp,
  Zap,
  Star,
  Shield,
  Brain,
  MessageCircle,
  Flag,
  ArrowLeft,
  CheckCircle,
  PlayCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignDetailsProps {
  campaignId: string;
  onBack: () => void;
}

export function CampaignDetails({ campaignId, onBack }: CampaignDetailsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [backingAmount, setBackingAmount] = useState(50);

  // Mock campaign data - would come from API
  const campaign = {
    id: campaignId,
    title: "Revolutionary AR Smart Glasses",
    description: "Next-generation augmented reality glasses that seamlessly blend digital and physical worlds.",
    fullDescription: "Our AR Smart Glasses represent a breakthrough in wearable technology, featuring ultra-lightweight design, 8-hour battery life, and industry-leading display clarity. Built with cutting-edge AI processing and computer vision capabilities.",
    image: "/src/assets/campaign-1.jpg",
    creator: {
      name: "TechVision Inc.",
      avatar: "/placeholder.svg",
      bio: "Leading innovator in AR/VR technology with 15+ years experience",
      followers: 2450,
      projectsLaunched: 3,
      successRate: 95
    },
    goal: 500000,
    raised: 387500,
    backers: 1247,
    daysLeft: 23,
    category: "Technology",
    trending: true,
    aiScore: 94,
    securityRating: 98,
    mood: "inspiring" as const,
    updates: [
      { id: 1, title: "Prototype Testing Complete", date: "2024-01-15", content: "We've successfully completed all prototype testing phases..." },
      { id: 2, title: "Manufacturing Partner Confirmed", date: "2024-01-10", content: "Excited to announce our partnership with leading manufacturer..." }
    ],
    rewards: [
      { id: 1, amount: 25, title: "Early Bird Digital Access", description: "Digital companion app + exclusive updates", estimated: "March 2024", backers: 156 },
      { id: 2, amount: 299, title: "Single AR Glasses", description: "One pair of AR Smart Glasses + app access", estimated: "June 2024", backers: 423 },
      { id: 3, amount: 549, title: "Dual Pack + Accessories", description: "Two pairs + charging case + premium support", estimated: "June 2024", backers: 89 },
      { id: 4, amount: 1299, title: "Developer Edition", description: "Early access + SDK + developer support", estimated: "May 2024", backers: 34 }
    ],
    milestones: [
      { title: "Funding Goal Reached", target: 500000, completed: false },
      { title: "Prototype Complete", target: 200000, completed: true },
      { title: "Manufacturing Ready", target: 350000, completed: true }
    ]
  };

  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="hover-scale">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="glassmorphism" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="glassmorphism" size="sm">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image & Video */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-card border border-border/50">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button size="lg" className="glass">
                  <PlayCircle className="w-6 h-6 mr-2" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <div className="glass px-3 py-2 rounded-lg flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{campaign.aiScore}%</span>
                </div>
                <div className="glass px-3 py-2 rounded-lg flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">{campaign.securityRating}%</span>
                </div>
              </div>

              {campaign.trending && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-primary text-white animate-pulse-glow">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                </div>
              )}
            </div>

            {/* Campaign Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">{campaign.category}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn("hover-scale", isLiked && "text-destructive")}
                >
                  <Heart className={cn("w-4 h-4 mr-2", isLiked && "fill-current")} />
                  {isLiked ? "Liked" : "Like"}
                </Button>
              </div>

              <h1 className="text-3xl font-bold text-gradient mb-4">{campaign.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{campaign.description}</p>

              {/* Creator Info */}
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/20 border border-border/50">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={campaign.creator.avatar} alt={campaign.creator.name} />
                  <AvatarFallback>{campaign.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{campaign.creator.name}</h4>
                  <p className="text-sm text-muted-foreground">{campaign.creator.bio}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>{campaign.creator.followers} followers</span>
                    <span>{campaign.creator.projectsLaunched} projects</span>
                    <span>{campaign.creator.successRate}% success rate</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">Follow</Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">About this project</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {campaign.fullDescription}
                    </p>
                    
                    {/* Milestones */}
                    <h4 className="text-lg font-semibold mb-4">Project Milestones</h4>
                    <div className="space-y-3">
                      {campaign.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle 
                            className={cn("w-5 h-5", 
                              milestone.completed ? "text-success" : "text-muted-foreground"
                            )} 
                          />
                          <span className={cn(
                            milestone.completed ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {milestone.title} - ${milestone.target.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="mt-6">
                <div className="space-y-4">
                  {campaign.updates.map(update => (
                    <Card key={update.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{update.title}</CardTitle>
                          <span className="text-sm text-muted-foreground">{update.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">Join the conversation</span>
                    </div>
                    <p className="text-muted-foreground text-center py-8">
                      Comments section coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards" className="mt-6">
                <div className="grid gap-4">
                  {campaign.rewards.map(reward => (
                    <Card 
                      key={reward.id}
                      className={cn(
                        "cursor-pointer transition-all hover-lift",
                        selectedReward === reward.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedReward(reward.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">${reward.amount}</h4>
                            <h5 className="text-primary font-medium">{reward.title}</h5>
                          </div>
                          <Badge variant="secondary">{reward.backers} backers</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{reward.description}</p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>Estimated delivery: {reward.estimated}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gradient">
                        ${campaign.raised.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">raised</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        ${campaign.goal.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">goal</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold flex items-center justify-center">
                        <Users className="w-5 h-5 mr-1" />
                        {campaign.backers}
                      </div>
                      <div className="text-sm text-muted-foreground">backers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold flex items-center justify-center">
                        <Clock className="w-5 h-5 mr-1" />
                        {campaign.daysLeft}
                      </div>
                      <div className="text-sm text-muted-foreground">days left</div>
                    </div>
                  </div>

                  {/* Backing Amount */}
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <label className="text-sm font-medium">Back this project</label>
                    <div className="flex space-x-2">
                      <Button
                        variant={backingAmount === 25 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBackingAmount(25)}
                      >
                        $25
                      </Button>
                      <Button
                        variant={backingAmount === 50 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBackingAmount(50)}
                      >
                        $50
                      </Button>
                      <Button
                        variant={backingAmount === 100 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBackingAmount(100)}
                      >
                        $100
                      </Button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full" size="lg">
                    <Zap className="w-4 h-4 mr-2" />
                    Back for ${backingAmount}
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    You will be charged only if the project reaches its funding goal
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Success Probability</span>
                    <span className="text-sm font-medium text-success">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Market Demand</span>
                    <span className="text-sm font-medium text-primary">Very High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Risk Level</span>
                    <span className="text-sm font-medium text-warning">Low-Medium</span>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      AI recommends backing this project based on strong market indicators and creator track record.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}