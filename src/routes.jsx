import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import App from "./App.jsx";


const PlayerList = lazy(() => import("./components/Player/PlayerList.jsx"))
const Player = lazy(() => import("./components/Player/Player.jsx"))
const Login = lazy(() => import("./components/Login/Login.jsx"))
const Challenges = lazy(() => import("./components/Challenge/Challenges.jsx"))
const ChallengesList = lazy(() => import("./components/Challenge/ChallengesList.jsx"))
const Leaderboard = lazy(()=> import("./components/Leaderboard/Leaderboard.jsx"))


const ProtectedRoute = ({ Component }) => {
    const token = localStorage.getItem('pacademy_token');
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return <Component />;
};

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Leaderboard
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "all_challenges",
                Component: () => <ProtectedRoute Component={ChallengesList} />
            },
            {
                path: "players",
                Component: () => <ProtectedRoute Component={PlayerList} />
            },
            {
                path: "players/:playerId",
                Component: () => <ProtectedRoute Component={Player} />
            },
            {
                path: "my_challenges",
                Component: () => <ProtectedRoute Component={Challenges} />
            }
        ]
    },

])