import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Search, 
  Bell, 
  User, 
  Zap, 
  TrendingUp,
  Shield,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onNavigate?: (view: "home" | "search" | "profile" | "create") => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [userLevel] = useState(7);
  const [userXP] = useState(2450);

  return (
    <nav className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">CrowdChain</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            <button onClick={() => onNavigate?.("search")} className="text-muted-foreground hover:text-foreground transition-colors">
              Discover
            </button>
            <button onClick={() => onNavigate?.("create")} className="text-muted-foreground hover:text-foreground transition-colors">
              Start Project
            </button>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search campaigns, creators..."
              className="w-full h-10 pl-10 pr-4 bg-card/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Badge variant="secondary" className="text-xs">
                AI ✨
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* User Level & XP */}
          {isConnected && (
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-1 glass px-3 py-1 rounded-lg">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Level {userLevel}</span>
                <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-300"
                    style={{ width: `${(userXP % 1000) / 10}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          <Button variant="glassmorphism" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
          </Button>

          {/* Security Status */}
          <div className="hidden md:flex items-center space-x-1 glass px-2 py-1 rounded-lg">
            <Shield className="w-4 h-4 text-success animate-pulse" />
            <span className="text-xs text-success font-medium">Secure</span>
          </div>

          {/* Wallet Connection */}
          <Button
            variant={isConnected ? "success" : "hero"}
            onClick={() => setIsConnected(!isConnected)}
            className={cn(
              "relative overflow-hidden",
              isConnected && "animate-glow"
            )}
          >
            <Wallet className="w-4 h-4" />
            {isConnected ? (
              <span>0x7a2f...9b1e</span>
            ) : (
              <span>Connect Wallet</span>
            )}
            {isConnected && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
            )}
          </Button>

          {/* User Profile */}
          {isConnected && (
            <Button variant="glassmorphism" size="icon" onClick={() => onNavigate?.("profile")}>
              <User className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}