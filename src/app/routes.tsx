import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/Home";
import { OurMission } from "./components/pages/OurMission";
import { OurStory } from "./components/pages/OurStory";
import { WhyDonate } from "./components/pages/WhyDonate";
import { HowToDonate } from "./components/pages/HowToDonate";
import { Contact } from "./components/pages/Contact";
import { Resources } from "./components/pages/Resources";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "mission", Component: OurMission },
      { path: "story", Component: OurStory },
      { path: "why-donate", Component: WhyDonate },
      { path: "donate", Component: HowToDonate },
      { path: "contact", Component: Contact },
      { path: "resources", Component: Resources },
      // Redirect legacy URL
      { path: "safety-planner", element: <Navigate to="/resources" replace /> },
    ],
  },
]);
