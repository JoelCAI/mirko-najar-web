// src/components/ui/IconSelector.jsx
import { iconDictionary } from '../../config/iconDictionary';

const IconSelector = ({ value, onChange, className = "" }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className={`c-icon-selector ${className}`.trim()}
      style={{
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        fontSize: '14px',
        width: '100%',
        cursor: 'pointer'
      }}
    >
      <option value="">Sin icono (Ninguno)</option>
      
      {Object.entries(iconDictionary).map(([rubroKey, rubroData]) => (
        <optgroup key={rubroKey} label={rubroData.label}>
          {rubroData.icons.map((icon) => (
            <option key={icon.name} value={icon.name}>
              {icon.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default IconSelector;