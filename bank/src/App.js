import { Routes, Route } from "react-router-dom";
import BankSystemInterface from './page';


function App() {
  return (
    <Routes>
   
    <Route path="/" element={<BankSystemInterface />} />
  </Routes>
  );
}

export default App;
