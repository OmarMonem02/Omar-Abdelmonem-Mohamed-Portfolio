import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Sun, Moon, X } from "lucide-react";

const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={
      "px-5 py-2 rounded-2xl border border-neutral-700 hover:bg-neutral-800 transition " +
      className
    }
  >
    {children}
  </button>
);

export default function OmarPortfolio() {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const contactMeRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    setIsMobile(window.innerWidth < 768);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "Shaffaf App",
      desc: "Train & subway booking Flutter app with payments, maps and AI chatbot.",
      tech: ["Flutter", "Bloc", "REST APIs", "Payment Gateway", "Maps"],
      points: [
        "Real-time booking system",
        "AI chatbot integration",
        "Secure payment workflow",
        "Responsive mobile UI",
      ],
    },
    {
      title: "SubTrain",
      desc: "Graduation project mobile app ranked A+ with Bloc architecture.",
      tech: ["Flutter", "Bloc", "Firebase"],
      points: [
        "Clean architecture structure",
        "State management using Bloc",
        "Optimized UI performance",
      ],
    },
    {
      title: "Localhub System",
      desc: "Laravel & MySQL web system for sales, inventory and financial reports.",
      tech: ["Laravel", "MySQL", "RBAC", "REST APIs"],
      points: [
        "Role-based access control",
        "Inventory management",
        "Financial reporting dashboard",
      ],
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={
        (dark ? "bg-black text-white" : "bg-white text-black") +
        " min-h-screen relative overflow-hidden transition-colors duration-500"
      }
    >
      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-[60] p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={(dark
                ? "bg-neutral-900 border-neutral-800"
                : "bg-white border-neutral-300") +
                " max-w-lg w-full rounded-3xl border p-6 space-y-4 shadow-2xl"}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{activeProject.title}</h3>
                <button onClick={() => setActiveProject(null)}>
                  <X />
                </button>
              </div>

              <p className="text-neutral-400">{activeProject.desc}</p>

              <div>
                <h4 className="font-semibold mb-2">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                  {activeProject.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-purple-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADING INTRO */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={(dark ? "bg-black" : "bg-white") +
              " fixed inset-0 flex items-center justify-center z-50"}
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl font-bold tracking-widest text-center"
            >
              Omar Abdelmonem
              <br />
              Software Engineer
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THEME TOGGLE */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur border border-neutral-700"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* CURSOR GLOW */}
      {dark && !isMobile && (
        <div
          className="pointer-events-none fixed w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ left: cursor.x, top: cursor.y }}
        />
      )}

      <div className="px-6 md:px-16 py-10 space-y-28 relative z-10">
        {/* HERO */}
        <motion.section
          style={{ y: yHero }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center min-h-[80vh] text-center md:text-left"
        >
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Omar Abdelmonem Mohamed
            </h1>
            <p className="text-neutral-400 text-lg">
              Flutter Engineer • Mobile & Web Developer
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button
                onClick={() =>
                  projectsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Projects
              </Button>
              <Button
                onClick={() =>
                  contactMeRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-br from-purple-500 to-blue-500 text-white border-transparent"
              >
                Contact Me
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-72 h-72 rounded-3xl overflow-hidden">
              <img src="/profile.png" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <section ref={projectsRef} className="space-y-10">
          <h2 className="text-3xl font-semibold text-center md:text-left">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveProject(project)}
                whileHover={{ y: -6, scale: 1.02 }}
                className={(dark
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-neutral-100 border-neutral-300") +
                  " border rounded-2xl overflow-hidden shadow-xl cursor-pointer"}
              >
                <div className="h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-neutral-400 text-sm">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <motion.section ref={contactMeRef} className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl font-semibold">Contact</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-neutral-400">
            <div className="flex items-center gap-2">
              <Mail size={18} /> omarabdelmonem91@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} /> +201093818755
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} /> El-Sheikh Zayed, Giza
            </div>
            <div className="flex gap-6 pt-2">
              <a href="https://github.com/OmarMonem02" target="_blank">
                <Github />
              </a>
              <a href="https://linkedin.com/in/omar-monem2002" target="_blank">
                <Linkedin />
              </a>
            </div>
          </div>
        </motion.section>

        <footer className="text-center text-neutral-500 pt-10">
          © {new Date().getFullYear()} Omar Abdelmonem Mohamed
        </footer>
      </div>
    </div>
  );
}