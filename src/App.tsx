import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Mechanics from "./pages/Mechanics";
import Metrics from "./pages/Metrics";
import SandboxPage from "./pages/SandboxPage";
import Reform from "./pages/Reform";
import Citations from "./pages/Citations";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/packing-and-cracking" element={<Mechanics />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/redistricting-sandbox" element={<SandboxPage />} />
        <Route path="/reform" element={<Reform />} />
        <Route path="/citations" element={<Citations />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
