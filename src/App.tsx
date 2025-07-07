import About from "./components/about.tsx";
import Features from "./components/features.tsx";
import Story from "./components/story.tsx";
import Contact from "./components/contact.tsx";
import Footer from "./components/footer.tsx";
import NavBar from "./components/nav-bar.tsx";
import Hero from "./components/hero.tsx";

export default function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
