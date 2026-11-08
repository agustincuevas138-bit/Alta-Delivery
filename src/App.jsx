import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Estado inicial leyendo de localStorage
  const [direcciones, setDirecciones] = useState(() => {
    const saved = localStorage.getItem("delivery_direcciones");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        alias: "Casa",
        calle: "Av. Rivadavia",
        numero: "1234",
        piso: "2",
        depto: "A",
        localidad: "Almagro",
        ciudad: "Buenos Aires",
        isPrincipal: true,
      },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    coordenadas: "",
    calle: "",
    numero: "",
    piso: "",
    depto: "",
    ciudad: "",
    localidad: "",
    aclaraciones: "",
    alias: "",
  });

  // Guardar en localStorage al cambiar las direcciones
  useEffect(() => {
    localStorage.setItem("delivery_direcciones", JSON.stringify(direcciones));
  }, [direcciones]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    
    // Crear nueva dirección
    const nuevaDireccion = {
      ...formData,
      id: Date.now(),
      isNueva: true,
      isPrincipal: false
    };

    setDirecciones([...direcciones, nuevaDireccion]);
    
    // Resetear form y cerrar modal
    setFormData({
      coordenadas: "", calle: "", numero: "", piso: "", depto: "", 
      ciudad: "", localidad: "", aclaraciones: "", alias: ""
    });
    setIsModalOpen(false);
    
    // Mostrar Toast de éxito
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="app-layout">
      {/* Barra de Navegación */}
      <nav className="navbar">
        <h1 className="logo">Mi Delivery</h1>
        <div className="nav-links">
          <span>Restaurantes</span>
          <span>Mis pedidos</span>
          <span className="active">Mi cuenta</span>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="main-container">
        {showToast && (
          <div className="toast-success">
            Dirección guardada correctamente
          </div>
        )}

        <header className="page-header">
          <div>
            <h2>Mis direcciones</h2>
            <p>Elegí dónde querés recibir tus pedidos</p>
          </div>
          <button className="btn-agregar" onClick={() => setIsModalOpen(true)}>
            + Agregar dirección
          </button>
        </header>

        <section className="direcciones-list">
          {direcciones.map((dir) => (
            <div className="direccion-card" key={dir.id}>
              <div className="direccion-info">
                <h4>{dir.alias}</h4>
                <p>
                  {dir.calle} {dir.numero}
                  {dir.piso && `, Piso ${dir.piso}`}
                  {dir.depto && `, Depto ${dir.depto}`} - {dir.localidad}, {dir.ciudad}
                </p>
              </div>
              <div className="direccion-badges">
                {dir.isPrincipal && <span className="badge principal">Principal</span>}
                {dir.isNueva && <span className="badge nueva">Nueva</span>}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Modal Agregar Dirección */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Agregar dirección</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form className="modal-form" onSubmit={handleGuardar}>
              <div className="form-group full-width">
                <label>Coordenadas *</label>
                <input required type="text" name="coordenadas" value={formData.coordenadas} onChange={handleInputChange} placeholder="-34.6037, -58.3816" />
              </div>
              
              <div className="form-group full-width">
                <label>Calle *</label>
                <input required type="text" name="calle" value={formData.calle} onChange={handleInputChange} placeholder="Av. Corrientes" />
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>Número *</label>
                  <input required type="text" name="numero" value={formData.numero} onChange={handleInputChange} placeholder="1234" />
                </div>
                <div className="form-group">
                  <label>Piso</label>
                  <input type="text" name="piso" value={formData.piso} onChange={handleInputChange} placeholder="3" />
                </div>
                <div className="form-group">
                  <label>Depto</label>
                  <input type="text" name="depto" value={formData.depto} onChange={handleInputChange} placeholder="B" />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Ciudad *</label>
                  <select required name="ciudad" value={formData.ciudad} onChange={handleInputChange}>
                    <option value="">Selecciona tu ciudad</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Localidad *</label>
                  <select required name="localidad" value={formData.localidad} onChange={handleInputChange}>
                    <option value="">Selecciona tu localidad</option>
                    <option value="Almagro">Almagro</option>
                    <option value="Balvanera">Balvanera</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Aclaraciones</label>
                <input type="text" name="aclaraciones" value={formData.aclaraciones} onChange={handleInputChange} placeholder="Timbre 3B, portón negro" />
              </div>

              <div className="form-group full-width">
                <label>Alias *</label>
                <input required type="text" name="alias" value={formData.alias} onChange={handleInputChange} placeholder="Trabajo" />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;