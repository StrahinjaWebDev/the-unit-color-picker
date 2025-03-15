import { Color } from '../../core/entities/Color.ts';

interface ColorCardProps {
  color: Color;
  onDelete: () => void;
}

const ColorCard = ({ color, onDelete }: ColorCardProps) => (
  <div className="p-4 border rounded-lg" style={{ backgroundColor: color.hex }}>
    <p className="text-white font-bold">{color.name}</p>
    <button
      onClick={onDelete}
      className="mt-2 p-2 bg-red-500 text-white rounded"
    >
      Delete
    </button>
  </div>
);

export default ColorCard;
