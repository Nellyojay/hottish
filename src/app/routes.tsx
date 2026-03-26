import { createHashRouter } from "react-router";
import Root from "./components/Root";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreatorProfilePage from "./pages/CreatorProfilePage";
import PaymentPage from "./pages/PaymentPage";
import MessagesPage from "./pages/MessagesPage";
import CreatorDashboard from "./pages/CreatorDashboard";
import KanbanBoard from "./pages/KanbanBoard";
import SearchPage from "./pages/SearchPage";
import NotificationsPage from "./pages/NotificationsPage";
import CommentsPage from "./pages/CommentsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "signup", Component: SignUpPage },
      { path: "login", Component: LoginPage },
      { path: "home", Component: HomePage },
      { path: "creator/:creatorId", Component: CreatorProfilePage },
      { path: "subscribe/:creatorId", Component: PaymentPage },
      { path: "messages", Component: MessagesPage },
      { path: "search", Component: SearchPage },
      { path: "notifications", Component: NotificationsPage },
      { path: "comments/:postId", Component: CommentsPage },
      { path: "dashboard", Component: CreatorDashboard },
      { path: "kanban", Component: KanbanBoard },
      { path: "settings", Component: SettingsPage },
      { path: "*", Component: NotFound },
    ],
  },
]);