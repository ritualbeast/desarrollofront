
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Encuestas from './views/encuestas/Encuestas';
import Dashboard from './views/dashboard/Dashboard';
import CrearEncuestas from './views/encuestas/CrearEncuestas';
import EliminarEncuestas from './views/encuestas/EliminarEncuestas';
import FormatoEncuesta from './views/encuestas/components/FormatoEncuesta';
import BancopreguntasEncuestas from './views/encuestas/components/BancopreguntasEncuestas';
// import encuestas con alias
import IPN from './views/IPN/IPN';
import EstiloEncuesta from './views/encuestas/components/EstiloEncuesta';
// create a new component called App

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="encuesta" element={<Encuestas />} />
            <Route path="encuesta/crearEncuesta" element={<CrearEncuestas />} />
            <Route path="encuesta/eliminarEncuesta" element={<EliminarEncuestas />} />
            <Route path="formatoEncuesta" element={<FormatoEncuesta />} />
            <Route path="bancopreguntas" element={<BancopreguntasEncuestas />} />
            <Route path="ipn" element={<IPN />} />
            <Route path= "reporte" element={<IPN />} />
            <Route path= "estilos" element={<EstiloEncuesta />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
