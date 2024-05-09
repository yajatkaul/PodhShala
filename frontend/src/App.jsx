import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Cart from "./pages/Cart";
import CheckedOut from "./pages/CheckedOut";
import PredictCrop from "./pages/PredictCrop";
import FertizliersPredict from "./pages/FertilizerPredict";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/crop-predict" element={<PredictCrop />} />
        <Route path="/fertilizer-predict" element={<FertizliersPredict />} />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/" element={<Main />} />
        <Route
          path="/cart"
          element={!authUser ? <Navigate to="/login" /> : <Cart />}
        />
        <Route
          path="/checkout"
          element={!authUser ? <Navigate to="/login" /> : <CheckedOut />}
        />
      </Routes>
      <Toaster
        toastOptions={{
          error: {
            style: {
              color: "#fff",
              background: "#333",
            },
          },
        }}
      />
    </>
  );
}

export default App;
