import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: string;
  goal: number;
  raised: number;
  backers: number;
  daysLeft: number;
  category: string;
  trending?: boolean;
  aiScore?: number;
  securityRating?: number;
  mood?: "hopeful" | "urgent" | "inspiring";
}

export function CampaignCard({
  id,
  title,
  description,
  image,
  creator,
  goal,
  raised,
  backers,
  daysLeft,
  category,
  trending = false,
  aiScore = 85,
  securityRating = 95,
  mood = "hopeful"
}: CampaignCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [liveRaised, setLiveRaised] = useState(raised);
  const [liveBacker, setLiveBacker] = useState(backers);
  
  const progressPercentage = (liveRaised / goal) * 100;
  
  // Mock real-time funding updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance every second
        const increment = Math.floor(Math.random() * 500) + 50;
        setLiveRaised(prev => prev + increment);
        setLiveBacker(prev => prev + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const moodColors = {
    hopeful: "border-warning/50 bg-warning/5",
    urgent: "border-destructive/50 bg-destructive/5", 
    inspiring: "border-primary/50 bg-primary/5"
  };

  const moodEmojis = {
    hopeful: "🌟",
    urgent: "⚡",
    inspiring: "✨"
  };

  return (
    <div className={cn(
      "group relative bg-gradient-card border border-border/50 rounded-xl overflow-hidden hover-lift hover-glow transition-all duration-500",
      moodColors[mood]
    )}>
      {/* Trending Badge */}
      {trending && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-primary text-white animate-pulse-glow">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        </div>
      )}

      {/* AI Score */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <div className="glass px-2 py-1 rounded-lg flex items-center space-x-1">
          <Brain className="w-3 h-3 text-primary" />
          <span className="text-xs text-primary font-medium">{aiScore}%</span>
        </div>
        <div className="glass px-2 py-1 rounded-lg flex items-center space-x-1">
          <Shield className="w-3 h-3 text-success" />
          <span className="text-xs text-success font-medium">{securityRating}%</span>
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-primary rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Mood Indicator */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="glass">
            {moodEmojis[mood]} {mood}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <Badge variant="outline" className="mb-3">
          {category}
        </Badge>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-foreground group-hover:text-gradient transition-all">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Creator */}
        <p className="text-xs text-muted-foreground mb-4">
          by <span className="text-primary font-medium">{creator}</span>
        </p>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-muted/30"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="text-center">
            <div className="text-xl font-bold text-gradient">
              ${liveRaised.toLocaleString()}
            </div>
            <div className="text-muted-foreground">raised</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold flex items-center justify-center">
              <Users className="w-4 h-4 mr-1" />
              {liveBacker}
            </div>
            <div className="text-muted-foreground">backers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold flex items-center justify-center">
              <Clock className="w-4 h-4 mr-1" />
              {daysLeft}
            </div>
            <div className="text-muted-foreground">days left</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button className="flex-1" variant="default">
            <Zap className="w-4 h-4 mr-2" />
            Back This Project
          </Button>
          
          <Button
            variant="glassmorphism"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "transition-all duration-300",
              isLiked && "text-destructive scale-110"
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          </Button>
          
          <Button variant="glassmorphism" size="icon">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}