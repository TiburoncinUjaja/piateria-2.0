import React, { useEffect, useState } from "react";
import { obtenerProductos, obtenerProducto} from "../hooks/useProductos.js";
import Globos from "../img/globosRojos.jpg";
import Modal from "./ModalProduct";

const imgURL = "http://localhost:4000/uploads/images"

const Flashcard = ({ producto }) => {
  // const handleProductoClick = (key) => {
  //   setSelectedProducto(producto);
  //   setShowModal(true);
  // };
  const closeModal = () => {
    setSelectedProducto(null);
    setShowModal(false);
  };
  const fethProducto = async (key) => {
    //console.log(searchTerm)
    const productoObtenido = await obtenerProducto(key);
    //console.log(productosObtenidos);
    setProductos(productoObtenido);
    
  };
  return (
    <div className="lg:w-auto md:w-1/2 p-4 bg-slate-200 relative rounded-lg hover:drop-shadow-2xl transition-shadow duration-500 ">
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={`${imgURL}/${producto.imagen}`}
        />
      </a>
      <div className="mt-4 ">
        <h2 className="text-gray-900 title-font text-lg font-medium">
          { producto.nombre }
        </h2>
        <p className="mt-1">{producto.precio}</p>
        <button onClick={fethProducto(producto._id)} className="absolute 2xl bg-Azul-oscuro p-2 px-4 text-white rounded-full right-3 bottom-3 hover:bg-Azul-claro hover:scale-105 duration-100 font-bold">
          +
        </button>
      </div>
    </div>
  )
}

const FlashcardPage = ({searchTerm}) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fethProductos = async () => {
      //console.log(searchTerm)
      const productosObtenidos = await obtenerProductos(searchTerm);
      //console.log(productosObtenidos);
      setProductos(productosObtenidos);
      
    };
    fethProductos();
  }, [searchTerm]);

  return (
    <section className="">
      <div className="container px-5 py-20 mx-auto ">
        {/* Titulo */}
        <div className="mb-10 max-w-56">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-Azul-oscuro">
            Productos
          </h1>
          <div className="h-1 w-20 bg-Azul-oscuro rounded"></div>
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {productos.map(producto => (
                <Flashcard key={producto._id} producto={producto}/>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FlashcardPage;
