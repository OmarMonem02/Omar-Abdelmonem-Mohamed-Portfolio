import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Sun, Moon, X } from "lucide-react";
import { SiFlutter, SiLaravel, SiMysql, SiFirebase } from "react-icons/si";
import { TbApi } from "react-icons/tb";

/* ================= MOTION VARIANTS ================= */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const blobAnimation = {
  animate: { x: [0, 20, 0, -20, 0], y: [0, -20, 0, 20, 0] },
  transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
};

/* ================= BUTTON ================= */
// turn into motion button for tap feedback
const Button = React.memo(({ children, className = "", ...props }) => (
  <motion.button
    {...props}
    whileTap={{ scale: 0.95 }}
    className={
      "px-6 py-2 rounded-2xl font-medium transition-all duration-300 " +
      className
    }
  >
    {children}
  </motion.button>
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
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  /* ================= PROJECTS ================= */
  const projects = useMemo(() => {
    const data = [
      {
        title: "Localhub System – Web Developer",
        duration: "2024/11 – 2025/3",
        desc: "Web-based sales, inventory, and financial management system built with Laravel.",
        tech: ["Laravel", "MySQL", "REST APIs", "RBAC"],
        url: "https://github.com/NoureldinFarag1/capstone_pos",
        points: [
          "Designed modular sales & inventory workflows.",
          "Implemented secure role-based access control (Admin, Moderator, Cashier).",
          "Built RESTful APIs for transactions and reporting.",
          "Automated stock updates and financial calculations.",
          "Generated dynamic monthly Excel financial reports.",
          "Optimized MySQL queries for better performance.",
        ],
      },
      {
        title: "Shaffaf Project – Flutter Developer",
        duration: "2024/6 – 2024/9",
        desc: "Cross-platform e-commerce mobile app for car parts with secure payments.",
        tech: ["Flutter", "Firebase", "BLoC", "Maps & GPS", "REST APIs", "Payment Gateway"],
        url: "https://github.com/mohamedadel80080/Shfaff-App-Flutter",
        points: [
          "Developed scalable Flutter architecture using BLoC state management.",
          "Integrated Firebase Authentication with OTP verification.",
          "Connected secure payment gateway for checkout flow.",
          "Consumed REST APIs for dynamic products & categories.",
          "Improved UI responsiveness across multiple screen sizes.",
          "Enhanced performance with optimized state updates.",
        ],
      },
      {
        title: "SubTrain Project – Flutter Developer",
        duration: "2024/3 – 2024/6",
        desc: "Train & subway ticket booking mobile app with real-time services.",
        tech: ["Flutter", "Realtime APIs", "Firebase", "Maps & GPS", "Payment Integration", "AI Chatbot"],
        url: "https://github.com/OmarMonem02/SubTrain",
        points: [
          "Led full mobile development lifecycle from design to deployment.",
          "Implemented real-time ticket booking and confirmation APIs.",
          "Integrated maps & GPS for station tracking and route guidance.",
          "Built secure online payment flow.",
          "Developed AI chatbot using Gemini API for user assistance.",
          "Designed scalable architecture for future expansion.",
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
            <motion.div
              className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[180px]"
              variants={blobAnimation}
              animate="animate"
            />
            <motion.div
              className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[200px]"
              variants={blobAnimation}
              animate="animate"
            />
          </>
        ) : (
          <>
            <motion.div
              className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-300/40 rounded-full blur-[160px]"
              variants={blobAnimation}
              animate="animate"
            />
            <motion.div
              className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-[180px]"
              variants={blobAnimation}
              animate="animate"
            />
          </>
        )}
      </div>

      {/* ================= LOADING SCREEN ================= */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={
              (dark
                ? "bg-gradient-to-br from-[#0f0f1a] to-[#141427]"
                : "bg-gradient-to-br from-[#f0f9ff] to-[#fdf2f8]") +
              " fixed inset-0 flex flex-col items-center justify-center z-[100]"
            }
          >
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <motion.div
                className={
                  (dark ? "bg-purple-600/20" : "bg-sky-300/30") +
                  " absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full blur-[120px]"
                }
                animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className={
                  (dark ? "bg-blue-600/20" : "bg-pink-300/30") +
                  " absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full blur-[120px]"
                }
                animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>

            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className={
                  (dark ? "border-purple-500/40" : "border-indigo-400/40") +
                  " absolute inset-0 rounded-full border-2"
                }
              />
              <img
                src="/portfolio.png"
                alt="Loading..."
                className={
                  (dark ? "border-white/20" : "border-gray-300") +
                  " w-38 h-38 object-contain rounded-full border-2"
                }
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <h1
                className={
                  (dark ? "text-white" : "text-gray-900") +
                  " text-4xl md:text-5xl font-bold"
                }
              >
                Omar Abdelmonem
              </h1>
              <p
                className={
                  (dark ? "text-gray-300" : "text-gray-600") + " text-lg font-medium"
                }
              >
                Junior Software Engineer
              </p>
            </motion.div>

            {/* Loading Dots */}
            <motion.div className="flex gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={
                    (dark ? "bg-purple-500" : "bg-indigo-500") +
                    " w-3 h-3 rounded-full"
                  }
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
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
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveProject(null)}
                >
                  <X />
                </motion.button>
              </div>

              <p className="opacity-80 mb-4">{activeProject.desc}</p>

              <ul className="list-disc pl-5 space-y-1 mb-4 opacity-80">
                {activeProject.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {activeProject.tech.map((t, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm"
                  >
                    {techIcons[t] || <TbApi />}
                    {t}
                  </motion.div>
                ))}
              </div>
              {activeProject.url && (
                <div className="mt-6 text-center">
                  <motion.a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-6 py-2 rounded-2xl font-medium transition-all duration-300 bg-gray-800 text-white hover:bg-gray-700"
                  >
                    View on GitHub
                  </motion.a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= THEME TOGGLE ================= */}
      <motion.button
        onClick={() => setDark(!dark)}
        animate={{ rotate: dark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border border-white/20 bg-white/10 shadow-lg"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

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
              whileHover={{ scale: 1.05 }}
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Omar Abdelmonem Mohamed
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg opacity-70"
            >
              Junior Software Engineer (Flutter & Web)
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start"
            >
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
            </motion.div>
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
              " border rounded-2xl p-10 backdrop-blur-xl shadow-lg leading-relaxed transition hover:shadow-xl"
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
            <motion.div
              whileHover={{ y: -4 }}
              className={
                (dark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-gray-200") +
                " border rounded-2xl p-10 backdrop-blur-xl shadow-lg transition hover:shadow-xl"
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
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={
                      (dark
                        ? "bg-indigo-500/10 border-indigo-500/20"
                        : "bg-indigo-100 border-indigo-200") +
                      " px-4 py-2 rounded-full text-sm border transition"
                    }
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              whileHover={{ y: -4 }}
              className={
                (dark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-gray-200") +
                " border rounded-2xl p-10 backdrop-blur-xl shadow-lg transition hover:shadow-xl"
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
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                    <span className="opacity-90">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
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

          <motion.div
            whileHover={{ y: -8 }}
            className={
              (dark
                ? "bg-white/5 border-white/10 hover:bg-white/10"
                : "bg-white/70 border-gray-200 hover:bg-white/80") +
              " border rounded-2xl p-8 backdrop-blur-xl shadow-lg transition duration-300 hover:shadow-xl"
            }
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">
                  Canadian International College (CIC)
                </h3>
                <p className="text-indigo-500 font-medium mt-2 text-lg">
                  Bachelor of Business Information Technology (2020 – 2024)
                </p>
                <p className="text-sm opacity-60 mt-1">El Sheikh Zayed, Egypt</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
              <div>
                <p className="opacity-90">
                  <span className="font-medium text-indigo-400">Graduation Project: </span>
                  <span className="font-medium">SubTrain</span> – Flutter Mobile Application for Train & Subway Ticketing
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-sm border border-indigo-500/30 font-medium"
                >
                  ⭐ A+ Grade
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30 font-medium"
                >
                  🏆 Ranked 2nd Place
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ================= PROJECTS ================= */}
        <motion.section
          ref={projectsRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="w-28 h-[3px] bg-indigo-500 rounded-full mt-2" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActiveProject(project)}
                className={
                  (dark
                    ? "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
                    : "bg-white/70 border-gray-200 hover:bg-white/90 hover:border-gray-300") +
                  " border rounded-2xl p-8 shadow-xl cursor-pointer backdrop-blur-xl transition duration-300 hover:shadow-2xl"
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg flex-1">{project.title}</h3>
                  {/* <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400"
                  >
                    New
                  </motion.span> */}
                </div>
                <p className="text-xs opacity-60 mb-3 font-medium">{project.duration}</p>
                <p className="text-sm opacity-80 mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full opacity-60">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= CONTACT ================= */}
        <motion.section
          ref={contactMeRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">Contact</h2>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center opacity-80">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Mail size={18} /> omarabdelmonem91@gmail.com
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Phone size={18} /> +201093818755
            </motion.div>
            <div className="flex gap-6">
              <motion.a
                href="https://github.com/OmarMonem02"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/omar-monem2002"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.section>

        <footer className="text-center opacity-50 pt-16">
          © {new Date().getFullYear()} Omar Abdelmonem Mohamed
        </footer>
      </div>
    </div>
  );
}