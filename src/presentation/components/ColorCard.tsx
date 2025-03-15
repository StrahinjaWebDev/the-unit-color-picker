import { Color } from '../../core/entities/Color.ts';

interface ColorCardProps {
  color: Color;
  onDelete: () => void;
}

const ColorCard = ({ color, onDelete }: ColorCardProps) => (
  <div
    className="flex-shrink-0 w-72 h-72 rounded-lg border border-gray-600 p-4 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-all"
    style={{ backgroundColor: color.hex }}
  >
    <p className="text-white font-bold text-lg mb-2">{color.name}</p>
    <button
      onClick={onDelete}
      className="mt-auto p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
    >
      Delete
    </button>
  </div>
);

export default ColorCard;
