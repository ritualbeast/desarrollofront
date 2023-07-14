import { ChromePicker, AlphaPicker, SliderPicker } from 'react-color';
import { useState } from 'react';
import '../../styles/customSketchpicker.css'

const CustomSketchPicker = ({ handleCloseColorPicker }) => {
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [savedColors, setSavedColors] = useState([]);

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleAddColor = () => {
    if (savedColors.length < 14) {
      setSavedColors((prevColors) => [...prevColors, currentColor]);
    }
  };

  return (
    <div className='customSketchPicker'>
      <div className="colorOptions">
        <div className="colorPreview" style={{ backgroundColor: currentColor }}></div>
        <button onClick={handleAddColor}>Añadir</button>
      </div>
      <ChromePicker
        disableAlpha
        color={currentColor}
        onChange={handleColorChange}
        renderers={{ slider: SliderPicker }}
      />
      <div className="savedColors">
        {savedColors.map((color, index) => (
          <div className="colorCircle" key={index} style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </div>
  );
};

export default CustomSketchPicker;
