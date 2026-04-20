import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App({ themeMode, onToggleTheme }) {
  return (
    <>
      <Navbar themeMode={themeMode} onToggleTheme={onToggleTheme} />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
