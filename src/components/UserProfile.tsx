import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Settings, 
  Trophy, 
  Heart, 
  Target,
  TrendingUp,
  Zap,
  Star,
  Shield,
  Brain,
  Wallet,
  Calendar,
  Award,
  Gift,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  userId?: string;
  onBack?: () => void;
}

export function UserProfile({ userId, onBack }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const user = {
    id: userId || "current-user",
    name: "Alex Thompson",
    username: "@alextech",
    avatar: "/placeholder.svg",
    bio: "Passionate tech enthusiast and startup investor. Love supporting innovative projects that change the world.",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    level: 15,
    xp: 4750,
    nextLevelXp: 5000,
    totalBacked: 47,
    totalCreated: 3,
    totalInvested: 12450,
    successfulInvestments: 38,
    badges: [
      { id: 1, name: "Early Supporter", icon: "🚀", description: "Backed 10+ projects in first month", rarity: "rare" },
      { id: 2, name: "Tech Visionary", icon: "🔮", description: "Invested in 5+ successful tech projects", rarity: "epic" },
      { id: 3, name: "Community Builder", icon: "🏗️", description: "Referred 20+ successful backers", rarity: "legendary" },
      { id: 4, name: "Risk Taker", icon: "🎲", description: "Backed early-stage projects", rarity: "common" },
      { id: 5, name: "Streak Master", icon: "🔥", description: "30-day backing streak", rarity: "rare" }
    ],
    backedProjects: [
      {
        id: "1",
        title: "Revolutionary AR Smart Glasses",
        amount: 299,
        status: "Active",
        image: "/src/assets/campaign-1.jpg",
        progress: 77.5,
        category: "Technology"
      },
      {
        id: "2", 
        title: "Sustainable Urban Garden Kit",
        amount: 89,
        status: "Successful",
        image: "/src/assets/campaign-2.jpg",
        progress: 100,
        category: "Environment"
      },
      {
        id: "3",
        title: "AI-Powered Music Composer",
        amount: 149,
        status: "Active", 
        image: "/src/assets/campaign-3.jpg",
        progress: 72.5,
        category: "Technology"
      }
    ],
    createdProjects: [
      {
        id: "c1",
        title: "Smart Home Hub 2.0",
        raised: 85000,
        goal: 100000,
        backers: 234,
        status: "Active",
        image: "/src/assets/campaign-4.jpg"
      }
    ],
    achievements: [
      { title: "First Investment", date: "March 2023", icon: Target },
      { title: "Tech Specialist", date: "June 2023", icon: Brain },
      { title: "Community Favorite", date: "August 2023", icon: Heart },
      { title: "Trend Spotter", date: "October 2023", icon: TrendingUp }
    ],
    stats: {
      aiScore: 92,
      investmentAccuracy: 87,
      portfolioGrowth: 24,
      riskTolerance: "Medium-High"
    }
  };

  const levelProgress = (user.xp / user.nextLevelXp) * 100;

  const rarityColors = {
    common: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    rare: "bg-blue-500/20 text-blue-400 border-blue-500/30", 
    epic: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    legendary: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-gradient-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                Lv.{user.level}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gradient mb-2">{user.name}</h1>
              <p className="text-lg text-muted-foreground mb-2">{user.username}</p>
              <p className="text-muted-foreground mb-4 max-w-md">{user.bio}</p>
              
              {/* Level Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Level {user.level}</span>
                  <span>{user.xp} / {user.nextLevelXp} XP</span>
                </div>
                <Progress value={levelProgress} className="h-2" />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>📍 {user.location}</span>
                <span>📅 Joined {user.joinDate}</span>
                <span>💰 ${user.totalInvested.toLocaleString()} invested</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="backed">Backed Projects</TabsTrigger>
            <TabsTrigger value="created">Created</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover-lift">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-2xl font-bold">{user.totalBacked}</div>
                      <div className="text-sm text-muted-foreground">Projects Backed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-8 h-8 text-success" />
                    <div>
                      <div className="text-2xl font-bold">{user.successfulInvestments}</div>
                      <div className="text-sm text-muted-foreground">Successful</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-8 h-8 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">{user.stats.aiScore}%</div>
                      <div className="text-sm text-muted-foreground">AI Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-8 h-8 text-warning" />
                    <div>
                      <div className="text-2xl font-bold">{user.badges.length}</div>
                      <div className="text-sm text-muted-foreground">Badges Earned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/20">
                        <Icon className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        </div>
                        <Badge variant="secondary">Achievement</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.backedProjects.map(project => (
                <Card key={project.id} className="hover-lift">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className={cn(
                        "absolute top-4 right-4",
                        project.status === "Successful" ? "bg-success text-white" : "bg-primary text-white"
                      )}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{project.title}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Your backing:</span>
                        <span className="font-medium">${project.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <Badge variant="outline" className="mt-3">{project.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="created" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.createdProjects.map(project => (
                <Card key={project.id} className="hover-lift">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-4">{project.title}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Raised</span>
                        <span className="font-medium">${project.raised.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Goal</span>
                        <span className="font-medium">${project.goal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Backers</span>
                        <span className="font-medium">{project.backers}</span>
                      </div>
                      <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Manage Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.badges.map(badge => (
                <Card 
                  key={badge.id} 
                  className={cn(
                    "hover-lift border-2 transition-all",
                    rarityColors[badge.rarity as keyof typeof rarityColors]
                  )}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-4">{badge.icon}</div>
                    <h3 className="font-semibold mb-2">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                    <Badge variant="outline" className={cn("capitalize", rarityColors[badge.rarity as keyof typeof rarityColors])}>
                      {badge.rarity}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Investment Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-medium text-success">{user.stats.investmentAccuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portfolio Growth</span>
                    <span className="font-medium text-primary">+{user.stats.portfolioGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Tolerance</span>
                    <span className="font-medium">{user.stats.riskTolerance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Compatibility</span>
                    <span className="font-medium text-purple-500">{user.stats.aiScore}%</span>
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
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="font-medium text-primary mb-1">Investment Pattern</p>
                      <p className="text-muted-foreground">You prefer early-stage tech projects with strong teams and clear roadmaps.</p>
                    </div>
                    <div className="p-3 bg-success/5 rounded-lg">
                      <p className="font-medium text-success mb-1">Strength</p>
                      <p className="text-muted-foreground">Excellent at identifying promising technology trends before they go mainstream.</p>
                    </div>
                    <div className="p-3 bg-warning/5 rounded-lg">
                      <p className="font-medium text-warning mb-1">Recommendation</p>
                      <p className="text-muted-foreground">Consider diversifying into sustainable and health tech sectors for better portfolio balance.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}