import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Users, 
  DollarSign, 
  Globe, 
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Brain,
  Target
} from "lucide-react";

interface HeroSectionProps {
  onNavigate?: (view: "home" | "search" | "profile" | "create") => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [stats, setStats] = useState({
    totalFunded: 47283649,
    totalProjects: 15847,
    totalBackers: 284759,
    successRate: 72
  });

  const [currentStat, setCurrentStat] = useState(0);

  // Animate stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalFunded: prev.totalFunded + Math.floor(Math.random() * 1000) + 100,
        totalProjects: prev.totalProjects + (Math.random() > 0.9 ? 1 : 0),
        totalBackers: prev.totalBackers + Math.floor(Math.random() * 10) + 1,
        successRate: prev.successRate + (Math.random() > 0.95 ? 0.1 : 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Rotate featured stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get real-time success predictions and optimization tips"
    },
    {
      icon: Shield,
      title: "Multi-Chain Security",
      description: "Audited smart contracts across Ethereum, Polygon & Solana"
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "DAO voting and quadratic funding for fair project selection"
    },
    {
      icon: Sparkles,
      title: "Gamified Experience",
      description: "Earn XP, unlock badges, and climb the leaderboards"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 animate-slide-up">
            <Badge className="mb-4 bg-gradient-primary text-white animate-glow">
              <Rocket className="w-4 h-4 mr-2" />
              The Future of Crowdfunding is Here
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">CrowdChain</span>
              <br />
              <span className="text-foreground">Web3 Crowdfunding</span>
              <br />
              <span className="text-muted-foreground text-3xl md:text-4xl">
                Powered by AI & Community
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Launch your next big idea with multi-chain support, AI insights, 
              and gamified community backing. Join the revolution of decentralized innovation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 animate-scale-in">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              Start Your Campaign
            </Button>
            
            <Button variant="glassmorphism" size="lg" className="text-lg px-8 py-6">
              <Globe className="w-5 h-5 mr-2" />
              Explore Projects
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="glass p-6 rounded-xl hover-lift group">
              <div className="text-3xl font-bold text-gradient mb-2">
                ${(stats.totalFunded / 1000000).toFixed(1)}M
              </div>
              <div className="text-muted-foreground text-sm">Total Funded</div>
              <div className="w-full h-1 bg-muted/30 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-primary animate-shimmer" />
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl hover-lift group">
              <div className="text-3xl font-bold text-gradient mb-2">
                {stats.totalProjects.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-sm">Projects Launched</div>
              <div className="w-full h-1 bg-muted/30 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-secondary animate-shimmer" />
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl hover-lift group">
              <div className="text-3xl font-bold text-gradient mb-2">
                {stats.totalBackers.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-sm">Active Backers</div>
              <div className="w-full h-1 bg-muted/30 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-success animate-shimmer" />
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl hover-lift group">
              <div className="text-3xl font-bold text-gradient mb-2">
                {stats.successRate.toFixed(1)}%
              </div>
              <div className="text-muted-foreground text-sm">Success Rate</div>
              <div className="w-full h-1 bg-muted/30 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-primary animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass p-6 rounded-xl hover-lift group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-all">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-8 left-8 animate-float">
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Live funding updates
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 right-8 animate-float" style={{ animationDelay: "1s" }}>
        <div className="glass p-3 rounded-lg">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
      </div>
    </section>
  );
}