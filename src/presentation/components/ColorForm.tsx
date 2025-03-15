import { useState } from 'react';
import { Color } from '../../core/entities/Color.ts';

interface ColorFormProps {
  onSubmit: (color: Color) => void;
}

const ColorForm = ({ onSubmit }: ColorFormProps) => {
  const [name, setName] = useState('');
  const [hex, setHex] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: Date.now().toString(), name, hex });
    setName('');
    setHex('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          placeholder="Color Name"
        />
      </div>
      <div>
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="p-2 border rounded"
          placeholder="Hex Value"
        />
      </div>
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
        Add Color
      </button>
    </form>
  );
};

export default ColorForm;
