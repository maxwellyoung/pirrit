"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

// Define the Project interface
interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  categories: string[];
  images: string[];
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Ethereal Visions",
    date: "2024-03-15",
    description:
      "A series exploring the intersection of dreams and reality through surreal digital compositions.",
    categories: ["Digital Art", "Surrealism"],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    color: "#FFD700",
  },
  {
    id: 2,
    title: "Urban Fragments",
    date: "2024-02-28",
    description:
      "Capturing the essence of city life through fragmented, abstract representations of urban landscapes.",
    categories: ["Mixed Media", "Abstract"],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    color: "#4682B4",
  },
  {
    id: 3,
    title: "Chromatic Emotions",
    date: "2024-01-10",
    description:
      "An exploration of human emotions through vibrant color palettes and expressive brushstrokes.",
    categories: ["Painting", "Expressionism"],
    images: ["/placeholder.svg?height=800&width=1200"],
    color: "#FF4500",
  },
];

const ProjectItem = ({
  project,
  isSelected,
  onClick,
}: {
  project: Project;
  isSelected: boolean;
  onClick: (project: Project) => void;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`mb-16 p-4 rounded-lg transition-colors duration-300 ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      <button
        onClick={() => onClick(project)}
        className="w-full text-left focus:outline-none"
      >
        <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{project.date}</p>
        <div className="h-1 w-16" style={{ backgroundColor: project.color }} />
      </button>
    </motion.div>
  );
};

const ProjectDetail = ({ project }: { project: Project }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={containerRef} style={{ scale, opacity }} className="mb-32">
      <h2 className="text-5xl font-bold mb-8">{project.title}</h2>
      <p className="text-xl mb-8">{project.description}</p>
      <div className="mb-8 flex flex-wrap">
        {project.categories.map((category) => (
          <span
            key={category}
            className="mr-4 mb-4 px-4 py-2 bg-gray-200 rounded-full text-sm font-semibold"
          >
            {category}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {project.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${project.title} - Image ${index + 1}`}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function PageComponent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (mainRef.current) {
      const hue = Math.round(latest * 360);
      mainRef.current.style.backgroundColor = `hsl(${hue}, 100%, 98%)`;
    }
  });

  return (
    <div className="min-h-screen bg-white text-black font-mono" ref={mainRef}>
      <motion.div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          backgroundColor: "#fff",
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
        }}
      />

      <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tighter">MAX PIRRIT</h1>
          <nav>
            <ul className="flex space-x-8 text-sm">
              <li>
                <a href="#work" className="hover:underline">
                  Work
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <motion.div className="h-1 bg-black origin-left" style={{ scaleX }} />
      </header>

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <section id="work" className="mb-32">
            <h2 className="text-7xl font-bold mb-16 tracking-tighter">
              Selected Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {projects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    isSelected={selectedProject?.id === project.id}
                    onClick={setSelectedProject}
                  />
                ))}
              </div>
              <div className="sticky top-32">
                {selectedProject ? (
                  <ProjectDetail project={selectedProject} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex items-center justify-center text-2xl text-gray-400"
                  >
                    Select a project to view details
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          <section id="about" className="mb-32">
            <h2 className="text-7xl font-bold mb-16 tracking-tighter">
              About Max
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="text-xl leading-relaxed">
                  Max Pirrit is a visionary artist whose work transcends
                  traditional boundaries, blending digital and traditional
                  mediums to create captivating visual narratives. With a keen
                  eye for detail and a passion for exploring the human
                  experience, Max&apos;s art invites viewers to lose themselves
                  in worlds where reality and imagination intertwine.
                </p>
              </div>
              <div>
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Max Pirrit"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          <section id="contact" className="mb-32">
            <h2 className="text-7xl font-bold mb-16 tracking-tighter">
              Get in Touch
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="Name"
                className="bg-gray-100 p-4 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-100 p-4 rounded-lg"
              />
              <textarea
                placeholder="Message"
                className="bg-gray-100 p-4 rounded-lg md:col-span-2 h-40"
              ></textarea>
              <button
                type="submit"
                className="bg-black text-white py-4 px-8 rounded-lg md:col-span-2 hover:bg-opacity-80 transition-colors"
              >
                Send Message
              </button>
            </form>
          </section>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center text-sm">
          <p>&copy; 2024 Max Pirrit. All rights reserved.</p>
          <a
            href="https://www.instagram.com/mxx.pr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}
