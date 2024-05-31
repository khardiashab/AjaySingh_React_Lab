import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import AddExpenseForm from "./components/AddExpenseForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/add-expense" element={<AddExpenseForm />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
