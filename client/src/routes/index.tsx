import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/LoginPage";
import StudentPage from "@/pages/StudentPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: "/students",
                element: <StudentPage />
            }
        ]
    },
])

export default router;