import svgManager from '../../assets/svg';

const archiveSVG = svgManager.getSVG('archive');
const penToolSVG = svgManager.getSVG('pen-tool');
const serverSVG = svgManager.getSVG('server');

const lista = [
  {
    nombre: "Banco de Preguntas",
    icono: archiveSVG
  },
  {
    nombre: "Estilo",
    icono: penToolSVG
  },
  {
    nombre: "Formato",
    icono: serverSVG
  }
];

export { lista };
