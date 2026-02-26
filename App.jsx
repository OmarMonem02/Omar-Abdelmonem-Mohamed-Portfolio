import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Sun, Moon } from "lucide-react";

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
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]); // fixed mobile disappearing bug

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400); // faster intro performance
    setIsMobile(window.innerWidth < 768);
    return () => clearTimeout(timer);
  }, []);

  const techStack = ["Flutter", "Laravel", "Firebase", "MySQL", "REST API"];

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={
        (dark ? "bg-black text-white" : "bg-white text-black") +
        " min-h-screen relative overflow-hidden transition-colors duration-500"
      }
    >
      {/* LOADING INTRO */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={
              (dark ? "bg-black" : "bg-white") +
              " fixed inset-0 flex items-center justify-center z-50"
            }
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

      {/* CURSOR GLOW (disabled on mobile) */}
      {dark && !isMobile && (
        <div
          className="pointer-events-none fixed w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ left: cursor.x, top: cursor.y }}
        />
      )}

      {/* BACKGROUND LIGHTS */}
      {dark && (
        <>
          <div className="absolute top-[-140px] left-[-140px] w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[160px] rounded-full" />
          <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[160px] rounded-full" />
        </>
      )}

      <div className="px-6 md:px-16 py-10 space-y-28 relative z-10">
        {/* HERO */}
        <motion.section
          style={{ y: yHero }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center min-h-[80vh] text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Omar Abdelmonem Mohamed
            </h1>
            <p className="text-neutral-400 text-lg">
              Flutter Engineer • Mobile & Web Developer
            </p>
            <p className="text-neutral-400 max-w-xl leading-relaxed mx-auto md:mx-0">
              Building production-ready mobile and web applications using Flutter,
              Laravel, and scalable backend systems.
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
                className="bg-gradient-to-br from-purple-500 to-blue-500 text-white border-transparent hover:from-purple-600 hover:to-blue-600"
              >
                Contact Me
              </Button>
            </div>
          </motion.div>

          {/* PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center relative"
          >
            <motion.div
              whileHover={{ rotateY: 10, rotateX: 10, scale: 1.03 }}
              className="relative w-72 h-72 rounded-3xl p-[2px] bg-gradient-to-br from-purple-500/60 via-blue-500/40 to-transparent shadow-[0_0_60px_rgba(168,85,247,0.35)]"
            >
              <div
                className={
                  (dark ? "bg-neutral-900/80" : "bg-white/70") +
                  " w-full h-full rounded-3xl overflow-hidden backdrop-blur-xl"
                }
              >
                <img
                  src="/profile.png"
                  alt="Omar Abdelmonem"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ABOUT */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6 max-w-3xl text-center md:text-left"
        >
          <h2 className="text-3xl font-semibold">About Me</h2>
          <p className="text-neutral-400 leading-relaxed">
            Junior Software Engineer specialized in Flutter development with strong
            experience integrating REST APIs, payment systems, RBAC and real-time
            data handling.
          </p>
        </motion.section>

        {/* SKILLS */}
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold text-center md:text-left">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              "Flutter & Dart",
              "Laravel & MySQL",
              "RESTful APIs",
              "Bloc State Management",
              "Firebase",
              "Payment Integration",
              "Maps & GPS",
              "RBAC Systems",
              "Git & Version Control",
            ].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className={
                  (dark
                    ? "bg-neutral-900 border-neutral-800"
                    : "bg-neutral-100 border-neutral-300") +
                  " border rounded-2xl p-6 text-lg shadow-xl"
                }
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section ref={projectsRef} className="space-y-10">
          <h2 className="text-3xl font-semibold text-center md:text-left">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                title: "Shaffaf App",
                desc: "Train & subway booking Flutter app with payments, maps and AI chatbot.",
              },
              {
                title: "SubTrain",
                desc: "Graduation project mobile app ranked A+ with Bloc architecture.",
              },
              {
                title: "Localhub System",
                desc: "Laravel & MySQL web system for sales, inventory and financial reports.",
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className={
                  (dark
                    ? "bg-neutral-900 border-neutral-800"
                    : "bg-neutral-100 border-neutral-300") +
                  " border rounded-2xl overflow-hidden shadow-xl"
                }
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
        <motion.section
          ref={contactMeRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 text-center md:text-left"
        >
          <h2 className="text-3xl font-semibold">Contact</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-neutral-400">
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
