import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Upload,
  Brain,
  Target,
  Calendar,
  DollarSign,
  Users,
  Lightbulb,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Zap,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateCampaignProps {
  onBack: () => void;
}

export function CreateCampaign({ onBack }: CreateCampaignProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    fundingGoal: "",
    duration: "",
    image: null as File | null,
    rewards: [] as any[]
  });

  const [aiAnalysis, setAiAnalysis] = useState({
    titleScore: 0,
    marketViability: 0,
    fundingProbability: 0,
    suggestions: [] as string[]
  });

  // Mock AI analysis based on form data
  const runAiAnalysis = () => {
    const titleScore = formData.title.length > 10 ? 85 : 60;
    const marketViability = formData.category ? 78 : 45;
    const fundingProbability = formData.fundingGoal && formData.title ? 82 : 50;
    
    const suggestions = [];
    if (formData.title.length < 10) suggestions.push("Consider a more descriptive title");
    if (!formData.category) suggestions.push("Select a category to improve discoverability");
    if (formData.description.length < 100) suggestions.push("Add more details to your description");
    
    setAiAnalysis({
      titleScore,
      marketViability,
      fundingProbability,
      suggestions
    });
  };

  const steps = [
    { number: 1, title: "Basic Info", description: "Project details and description" },
    { number: 2, title: "Funding", description: "Goals and timeline" },
    { number: 3, title: "Rewards", description: "Backer incentives" },
    { number: 4, title: "Launch", description: "Review and publish" }
  ];

  const categories = [
    "Technology", "Design", "Games", "Film & Video", "Music", 
    "Art", "Food", "Fashion", "Environment", "Health"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Trigger AI analysis on changes
    setTimeout(runAiAnalysis, 500);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="hover-scale">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gradient">Create Campaign</h1>
            <div className="w-24" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map(step => (
                  <div 
                    key={step.number}
                    className={cn(
                      "flex items-start space-x-3 p-3 rounded-lg transition-all cursor-pointer",
                      currentStep === step.number ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/20",
                      currentStep > step.number && "bg-success/10 border border-success/20"
                    )}
                    onClick={() => setCurrentStep(step.number)}
                  >
                    <div className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                      currentStep === step.number ? "bg-primary text-white" : 
                      currentStep > step.number ? "bg-success text-white" : "bg-muted text-muted-foreground"
                    )}>
                      {currentStep > step.number ? <CheckCircle className="w-4 h-4" /> : step.number}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}

                {/* AI Analysis Panel */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">AI Analysis</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Title Score</span>
                        <span className="font-medium">{aiAnalysis.titleScore}%</span>
                      </div>
                      <Progress value={aiAnalysis.titleScore} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Market Viability</span>
                        <span className="font-medium">{aiAnalysis.marketViability}%</span>
                      </div>
                      <Progress value={aiAnalysis.marketViability} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Success Probability</span>
                        <span className="font-medium">{aiAnalysis.fundingProbability}%</span>
                      </div>
                      <Progress value={aiAnalysis.fundingProbability} className="h-1" />
                    </div>
                  </div>
                  
                  {aiAnalysis.suggestions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-primary/20">
                      <h5 className="text-xs font-medium mb-2">AI Suggestions:</h5>
                      {aiAnalysis.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-1 text-xs text-muted-foreground mb-1">
                          <Lightbulb className="w-3 h-3 text-warning mt-0.5" />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Tell us about your project</h2>
                      <p className="text-muted-foreground">Start with the basics - what are you creating?</p>
                    </div>

                    {/* Project Title */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Project Title *</label>
                      <Input
                        placeholder="Enter your project title..."
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="text-lg"
                      />
                      <p className="text-xs text-muted-foreground">
                        A clear, compelling title helps backers understand your project instantly
                      </p>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category *</label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Project Description *</label>
                      <Textarea
                        placeholder="Describe your project in detail..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={6}
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.description.length}/500 characters - Tell your story and explain why it matters
                      </p>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Project Image</label>
                      <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Funding */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Set your funding goal</h2>
                      <p className="text-muted-foreground">How much do you need to bring your project to life?</p>
                    </div>

                    {/* Funding Goal */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Funding Goal (USD) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="50000"
                          value={formData.fundingGoal}
                          onChange={(e) => handleInputChange("fundingGoal", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Set a realistic goal based on your project needs
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Campaign Duration *</label>
                      <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="45">45 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Most successful campaigns run for 30-60 days
                      </p>
                    </div>

                    {/* AI Funding Insights */}
                    <Card className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                          AI Funding Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span>Optimal goal range for {formData.category}: $25,000 - $100,000</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-success" />
                          <span>Recommended duration: 45 days for maximum engagement</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-warning" />
                          <span>Expected backers: 150-300 based on similar projects</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Step 3: Rewards */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Create reward tiers</h2>
                      <p className="text-muted-foreground">Offer compelling rewards to motivate backers</p>
                    </div>

                    {/* Reward Templates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                        <CardContent className="pt-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="w-4 h-4 text-warning" />
                            <span className="font-medium">Early Bird Special</span>
                          </div>
                          <p className="text-sm text-muted-foreground">$25 - Digital rewards + updates</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                        <CardContent className="pt-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="font-medium">Product Bundle</span>
                          </div>
                          <p className="text-sm text-muted-foreground">$99 - Full product + extras</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Button variant="outline" className="w-full">
                      + Add Custom Reward Tier
                    </Button>
                  </div>
                )}

                {/* Step 4: Launch */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Ready to launch?</h2>
                      <p className="text-muted-foreground">Review your campaign and publish when ready</p>
                    </div>

                    {/* Campaign Preview */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{formData.title || "Your Project Title"}</CardTitle>
                        <Badge variant="outline">{formData.category || "Category"}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {formData.description || "Your project description will appear here..."}
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-xl font-bold text-gradient">
                              ${formData.fundingGoal || "0"}
                            </div>
                            <div className="text-sm text-muted-foreground">goal</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold">0</div>
                            <div className="text-sm text-muted-foreground">backers</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold">
                              {formData.duration || "30"}
                            </div>
                            <div className="text-sm text-muted-foreground">days</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Final AI Check */}
                    <Card className="border-success/50 bg-success/5">
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Shield className="w-5 h-5 text-success" />
                          <span className="font-medium text-success">AI Validation Complete</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-lg font-bold text-success">94%</div>
                            <div className="text-muted-foreground">Success Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">High</div>
                            <div className="text-muted-foreground">Market Demand</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-warning">Low</div>
                            <div className="text-muted-foreground">Risk Level</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button onClick={nextStep}>
                      Next Step
                    </Button>
                  ) : (
                    <Button className="bg-gradient-primary text-white">
                      <Zap className="w-4 h-4 mr-2" />
                      Launch Campaign
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}