"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 min-h-screen px-6 py-12 md:px-20 text-gray-800 dark:text-gray-200 transition-colors duration-300"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold mb-6 text-blue-600 dark:text-blue-400">
          About PresencePro
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-300"
        >
          <strong>PresencePro</strong> is a smart, biometric-based attendance system
          that blends cutting-edge hardware with a sleek web interface to
          revolutionize how institutions manage student presence tracking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Key Highlights
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Fingerprint-based attendance using ESP32 and R307 biometric module.</li>
            <li>Real-time syncing between hardware and backend server over Wi-Fi using HTTP.</li>
            <li>Admin panel to manage students, subjects, attendance records, and timetable.</li>
            <li>Live hardware status monitoring with built-in error handling on the web app.</li>
            <li>Fast and responsive frontend built with modern design practices.</li>
            <li>End-to-end security with JWT authentication and protected API routes.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Tech Stack</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Frontend:</strong> React.js, TypeScript, Tailwind CSS</li>
            <li><strong>Backend:</strong> Node.js, Express.js, Prisma ORM</li>
            <li><strong>Database:</strong> PostgreSQL</li>
            <li><strong>Microcontroller:</strong> ESP32 with fingerprint module</li>
            <li><strong>Communication:</strong> HTTP-based API and Wi-Fi network</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Team</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            PresencePro was brought to life by a dedicated group of B.Tech final-year students with a passion for real-world problem-solving and innovation. Meet the creators:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["Shikhar Singh", "Manas Puri", "Pavan Yadav", "Prince Chaurasia"].map((name, idx) => (
              <motion.div
                key={name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + idx * 0.2, duration: 0.6 }}
                className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow text-center"
              >
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {
                    name === "Shikhar Singh"
                      ? "Full Stack Developer & Hardware Integrator"
                      : name === "Manas Puri"
                      ? "Backend API & Database Designer"
                      : name === "Pavan Yadav"
                      ? "UI/UX Designer & Frontend Engineer"
                      : "Testing & Deployment Specialist"
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="text-md text-gray-700 dark:text-gray-300"
        >
          <p>
            Our mission with PresencePro is to digitize and simplify attendance
            management, making it more transparent, secure, and efficient for
            institutions everywhere.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
