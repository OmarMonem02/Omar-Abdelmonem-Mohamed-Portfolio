import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function Contact({ contactMeRef }) {
  return (
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
        <div className="flex items-center gap-2">
          <Mail size={18} />
          omarabdelmonem91@gmail.com
        </div>

        <div className="flex items-center gap-2">
          <Phone size={18} />
          +201093818755
        </div>
      </div>
    </motion.section>
  );
}