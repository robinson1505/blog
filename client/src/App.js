import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import IndexPage from "./components/pages/IndexPage";
import LoginPage from "./components/pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
