import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../providers/graphql/login";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Screens } from "../App";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

interface LoginScreenProps {
  setUser: (user: { email: string }) => void;
  setToast: (toastProps: {
    message: string;
    type: "error" | "success";
  }) => void;
  setCurrentScreen: (current: Screens) => void;
}

const LoginScreen = ({
  setToast,
  setUser,
  setCurrentScreen,
}: LoginScreenProps) => {
  const { handleSubmit, register } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      setToast({ message: "Login realizado com sucesso!", type: "success" });
      setUser({ email: data.email });
      setCurrentScreen("welcome");
    } catch (error) {
      setToast({ message: "Email ou senha inválidos!", type: "error" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center p-5"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 w-full max-w-md shadow-2xl border border-white/20"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-600">Faça login para continuar</p>
        </motion.div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-semibold text-gray-700 text-sm"
            >
              Email
            </label>
            <div className="relative flex items-center">
              <Mail size={20} className="absolute left-4 text-gray-500 z-10" />
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-semibold text-gray-700 text-sm"
            >
              Senha
            </label>
            <div className="relative flex items-center">
              <Lock size={20} className="absolute left-4 text-gray-500 z-10" />
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none py-4 px-4 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 mt-2 flex items-center justify-center min-h-[52px] hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              "Entrar"
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LoginScreen;
