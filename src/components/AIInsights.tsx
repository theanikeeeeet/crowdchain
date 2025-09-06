import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb,
  Target,
  Users,
  DollarSign,
  Clock,
  Sparkles,
  BarChart3,
  Zap
} from "lucide-react";

export function AIInsights() {
  const [activeInsight, setActiveInsight] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const insights = [
    {
      type: "success_prediction",
      title: "Success Probability Analysis",
      icon: Brain,
      confidence: 92,
      description: "AI predicts high success rate based on market trends and community engagement",
      details: [
        "Strong social media presence (+15%)",
        "Innovative technology sector (+20%)",
        "Experienced team background (+12%)",
        "Optimal funding goal range (+8%)"
      ],
      color: "success"
    },
    {
      type: "optimization",
      title: "Campaign Optimization Tips",
      icon: Lightbulb,
      confidence: 87,
      description: "Recommended improvements to boost funding potential",
      details: [
        "Add video demonstration (+25% conversion)",
        "Include team member backgrounds",
        "Set milestone-based rewards",
        "Engage with early supporters daily"
      ],
      color: "primary"
    },
    {
      type: "risk_analysis",
      title: "Risk Assessment",
      icon: AlertTriangle,
      confidence: 76,
      description: "Potential challenges and mitigation strategies identified",
      details: [
        "Market competition level: Medium",
        "Technical feasibility: High", 
        "Regulatory considerations: Low risk",
        "Supply chain dependencies: Moderate"
      ],
      color: "warning"
    },
    {
      type: "market_trends",
      title: "Market Intelligence",
      icon: TrendingUp,
      confidence: 94,
      description: "Real-time market analysis and trending patterns",
      details: [
        "Green tech sector growing 23% YoY",
        "AI-powered solutions in high demand",
        "Sustainability focus increasing funding",
        "Similar projects 67% success rate"
      ],
      color: "secondary"
    }
  ];

  // Rotate insights automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight(prev => (prev + 1) % insights.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const generateNewInsight = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const currentInsight = insights[activeInsight];
  const IconComponent = currentInsight.icon;

  return (
    <section className="py-16 bg-gradient-to-b from-muted/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-primary text-white animate-glow">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Insights
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Smart Campaign Intelligence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI analyzes thousands of data points to provide real-time insights, 
            predictions, and optimization recommendations for every campaign.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Insight Display */}
          <div className="lg:col-span-2">
            <Card className="glass p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-${currentInsight.color} rounded-lg flex items-center justify-center animate-pulse-glow`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {currentInsight.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentInsight.description}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-gradient">
                    {currentInsight.confidence}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Confidence
                  </div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">AI Confidence Level</span>
                  <span className="text-sm font-medium">{currentInsight.confidence}%</span>
                </div>
                <Progress 
                  value={currentInsight.confidence} 
                  className="h-3 bg-muted/30"
                />
              </div>

              {/* Insight Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Key Insights & Recommendations
                </h4>
                {currentInsight.details.map((detail, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-3 glass rounded-lg animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Button 
                  variant="hero" 
                  onClick={generateNewInsight}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Generating New Insights...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Fresh Analysis
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Insight Navigation & Stats */}
          <div className="space-y-6">
            {/* Insight Selector */}
            <Card className="glass p-6">
              <h4 className="text-lg font-semibold mb-4 text-foreground">
                Available Insights
              </h4>
              <div className="space-y-3">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveInsight(index)}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        activeInsight === index 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${
                          activeInsight === index ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <div>
                          <div className={`font-medium ${
                            activeInsight === index ? 'text-primary' : 'text-foreground'
                          }`}>
                            {insight.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {insight.confidence}% confidence
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Real-time Stats */}
            <Card className="glass p-6">
              <h4 className="text-lg font-semibold mb-4 text-foreground">
                Live Analytics
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Processing Power</span>
                  </div>
                  <span className="text-sm font-medium">94.2%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Data Points</span>
                  </div>
                  <span className="text-sm font-medium">847,293</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-success" />
                    <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                  </div>
                  <span className="text-sm font-medium">98.7%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-sm text-muted-foreground">Response Time</span>
                  </div>
                  <span className="text-sm font-medium">0.3s</span>
                </div>
              </div>
            </Card>

            {/* AI Status */}
            <Card className="glass p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium text-success">AI System Online</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Neural networks are actively monitoring market trends, 
                user behavior, and campaign performance to provide 
                real-time insights.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}