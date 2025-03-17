import { Color } from '../../core/entities/Color.ts';

interface ColorCardProps {
  color: Color;
  deleteColor: (id: string) => void;
}

const ColorCard = ({ color, deleteColor }: ColorCardProps) => (
  <div
    key={color.id}
    className="flex-shrink-0 w-75 h-75 rounded-2xl border border-gray-600 p-4 flex flex-col items-center justify-center gap-4 shadow-xl hover:scale-95 transition-all snap-start"
    style={{ backgroundColor: color.hex }}
  >
    <p className="text-white font-bold text-2xl mb-2">{color.name}</p>
    <button
      onClick={() => deleteColor(color.id)}
      className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition cursor-pointer"
    >
      Delete
    </button>
  </div>
);

export default ColorCard;
