"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  TrendingUp,
  Activity,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Total Prompts",
    value: "15,234",
    change: "+8%",
    icon: FileText,
    color: "text-green-600",
  },
  {
    title: "Monthly Active",
    value: "1,429",
    change: "+23%",
    icon: Activity,
    color: "text-purple-600",
  },
  {
    title: "Growth Rate",
    value: "18.2%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
];

const recentPrompts = [
  {
    id: "1",
    title: "Creative Writing Assistant",
    author: "john_doe",
    category: "Writing",
    stars: 1247,
    status: "Published",
  },
  {
    id: "2",
    title: "Code Review Expert",
    author: "jane_smith",
    category: "Development",
    stars: 892,
    status: "Published",
  },
  {
    id: "3",
    title: "Data Analysis Wizard",
    author: "mike_wilson",
    category: "Analytics",
    stars: 567,
    status: "Draft",
  },
  {
    id: "4",
    title: "SEO Content Generator",
    author: "sarah_jones",
    category: "Marketing",
    stars: 743,
    status: "Published",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prompts */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {prompt.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by {prompt.author} • {prompt.category}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        ⭐ {prompt.stars}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          prompt.status === "Published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {prompt.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Review Prompts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                System Health
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart Placeholder */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Platform Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Activity chart will be displayed here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}