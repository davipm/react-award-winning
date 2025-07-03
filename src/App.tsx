import About from "./components/about.tsx";
import Features from "./components/features.tsx";
import Story from "./components/story.tsx";

export default function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <About />
      <Features />
      <Story />
    </main>
  );
}
