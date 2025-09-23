import { useState } from "react";
import { registerUser, loginUser } from "../auth";

const AuthForm = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCred;
      if (isLogin) {
        userCred = await loginUser(email, password);
      } else {
        userCred = await registerUser(email, password);
      }
      onAuthSuccess(userCred.user); // Send user back to App
      setEmail(""); // Clear email
      setPassword(""); // Clear password
    } catch (error) {
      alert("Auth Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lime-500 via-emerald-600 to-green-900 p-6">
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-white/20">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition shadow"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Switch button */}
        <button
          onClick={() => {
            setIsLogin(!isLogin); // ✅ Switch mode
            setEmail(""); // ✅ Clear email
            setPassword(""); // ✅ Clear password
          }}
          className="mt-6 text-sm text-white/90 underline hover:text-white"
        >
          {isLogin ? "Need an account? Register" : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
