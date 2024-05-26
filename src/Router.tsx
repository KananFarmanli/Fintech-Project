import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Error from "./pages/ErrorBoundary";
import ChoosePlan from "./pages/ChoosePlan";
import ConfirmTransaction from "./pages/ConfirmTransaction";
import BotUsage from "./pages/BotUsage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/plan/:id",
        element: <ChoosePlan />,
      },
      {
        path: "/buy",
        element: <ConfirmTransaction />,
      },

      {
        path: "/bot-usage",
        element: <BotUsage />,
      },
    ],
  },
]);
