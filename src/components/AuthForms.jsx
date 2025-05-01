import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { EarthLogo } from "./EarthLogo"; // Import the EarthLogo component
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schemas using Zod
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function AuthForms() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);

  // Setup React Hook Form for login
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Setup React Hook Form for signup
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const result = await login(data.username, data.password);

      if (result.success) {
        toast.success("Login successful!");
        // Reset form after submission
        resetLogin();
        // Navigate to home page
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data) => {
    setLoading(true);
    try {
      const result = await signup(data.username, data.password);

      if (result.success) {
        toast.success("Account created successfully!");
        // Reset form and switch to login tab after successful signup
        resetSignup();
        setTimeout(() => setActiveTab("login"), 2000);
      } else {
        toast.error(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col justify-center px-6 py-10 bg-gray-50">
      {/* Toast container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Replace the Tailwind image with our custom EarthLogo component */}
        <EarthLogo size={48} className="mx-auto" />

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 text-center text-2xl font-bold text-gray-900"
        >
          {activeTab === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </motion.h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-2 font-medium text-sm relative ${
              activeTab === "login"
                ? "text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
            {activeTab === "login" && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600"
                initial={false}
              />
            )}
          </button>
          <button
            className={`flex-1 py-2 font-medium text-sm relative ${
              activeTab === "signup"
                ? "text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
            {activeTab === "signup" && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600"
                initial={false}
              />
            )}
          </button>
        </div>

        {/* Form Containers with Animations */}
        <AnimatePresence mode="wait">
          {activeTab === "login" ? (
            <motion.div
              key="login-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <form
                className="space-y-6"
                onSubmit={handleSubmitLogin(handleLogin)}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      {...registerLogin("username")}
                      type="text"
                      autoComplete="username"
                      className={`block w-full rounded-md border ${
                        loginErrors.username
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    />
                    {loginErrors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {loginErrors.username.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      {...registerLogin("password")}
                      type="password"
                      autoComplete="current-password"
                      className={`block w-full rounded-md border ${
                        loginErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    />
                    {loginErrors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <form
                className="space-y-6"
                onSubmit={handleSubmitSignup(handleSignup)}
              >
                <div>
                  <label
                    htmlFor="signup-username"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="signup-username"
                      {...registerSignup("username")}
                      type="text"
                      autoComplete="username"
                      className={`block w-full rounded-md border ${
                        signupErrors.username
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    />
                    {signupErrors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {signupErrors.username.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="signup-password"
                      {...registerSignup("password")}
                      type="password"
                      autoComplete="new-password"
                      className={`block w-full rounded-md border ${
                        signupErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    />
                    {signupErrors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {signupErrors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      {...registerSignup("confirmPassword")}
                      type="password"
                      autoComplete="new-password"
                      className={`block w-full rounded-md border ${
                        signupErrors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                    />
                    {signupErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {signupErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-sm text-gray-500"
        >
          {activeTab === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              setActiveTab(activeTab === "login" ? "signup" : "login")
            }
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {activeTab === "login" ? "Sign up here" : "Log in here"}
          </motion.button>
        </motion.p>
      </div>
    </div>
  );
}
