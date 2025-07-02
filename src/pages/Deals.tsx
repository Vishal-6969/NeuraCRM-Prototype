import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Plus,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";

export default function Deals() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deals</h1>
          <p className="text-muted-foreground mt-1">
            Track your sales pipeline and close more deals faster.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Opportunity
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Pipeline Value",
            value: "$1,247,890",
            change: "+15.2%",
            icon: DollarSign,
          },
          {
            title: "Active Deals",
            value: "127",
            change: "+8.1%",
            icon: Target,
          },
          {
            title: "Won This Month",
            value: "23",
            change: "+12.3%",
            icon: TrendingUp,
          },
          {
            title: "Avg. Deal Size",
            value: "$28,500",
            change: "+5.7%",
            icon: Users,
          },
        ].map((stat) => (
          <Card key={stat.title} className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Placeholder */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Sales Pipeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Advanced Pipeline Management Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Visualize your sales process, track deal progression, and optimize
            your pipeline for maximum revenue generation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-muted/50">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Visual Pipeline</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Deal Tracking</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Revenue Forecasting</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
