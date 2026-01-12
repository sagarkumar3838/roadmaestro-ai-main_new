import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  MousePointerClick,
  BarChart3,
  Activity,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Trophy,
  AlertCircle,
  CheckCircle,
  XCircle,
  BookOpen,
  Brain,
  Code,
  FileText,
  Database,
  Wrench,
  Settings,
  Lightbulb
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { getAllEvaluationResults, getUserEvaluationResults, type EvaluationResult } from '@/services/evaluationService'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PieChart,
  Cell
} from 'recharts'

type KPI = {
  label: string
  value: number
  delta: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

type RealtimePayload = {
  metric: keyof AnalyticsState
  value: number
}

type AnalyticsState = {
  activeUsers: number
  pageViews: number
  conversions: number
  bounceRate: number // 0-100
}

const initialAnalytics: AnalyticsState = {
  activeUsers: 432,
  pageViews: 35700,
  conversions: 968,
  bounceRate: 18.2
}

const gradientBg = 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'

const skillIcons = {
  html: Code,
  css: FileText,
  javascript: Brain,
  jquery: Database,
  devtools: Wrench
}

const skillColors = {
  html: '#E44D26',
  css: '#1572B6',
  javascript: '#F7DF1E',
  jquery: '#0769AD',
  devtools: '#4285F4'
}

export default function Analytics() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<AnalyticsState>(initialAnalytics)
  const [userResults, setUserResults] = useState<Record<string, EvaluationResult>>({})
  const [allResults, setAllResults] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('overview')

  const [series, setSeries] = useState(
    Array.from({ length: 12 }).map((_, i) => ({
      name: new Date(2025, i, 1).toLocaleString('default', { month: 'short' }),
      users: 200 + Math.round(Math.random() * 400),
      views: 1000 + Math.round(Math.random() * 5000),
      conversions: 50 + Math.round(Math.random() * 150)
    }))
  )
  const mounted = useRef(false)
  const [leaderboard, setLeaderboard] = useState<Array<{
    id: string;
    name: string;
    email?: string;
    score: number;
    trend: number[];
    totalTests: number;
    lastTestDate?: Date;
  }>>([])
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true)
  const [userPerf, setUserPerf] = useState(
    Array.from({ length: 12 }).map((_, i) => ({
      name: new Date(2025, i, 1).toLocaleString('default', { month: 'short' }),
      score: 60 + Math.round(Math.random() * 40)
    }))
  )

  // Load evaluation data
  useEffect(() => {
    if (user) {
      loadUserEvaluations()
    }
    loadLeaderboardData()
  }, [user])

  const loadUserEvaluations = async () => {
    if (!user) return
    try {
      const results = await getUserEvaluationResults(user.uid)
      setUserResults(results)
    } catch (error) {
      console.error('Error loading user evaluations:', error)
    }
  }

  const loadLeaderboardData = async () => {
    setIsLoadingLeaderboard(true)
    try {
      // Import Firebase functions
      const { collection, query, orderBy, limit, getDocs } = await import('firebase/firestore')
      const { db } = await import('@/integrations/firebase/client')
      
      // Query user progression data
      const progressionRef = collection(db, 'userProgression')
      const q = query(progressionRef, orderBy('totalTestsTaken', 'desc'), limit(10))
      const snapshot = await getDocs(q)
      
      const leaderboardData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data()
          const userId = data.userId
          
          // Get user info
          let userName = 'Anonymous User'
          let userEmail = ''
          try {
            const userDoc = await getDocs(query(collection(db, 'users'), limit(1)))
            if (!userDoc.empty) {
              const userData = userDoc.docs[0].data()
              userName = userData.displayName || userData.email?.split('@')[0] || 'User'
              userEmail = userData.email || ''
            }
          } catch (err) {
            console.log('Could not fetch user details')
          }
          
          // Calculate total score across all skills
          const levelScores = data.levelScores || {}
          const totalScore = Object.values(levelScores).reduce((sum: number, score: any) => sum + (score || 0), 0)
          const avgScore = totalScore / Math.max(1, Object.keys(levelScores).length)
          
          // Generate trend data (last 8 tests)
          const trend = Array.from({ length: 8 }).map(() => 
            Math.max(0, Math.min(100, avgScore + (Math.random() - 0.5) * 20))
          )
          
          return {
            id: doc.id,
            name: userName,
            email: userEmail,
            score: Math.round(avgScore),
            trend,
            totalTests: data.totalTestsTaken || 0,
            lastTestDate: data.lastTestDate?.toDate?.() || new Date()
          }
        })
      )
      
      // Sort by score
      leaderboardData.sort((a, b) => b.score - a.score)
      
      // If no real data, show placeholder
      if (leaderboardData.length === 0) {
        setLeaderboard([
          {
            id: 'placeholder',
            name: 'No test data yet',
            score: 0,
            trend: [0, 0, 0, 0, 0, 0, 0, 0],
            totalTests: 0
          }
        ])
      } else {
        setLeaderboard(leaderboardData)
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error)
      // Fallback to mock data on error
      setLeaderboard(
        Array.from({ length: 10 }).map((_, i) => ({
          id: `user-${i + 1}`,
          name: `User ${i + 1}`,
          score: 700 - i * 32 + Math.round(Math.random() * 20),
          trend: Array.from({ length: 8 }).map(() => 60 + Math.round(Math.random() * 40)),
          totalTests: Math.floor(Math.random() * 20) + 5
        }))
      )
    } finally {
      setIsLoadingLeaderboard(false)
    }
  }

  // Derived KPIs with animation-friendly rounding
  const kpis: KPI[] = useMemo(() => [
    {
      label: 'Active Users',
      value: analytics.activeUsers,
      delta: Math.round((Math.random() - 0.4) * 40),
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Page Views',
      value: analytics.pageViews,
      delta: Math.round((Math.random() - 0.4) * 800),
      icon: BarChart3,
      color: 'from-violet-500 to-violet-600'
    },
    {
      label: 'Conversions',
      value: analytics.conversions,
      delta: Math.round((Math.random() - 0.4) * 60),
      icon: MousePointerClick,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      label: 'Bounce Rate',
      value: analytics.bounceRate,
      delta: Math.round((Math.random() - 0.5) * 4 * 10) / 10,
      icon: Activity,
      color: 'from-rose-500 to-rose-600'
    }
  ], [analytics])

  // Analytics data loading (Firebase real-time may be blocked by extensions)
  const loadAnalytics = async () => {
    try {
      // Load evaluation data
      if (user) {
        await loadUserEvaluations()
        await loadAllEvaluations()
      }
    } catch (error) {
      console.error('Analytics data loading error (may be blocked):', error)
      // Continue without real-time, will show any cached/static data
    }
  }

  // Simplified analytics without real-time (avoids extension blocking)
  useEffect(() => {
    loadAnalytics() // Basic data loading

    const interval = setInterval(() => {
      setAnalytics((prev) => ({
        activeUsers: Math.max(50, Math.round(prev.activeUsers + (Math.random() - 0.5) * 30)),
        pageViews: Math.max(1000, Math.round(prev.pageViews + (Math.random() - 0.45) * 1500)),
        conversions: Math.max(10, Math.round(prev.conversions + (Math.random() - 0.5) * 30)),
        bounceRate: Math.min(95, Math.max(2, Math.round((prev.bounceRate + (Math.random() - 0.5) * 1.2) * 10) / 10))
      }))

      setSeries((prev) => {
        const updated = [...prev]
        updated.shift()
        const nextIndex = (prev.length % 12)
        updated.push({
          name: new Date(2025, nextIndex, 1).toLocaleString('default', { month: 'short' }),
          users: 200 + Math.round(Math.random() * 400),
          views: 1000 + Math.round(Math.random() * 5000),
          conversions: 50 + Math.round(Math.random() * 150)
        })
        return updated
      })

      // Reload leaderboard data periodically (every 10 seconds)
      if (Math.random() > 0.6) {
        loadLeaderboardData()
      }

      // User performance series
      setUserPerf((prev) => {
        const clone = [...prev]
        clone.shift()
        const nextIndex = (prev.length % 12)
        clone.push({
          name: new Date(2025, nextIndex, 1).toLocaleString('default', { month: 'short' }),
          score: 60 + Math.round(Math.random() * 40)
        })
        return clone
      })
    }, 2500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const chartConfig = {
    users: { label: 'Users', color: 'hsl(var(--chart-1))' },
    views: { label: 'Views', color: 'hsl(var(--chart-2))' },
    conversions: { label: 'Conversions', color: 'hsl(var(--chart-3))' }
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="h-full space-y-6 md:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Hero */}
        <div className={`relative overflow-hidden ${gradientBg} rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl`}> 
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Analytics</h1>
              <p className="text-sm md:text-base text-indigo-100">Real-time insights powered by updates and smooth animations.</p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-4xl md:text-5xl font-bold">{Math.round((analytics.conversions / Math.max(1, analytics.pageViews)) * 10000) / 100}%</div>
              <div className="text-sm md:text-base text-indigo-200">Conversion Rate</div>
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            const positive = kpi.delta >= 0
            return (
              <Card key={kpi.label} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-br ${kpi.color}`}>
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className={`text-xs ${positive ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                      {positive ? '+' : ''}{kpi.delta.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">{kpi.label}</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                    {kpi.label === 'Bounce Rate' ? `${kpi.value.toFixed(1)}%` : kpi.value.toLocaleString()}
                  </div>
                  <div className="mt-3 md:mt-4">
                    <Progress value={Math.min(100, kpi.label === 'Bounce Rate' ? kpi.value : (kpi.value % 100))} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Area: Traffic */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Monthly Traffic</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <ChartContainer config={chartConfig} className="h-[250px] md:h-[320px]">
                <AreaChart data={series} margin={{ left: 12, right: 12 }}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="views" stroke="var(--color-views)" fillOpacity={1} fill="url(#viewsGradient)" />
                  <Area type="monotone" dataKey="users" stroke="var(--color-users)" fill="transparent" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Radial: Bounce Rate */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Bounce Rate</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="h-[250px] md:h-[320px]">
                <ChartContainer config={{ rate: { label: 'Rate', color: 'hsl(var(--chart-4))' } }} className="h-full">
                  <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: 'rate', value: analytics.bounceRate }]} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} fill="var(--color-rate)" background />
                  </RadialBarChart>
                </ChartContainer>
              </div>
              <div className="text-center -mt-16 md:-mt-20">
                <div className="text-3xl md:text-4xl font-bold">{analytics.bounceRate.toFixed(1)}%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Session exits without interaction</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Bar: Conversions */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Monthly Conversions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <ChartContainer config={chartConfig} className="h-[220px] md:h-[260px]">
                <BarChart data={series} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="conversions" fill="var(--color-conversions)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Line: Active users */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg md:text-xl">Active Users Trend</CardTitle>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  {analytics.activeUsers >= initialAnalytics.activeUsers ? (
                    <span className="text-green-600 inline-flex items-center"><TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />Up</span>
                  ) : (
                    <span className="text-rose-600 inline-flex items-center"><TrendingDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />Down</span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <ChartContainer config={chartConfig} className="h-[220px] md:h-[260px]">
                <LineChart data={series} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard and User performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Leaderboard */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Top 10 Assessment Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              {isLoadingLeaderboard ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {leaderboard.map((user, idx) => (
                    <div key={user.id} className="flex items-center justify-between p-2 md:p-3 rounded-lg md:rounded-xl bg-white/70 hover:bg-white/90 transition-colors">
                      <div className="flex items-center gap-2 md:gap-4 min-w-0">
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-semibold text-sm md:text-base flex-shrink-0 ${
                          idx === 0 ? 'bg-yellow-500 text-white' : 
                          idx === 1 ? 'bg-gray-400 text-white' : 
                          idx === 2 ? 'bg-orange-600 text-white' : 
                          'bg-gray-900 text-white'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm md:text-base truncate">
                            {user.name}
                            {idx < 3 && <span className="ml-2">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.totalTests ? `${user.totalTests} tests taken` : 'Recent trend'}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:flex flex-1 mx-4 lg:mx-6 max-w-[200px]">
                        <ChartContainer config={{ s: { label: 'score', color: 'hsl(var(--chart-5))' } }} className="h-[40px] w-full">
                          <LineChart data={user.trend.map((v, i) => ({ i, v }))} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                            <XAxis dataKey="i" hide />
                            <YAxis hide domain={[0, 100]} />
                            <Line type="monotone" dataKey="v" stroke="var(--color-s)" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ChartContainer>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg md:text-xl font-bold text-gray-900">{user.score}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* User performance card */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">User Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <ChartContainer config={{ score: { label: 'Score', color: 'hsl(var(--chart-6))' } }} className="h-[220px] md:h-[260px]">
                <AreaChart data={userPerf} margin={{ left: 12, right: 12 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="score" stroke="var(--color-score)" fillOpacity={1} fill="url(#scoreGradient)" />
                </AreaChart>
              </ChartContainer>
              <div className="mt-3 md:mt-4">
                <div className="text-xs md:text-sm text-gray-600 mb-1">Average Score</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{Math.round(userPerf.reduce((a, b) => a + b.score, 0) / userPerf.length)}%</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
