/* archivo CategorySelector.jsx  */
import { useState, useEffect } from "react";

export const CategorySelector = ({ reloadCategorias }) => {

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subcategorias, setSubcategorias] = useState([]);

  // Obtener categorías
  useEffect(() => {

    const fetchCategorias = async () => {
      try {

        const res = await fetch("http://localhost:3000/api/categories");
        const data = await res.json();

        // Filtrar solo categorías principales
        const principales = data.data.filter(
          (cat) => cat.parentId === null
        );

        setCategorias(principales);

      } catch (error) {
        console.log("❌ Error obteniendo categorías");
      }
    };

    fetchCategorias();

  }, [reloadCategorias]); // 👈 AQUI ESTA EL CAMBIO



  // Obtener subcategorías cuando cambia la categoría seleccionada
  useEffect(() => {

    const fetchSubcategorias = async () => {

      if (!categoriaSeleccionada) {
        setSubcategorias([]);
        return;
      }

      try {

        const res = await fetch("http://localhost:3000/api/categories");
        const data = await res.json();

        // Buscar categoría seleccionada
        const cat = data.data.find(
          (c) => c.id === parseInt(categoriaSeleccionada)
        );

        setSubcategorias(cat?.children || []);

      } catch (error) {
        console.log("❌ Error obteniendo subcategorías");
      }
    };

    fetchSubcategorias();

  }, [categoriaSeleccionada]);



  return (
    <div className="flex flex-col gap-3">

      <select
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      >
        <option value="">Selecciona una categoría</option>

        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>


      {subcategorias.length > 0 && (
        <select name="subCategoria">

          <option value="">
            Selecciona una subcategoría
          </option>

          {subcategorias.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}

        </select>
      )}

    </div>
  );
};