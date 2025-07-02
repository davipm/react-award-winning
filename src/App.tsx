import About from "./components/about.tsx";
import Features from "./components/features.tsx";

export default function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <About />
      <Features />
    </main>
  );
}
