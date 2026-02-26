import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Sun, Moon, X } from "lucide-react";
import { SiFlutter, SiLaravel, SiMysql, SiFirebase } from "react-icons/si";
import { TbApi } from "react-icons/tb";

/* ================= BUTTON ================= */
const Button = React.memo(({ children, className = "", ...props }) => (
  <button
    {...props}
    className={
      "px-6 py-2 rounded-2xl font-medium transition-all duration-300 " +
      className
    }
  >
    {children}
  </button>
));

/* ================= TECH ICON MAP ================= */
const techIcons = {
  Flutter: <SiFlutter />,
  Laravel: <SiLaravel />,
  MySQL: <SiMysql />,
  Firebase: <SiFirebase />,
  "REST APIs": <TbApi />,
};

export default function OmarPortfolio() {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const contactMeRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  /* ================= THEME ================= */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* ================= LOADING ================= */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  /* ================= PROJECTS ================= */
  const projects = useMemo(() => {
    const data = [
      {
        title: "Localhub System – Web Developer",
        duration: "2024/11 – 2025/3",
        desc: "Web-based sales, inventory, and financial management system.",
        tech: ["Laravel", "MySQL", "REST APIs"],
        points: [
          "Built inventory & sales workflows.",
          "Implemented role-based access control.",
          "Generated financial Excel reports.",
        ],
      },
      {
        title: "Shaffaf Project – Flutter Developer",
        duration: "2024/6 – 2024/9",
        desc: "Full-featured e-commerce mobile app for car parts.",
        tech: ["Flutter", "Firebase", "REST APIs"],
        points: [
          "OTP authentication with Firebase.",
          "Online payment integration.",
          "REST APIs integration.",
        ],
      },
      {
        title: "SubTrain Project – Flutter Developer",
        duration: "2024/3 – 2024/6",
        desc: "Train & subway ticket booking mobile app.",
        tech: ["Flutter", "REST APIs"],
        points: [
          "Real-time ticket availability.",
          "Online payment system.",
          "GPS & maps integration.",
        ],
      },
    ];
    return data;
  }, []);

  return (
    <div
      ref={containerRef}
      className={
        (dark
          ? "bg-gradient-to-br from-[#0f0f1a] via-[#0b0b14] to-[#141427] text-white"
          : "bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#fdf2f8] text-gray-900") +
        " min-h-screen relative overflow-hidden transition-colors duration-700"
      }
    >
      {/* ================= BACKGROUND BLOBS ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {dark ? (
          <>
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[180px] animate-pulse" />
            <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[200px] animate-pulse" />
          </>
        ) : (
          <>
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-300/40 rounded-full blur-[160px]" />
            <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-[180px]" />
          </>
        )}
      </div>

      {/* ================= LOADING SCREEN ================= */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-[100]"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white text-center"
            >
              Omar Abdelmonem <br /> Junior Software Engineer
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= PROJECT MODAL ================= */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            onClick={() => setActiveProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[90] p-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className={
                (dark
                  ? "bg-white/10 border-white/20"
                  : "bg-white border-gray-200") +
                " border rounded-3xl p-6 max-w-lg w-full backdrop-blur-xl shadow-2xl"
              }
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{activeProject.title}</h3>
                  <p className="text-sm opacity-70">{activeProject.duration}</p>
                </div>
                <button onClick={() => setActiveProject(null)}>
                  <X />
                </button>
              </div>

              <p className="opacity-80 mb-4">{activeProject.desc}</p>

              <ul className="list-disc pl-5 space-y-1 mb-4 opacity-80">
                {activeProject.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {activeProject.tech.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm"
                  >
                    {techIcons[t] || <TbApi />}
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= THEME TOGGLE ================= */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border border-white/20 bg-white/10 shadow-lg"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="px-6 md:px-16 py-16 space-y-10 relative z-10">
        {/* HERO */}
        {/* ================= HERO / PROFILE ================= */}
        <motion.section
          style={{ y: yHero }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[85vh]"
        >
          {/* RIGHT SIDE - CLEAN PROFILE FRAME */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center"
            >
              {/* Soft Subtle Ring */}
              <div className="absolute w-[330px] h-[330px] rounded-full border border-indigo-500/30" />

              {/* Light Glow */}
              <div className="absolute w-[360px] h-[360px] rounded-full bg-indigo-500/10 blur-[100px]" />

              {/* Glass Frame */}
              <div
                className={
                  (dark
                    ? "bg-white/5 border-white/10"
                    : "bg-white/70 border-gray-200") +
                  " relative w-[300px] h-[300px] rounded-full border backdrop-blur-xl shadow-xl flex items-center justify-center"
                }
              >
                <img
                  src="/profile.png"
                  alt="Omar Abdelmonem"
                  className="w-[260px] h-[260px] object-cover rounded-full"
                />
              </div>
            </motion.div>
          </div>
          {/* LEFT SIDE - TEXT */}
          <div className="space-y-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Omar Abdelmonem Mohamed
            </h1>

            <p className="text-lg opacity-70">
              Junior Software Engineer (Flutter & Web)
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <Button
                onClick={() =>
                  projectsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-lg"
              >
                View Projects
              </Button>

              <Button
                onClick={() =>
                  contactMeRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className={
                  (dark
                    ? "border border-white/30 hover:bg-white/10"
                    : "border border-gray-400 hover:bg-gray-200") +
                  " transition"
                }
              >
                Contact Me
              </Button>
            </div>
          </div>
        </motion.section>
        {/* ================= SUMMARY ================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold">Professional Summary</h2>
            <div className="w-79 h-[3px] bg-indigo-500 rounded-full mt-2" />
          </div>
          <div
            className={
              (dark
                ? "bg-white/5 border-white/10"
                : "bg-white/70 border-gray-200") +
              " border rounded-2xl p-10 backdrop-blur-xl shadow-lg leading-relaxed transition"
            }
          >
            <p className="opacity-90">
              Junior Software Engineer with hands-on experience building mobile and
              web applications. Specialized in Flutter for cross-platform development,
              with additional experience in Laravel and MySQL.
            </p>

            <p className="mt-4 opacity-80">
              Experienced in RESTful API integration, payment systems, role-based
              access control, and real-time data handling. Passionate about building
              scalable, reliable systems and delivering high-quality user experiences.
            </p>
          </div>
        </motion.section>
        {/* ================= SKILLS ================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-3xl font-bold">Skills</h2>
            <div className="w-18 h-[3px] bg-indigo-500 rounded-full mt-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div
              className={
                (dark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-gray-200") +
                " border rounded-2xl p-10 backdrop-blur-xl shadow-lg transition"
              }
            >
              <h3 className="text-xl font-semibold mb-6 text-indigo-500">
                Technical Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {[
                  "Flutter & Dart",
                  "RESTful APIs",
                  "State Management (Bloc)",
                  "Payment Integration",
                  "Maps & GPS",
                  "RBAC",
                  "Real-time Data",
                  "Firebase",
                  "Git & Version Control",
                ].map((skill, i) => (
                  <span
                    key={i}
                    className={
                      (dark
                        ? "bg-indigo-500/10 border-indigo-500/20"
                        : "bg-indigo-100 border-indigo-200") +
                      " px-4 py-2 rounded-full text-sm border"
                    }
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div
              className={
                (dark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-gray-200") +
                " border rounded-2xl p-10 backdrop-blur-xl shadow-lg transition"
              }
            >
              <h3 className="text-xl font-semibold mb-6 text-indigo-500">
                Soft Skills
              </h3>

              <ul className="space-y-4">
                {[
                  "Strong Problem-Solving Skills",
                  "Effective Communication & Teamwork",
                  "Fast Adaptation in Startup Environments",
                  "Attention to Detail",
                ].map((skill, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                    <span className="opacity-90">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
        {/* ================= EDUCATION ================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-3xl font-bold">Education</h2>
            <div className="w-35 h-[3px] bg-indigo-500 rounded-full mt-2" />
          </div>

          <div
            className={
              (dark
                ? "bg-white/5 border-white/10"
                : "bg-white/70 border-gray-200") +
              " border rounded-2xl p-8 backdrop-blur-xl shadow-lg transition"
            }
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h3 className="text-xl font-semibold">
                  Canadian International College (CIC)
                </h3>
                <p className="text-indigo-500 font-medium mt-1">
                  Bachelor of Business Information Technology
                </p>
              </div>

              <span className="text-sm opacity-70">
                2020 – 2024
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <p className="opacity-90">
                Graduation Project: <span className="font-medium">SubTrain</span> – Flutter Mobile Application
              </p>

              <div className="inline-block px-4 py-2 bg-indigo-500/10 text-indigo-500 rounded-full text-sm">
                A+ Grade • Ranked 2nd Place
              </div>
            </div>
          </div>
        </motion.section>
        {/* PROJECTS */}
        <section ref={projectsRef}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="w-28 h-[3px] bg-indigo-500 rounded-full mt-2" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                onClick={() => setActiveProject(project)}
                className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl cursor-pointer backdrop-blur-xl transition"
              >
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm opacity-70 mb-2">{project.duration}</p>
                <p className="text-sm opacity-80">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section ref={contactMeRef} className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Contact</h2>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center opacity-80">
            <div className="flex items-center gap-2">
              <Mail size={18} /> omarabdelmonem91@gmail.coma
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} /> +201093818755
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/OmarMonem02"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
              </a>
              <a
                href="https://linkedin.com/in/omar-monem2002"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </section>

        <footer className="text-center opacity-50 pt-16">
          © {new Date().getFullYear()} Omar Abdelmonem Mohamed
        </footer>
      </div>
    </div>
  );
}