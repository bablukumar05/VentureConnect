import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { initSocket } from './services/socket';

// Layouts
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { AuthLayout } from './components/layouts/AuthLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';

// Community Social Feed Page
import { CommunityFeedPage } from './pages/Community/CommunityFeedPage';

// Founder Pages
import { FounderDashboard } from './pages/Founder/FounderDashboard';
import { MyStartupPage } from './pages/Founder/MyStartupPage';
import { PitchDeckPage } from './pages/Founder/PitchDeckPage';
import { InvestorMatchingPage } from './pages/Founder/InvestorMatchingPage';
import { FundingTrackerPage } from './pages/Founder/FundingTrackerPage';
import { MentorsPage } from './pages/Founder/MentorsPage';
import { FounderMessagesPage } from './pages/Founder/FounderMessagesPage';
import { FounderAnalyticsPage } from './pages/Founder/FounderAnalyticsPage';
import { AIAnalyzerPage } from './pages/Founder/AIAnalyzerPage';
import { CapTablePage } from './pages/Founder/CapTablePage';
import { FundraisingCRMPage } from './pages/Founder/FundraisingCRMPage';
import { StartupHealthAnalysisPage } from './pages/Founder/StartupHealthAnalysisPage';

// Investor Pages
import { InvestorDashboard } from './pages/Investor/InvestorDashboard';
import { DiscoverStartupsPage } from './pages/Investor/DiscoverStartupsPage';
import { InvestorRecommendationsPage } from './pages/Investor/InvestorRecommendationsPage';
import { InvestorStartupDetailPage } from './pages/Investor/InvestorStartupDetailPage';
import { InvestorPortfolioPage } from './pages/Investor/InvestorPortfolioPage';
import { InvestorRequestsPage } from './pages/Investor/InvestorRequestsPage';
import { InvestorMessagesPage } from './pages/Investor/InvestorMessagesPage';
import { DueDiligencePage } from './pages/Investor/DueDiligencePage';

// Mentor Pages
import { MentorDashboard } from './pages/Mentor/MentorDashboard';
import { MentorRequestsPage } from './pages/Mentor/MentorRequestsPage';
import { MenteeProgressPage } from './pages/Mentor/MenteeProgressPage';
import { MentorMessagesPage } from './pages/Mentor/MentorMessagesPage';
import { VideoConsultationPage } from './pages/Mentor/VideoConsultationPage';

// Admin Pages
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { UserManagementPage } from './pages/Admin/UserManagementPage';
import { StartupVerificationPage } from './pages/Admin/StartupVerificationPage';
import { AdminFundingPage } from './pages/Admin/AdminFundingPage';
import { AuditLogsPage } from './pages/Admin/AuditLogsPage';
import { SecurityDashboardPage } from './pages/Admin/SecurityDashboardPage';

// Team, Incubator, Legal Pages
import { TeamDashboard } from './pages/Team/TeamDashboard';
import { IncubatorDashboard } from './pages/Incubator/IncubatorDashboard';
import { LegalDashboard } from './pages/Legal/LegalDashboard';

// Protected Route Wrapper with RBAC
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const roleRedirectMap = {
      founder: '/founder/dashboard',
      investor: '/investor/dashboard',
      mentor: '/mentor/dashboard',
      admin: '/admin/dashboard',
      team_member: '/team/dashboard',
      incubator: '/incubator/dashboard',
      legal: '/legal/dashboard',
    };
    return <Navigate to={roleRedirectMap[user.role] || '/'} replace />;
  }
  return children;
};

export function App() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?._id) {
      initSocket(user._id);
    }
  }, [user]);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Public Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Group */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Shared Community Feed Route for all authenticated users */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/community" element={<CommunityFeedPage />} />
        </Route>

        {/* Founder Workspace */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['founder']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/founder/dashboard" element={<FounderDashboard />} />
          <Route path="/founder/startup" element={<MyStartupPage />} />
          <Route path="/founder/pitch-deck" element={<PitchDeckPage />} />
          <Route path="/founder/matches" element={<InvestorMatchingPage />} />
          <Route path="/founder/funding" element={<FundingTrackerPage />} />
          <Route path="/founder/mentors" element={<MentorsPage />} />
          <Route path="/founder/messages" element={<FounderMessagesPage />} />
          <Route path="/founder/analytics" element={<FounderAnalyticsPage />} />
          <Route path="/founder/ai-analyzer" element={<AIAnalyzerPage />} />
          <Route path="/founder/cap-table" element={<CapTablePage />} />
          <Route path="/founder/crm" element={<FundraisingCRMPage />} />
          <Route path="/founder/health-analysis" element={<StartupHealthAnalysisPage />} />
        </Route>

        {/* Investor Workspace */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['investor']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          <Route path="/investor/discover" element={<DiscoverStartupsPage />} />
          <Route path="/investor/recommendations" element={<InvestorRecommendationsPage />} />
          <Route path="/investor/startup/:id" element={<InvestorStartupDetailPage />} />
          <Route path="/investor/portfolio" element={<InvestorPortfolioPage />} />
          <Route path="/investor/requests" element={<InvestorRequestsPage />} />
          <Route path="/investor/messages" element={<InvestorMessagesPage />} />
          <Route path="/investor/due-diligence" element={<DueDiligencePage />} />
        </Route>

        {/* Mentor Workspace */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['mentor']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />
          <Route path="/mentor/requests" element={<MentorRequestsPage />} />
          <Route path="/mentor/progress" element={<MenteeProgressPage />} />
          <Route path="/mentor/messages" element={<MentorMessagesPage />} />
          <Route path="/mentor/video-consult" element={<VideoConsultationPage />} />
        </Route>

        {/* Admin Governance */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/startups" element={<StartupVerificationPage />} />
          <Route path="/admin/funding" element={<AdminFundingPage />} />
          <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
          <Route path="/admin/security" element={<SecurityDashboardPage />} />
        </Route>

        {/* Team Member Workspace */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['team_member']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/team/dashboard" element={<TeamDashboard />} />
        </Route>

        {/* Incubator Manager Workspace */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['incubator']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/incubator/dashboard" element={<IncubatorDashboard />} />
        </Route>

        {/* Legal Advisor Workspace */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['legal']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/legal/dashboard" element={<LegalDashboard />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
