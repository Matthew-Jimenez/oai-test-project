import IEXProvider from "./context/IEXProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CompanyPage from "./pages/Company";
import CompaniesPage from "./pages/Companies";

function App() {
  return (
    <IEXProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CompaniesPage />} />
          <Route path="/:symbol" element={<CompanyPage />} />
        </Routes>
      </Router>
    </IEXProvider>
  );
}

export default App;
