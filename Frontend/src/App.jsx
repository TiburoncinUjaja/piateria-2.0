import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import { AboutUs } from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PageAPI from "./pages/PageAPI";
import { UserProvider } from "./context/UserContext";
import RecuperarPass from "./pages/RecuperarPass";
import validarUsuario from "./pages/RecuperarPass";
import ResetPassword from "./pages/ResetPassword";


function App() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
    <UserProvider>
      <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} ></Header>

        <section className="w-5/6 mx-auto px-8 pt-10">
          <Routes>
            <Route path="/" element={<Inicio searchTerm={searchTerm}></Inicio>}></Route>
            <Route path="/Admin" element={<Admin searchTerm={searchTerm}></Admin>}></Route>
            <Route path="/SobreNosotros" element={<AboutUs></AboutUs>}></Route>
            <Route path="/contactenos" element={<Contact></Contact>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/carrito" element={<Cart></Cart>}></Route>
            <Route path="/API" element={<PageAPI></PageAPI>}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
            <Route path="/recuperar-password" element={<RecuperarPass />} />
            <Route path="/validar-usuario" element={<validarUsuario />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
          </Routes>
        </section>
      </div>
      <Footer />
    </UserProvider>

    </>
  );
}

export default App;

