import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
