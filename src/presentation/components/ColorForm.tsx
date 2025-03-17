import { useState, FormEvent } from 'react';
import { Color } from '../../core/entities/Color';
import { SketchPicker } from 'react-color';

interface ColorFormProps {
  onSubmit: (color: Color) => void;
}

const ColorForm = ({ onSubmit }: ColorFormProps) => {
  const [name, setName] = useState('');
  const [hex, setHex] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ id: Date.now().toString(), name, hex });
    setName('');
    setHex('');
  };

  return (
    <div className="w-1/3">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md mx-auto mb-6"
      >
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Add New Color
        </h2>
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border-2 border-gray-600 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Color Name"
          />
        </div>

        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
          <label
            htmlFor="colorPicker"
            className="text-white font-semibold mb-2"
          >
            Pick a Color
          </label>
          <div className="p-4 border-2 border-gray-600 rounded-lg">
            <SketchPicker
              color={hex}
              onChange={(color: Pick<Color, 'hex'>) => setHex(color.hex)}
              className="rounded-lg"
            />
          </div>
          <p className="mt-2 text-white">
            Selected Color: <span className="font-bold">{hex}</span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add Color
        </button>
      </form>
    </div>
  );
};

export default ColorForm;
