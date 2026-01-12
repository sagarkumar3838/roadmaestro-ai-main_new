import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ProductionErrorBoundary from "@/components/ProductionErrorBoundary";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import ATSChecker from "./pages/ATSChecker";
import AIAssistant from "./pages/AIAssistant";
import CoursesMain from "./pages/CoursesMain";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Practice from "./pages/Practice";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthPage } from "./components/auth/AuthPage";
import { ProfilePage } from "./components/profile/ProfilePage";
import { CareerMentor } from "./components/CareerMentor";
import {LearningPath} from "./pages/LearningPath";
import HTMLPage from "./pages/HTMLPage";
import CheatSheetsPage from "./pages/CheatSheetsPage";
import CheatSheetDetailPage from "./pages/CheatSheetDetailPage";
import CreateCheatSheetPage from "./pages/CreateCheatSheetPage";
import OGLCourses from "./pages/OGLCourses";
import OGLTesterCourse from "./pages/OGLTesterCourse";
import HCMCourse from "./pages/HCMCourse";
import OGLContentDeveloperCourse from "./pages/OGLContentDeveloperCourse";
import QATesterCourse from "./pages/QATesterCourse";
import FusionDeveloperCourse from "./pages/FusionDeveloperCourse";
import RedwoodDeveloperCourse from "./pages/RedwoodDeveloperCourse";
import SCMCourse from "./pages/SCMCourse";
import CXCourse from "./pages/CXCourse";
import EPMCourse from "./pages/EPMCourse";
import ERPCourse from "./pages/ERPCourse";
import Evaluation from "./components/Evaluation";
import OGLDeveloper from "./components/OGLDeveloper";
import SkillTest from "./components/SkillTest";
import CareersIndex from "./pages/careers/CareersIndex";
import MERNStackDeveloper from "./pages/careers/MERNStackDeveloper";
import DevOpsDeveloper from "./pages/careers/DevOpsDeveloper";
import QATester from "./pages/careers/QATester";
import WebDeveloper from "./pages/careers/WebDeveloper";
import PythonFullStack from "./pages/careers/PythonFullStack";
import JavaFullStack from "./pages/careers/JavaFullStack";
import LearnHome from "./pages/LearnHome";
import HTMLTutorial from "./pages/learn/HTMLTutorial";
import JavaModulePage from "./pages/java/JavaModulePage";

const queryClient = new QueryClient();

const App = () => (
  <ProductionErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/home" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><AdminLayout><ProfilePage /></AdminLayout></ProtectedRoute>} />
              <Route path="/resume-builder" element={<ProtectedRoute><AdminLayout><ResumeBuilder /></AdminLayout></ProtectedRoute>} />
              <Route path="/ats-checker" element={<ProtectedRoute><AdminLayout><ATSChecker /></AdminLayout></ProtectedRoute>} />
              <Route path="/ai-assistant" element={<ProtectedRoute><AdminLayout><AIAssistant /></AdminLayout></ProtectedRoute>} />
              <Route path="/practice" element={<ProtectedRoute><AdminLayout><Practice /></AdminLayout></ProtectedRoute>} />
              <Route path="/career-mentor" element={<ProtectedRoute><AdminLayout><CareerMentor /></AdminLayout></ProtectedRoute>} />
              <Route path="/learning-path" element={<ProtectedRoute><AdminLayout><LearningPath /></AdminLayout></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><AdminLayout><Analytics /></AdminLayout></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><AdminLayout><ChatPage /></AdminLayout></ProtectedRoute>} />
              <Route path="/html" element={<ProtectedRoute><AdminLayout><HTMLPage /></AdminLayout></ProtectedRoute>} />
              <Route path="/cheatsheets" element={<ProtectedRoute><AdminLayout><CheatSheetsPage /></AdminLayout></ProtectedRoute>} />
              <Route path="/cheatsheets/create" element={<ProtectedRoute><AdminLayout><CreateCheatSheetPage /></AdminLayout></ProtectedRoute>} />
              <Route path="/cheatsheets/:id" element={<ProtectedRoute><AdminLayout><CheatSheetDetailPage /></AdminLayout></ProtectedRoute>} />
              <Route path="/cheatsheets/:id/edit" element={<ProtectedRoute><AdminLayout><CreateCheatSheetPage /></AdminLayout></ProtectedRoute>} />
              
              {/* Courses - Main route (standalone page) and nested routes */}
              <Route path="/courses" element={<ProtectedRoute><CoursesMain /></ProtectedRoute>} />
              <Route path="/courses/ogl-courses" element={<ProtectedRoute><AdminLayout><OGLCourses /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/ogl-tester" element={<ProtectedRoute><AdminLayout><OGLTesterCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/content-developer" element={<ProtectedRoute><AdminLayout><OGLContentDeveloperCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/qa-tester-course" element={<ProtectedRoute><AdminLayout><QATesterCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/fusion-developer" element={<ProtectedRoute><AdminLayout><FusionDeveloperCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/redwood-developer" element={<ProtectedRoute><AdminLayout><RedwoodDeveloperCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/hcm" element={<ProtectedRoute><AdminLayout><HCMCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/scm" element={<ProtectedRoute><AdminLayout><SCMCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/cx" element={<ProtectedRoute><AdminLayout><CXCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/epm" element={<ProtectedRoute><AdminLayout><EPMCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/courses/erp" element={<ProtectedRoute><AdminLayout><ERPCourse /></AdminLayout></ProtectedRoute>} />
              <Route path="/evaluation/:skill" element={<ProtectedRoute><AdminLayout><Evaluation /></AdminLayout></ProtectedRoute>} />
              <Route path="/test/:skill/:level" element={<ProtectedRoute><SkillTest /></ProtectedRoute>} />
              <Route path="/ogl-developer/*" element={<ProtectedRoute><AdminLayout><OGLDeveloper /></AdminLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><AdminLayout><Settings /></AdminLayout></ProtectedRoute>} />
              
              {/* Career Paths */}
              <Route path="/careers" element={<ProtectedRoute><AdminLayout><CareersIndex /></AdminLayout></ProtectedRoute>} />
              <Route path="/careers/ogl-developer/*" element={<ProtectedRoute><AdminLayout><OGLDeveloper /></AdminLayout></ProtectedRoute>} />
              <Route path="/careers/mern-stack" element={<ProtectedRoute><AdminLayout><MERNStackDeveloper /></AdminLayout></ProtectedRoute>} />
              <Route path="/careers/devops" element={<ProtectedRoute><AdminLayout><DevOpsDeveloper /></AdminLayout></ProtectedRoute>} />
              <Route path="/careers/qa-tester" element={<ProtectedRoute><AdminLayout><QATester /></AdminLayout></ProtectedRoute>} />
              <Route path="/careers/web-developer" element={<ProtectedRoute><AdminLayout><WebDeveloper /></AdminLayout></ProtectedRoute>} />
              <Route path="/careers/python-fullstack" element={<ProtectedRoute><AdminLayout><PythonFullStack /></AdminLayout></ProtectedRoute>} />
              <Route path="/careers/java-fullstack" element={<ProtectedRoute><AdminLayout><JavaFullStack /></AdminLayout></ProtectedRoute>} />
              <Route path="/careers/java-fullstack/module/:moduleId" element={<ProtectedRoute><JavaModulePage /></ProtectedRoute>} />
              
              {/* Learning Platform - W3Schools Style (Standalone, no AdminLayout) */}
              <Route path="/learn" element={<ProtectedRoute><LearnHome /></ProtectedRoute>} />
              <Route path="/learn/html" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              <Route path="/learn/html/*" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              <Route path="/learn/css" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              <Route path="/learn/javascript" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              <Route path="/learn/react" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              <Route path="/learn/python" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              <Route path="/learn/sql" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              <Route path="/learn/nodejs" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              <Route path="/learn/typescript" element={<ProtectedRoute><HTMLTutorial /></ProtectedRoute>} />
              
              {/* 404 - Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ProductionErrorBoundary>
);

export default App;
