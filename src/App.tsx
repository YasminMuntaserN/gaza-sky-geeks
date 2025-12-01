import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage";


const App: React.FC = () => {
  return (
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
  );
};

export default App;