"use client";

import { motion } from "framer-motion";
import { User, LogOut, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  user: { email: string };
  onLogout: () => void;
}

const WelcomeScreen = ({ user, onLogout }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center p-5 relative"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 w-full max-w-lg shadow-2xl border border-white/20 text-center relative overflow-hidden"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white"
          >
            <Sparkles size={48} />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-3"
          >
            Bem-vindo!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-lg text-gray-600"
          >
            Olá, é ótimo ter você aqui!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex items-center gap-4 bg-blue-500/10 p-5 rounded-2xl mb-8"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
            <User size={24} />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-base font-semibold text-gray-700 mb-1">
              Usuário logado
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500/10 text-blue-600 border-2 border-blue-500/20 py-3 px-6 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2 hover:bg-blue-500/20 hover:border-blue-500/40 hover:-translate-y-0.5"
          >
            <LogOut size={20} />
            Sair
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-30"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 12}%`,
                top: `${80 + Math.sin(i) * 10}%`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
