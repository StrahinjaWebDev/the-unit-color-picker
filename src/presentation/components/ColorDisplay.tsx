import { Color } from '../../core/entities/Color.ts';

interface ColorDisplayProps {
  colors: Color[];
  deleteColor: (id: string) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const ColorDisplay = ({
  colors,
  deleteColor,
  currentIndex,
  setCurrentIndex,
}: ColorDisplayProps) => {
  return (
    <div className="overflow-x-auto scroll-smooth h-80 mt-4">
      <div className="flex gap-6">
        <button
          onClick={() => setCurrentIndex(0)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          First
        </button>
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + colors.length) % colors.length)
          }
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Left
        </button>

        {colors.length > 0 && (
          <div
            key={colors[currentIndex].id}
            className="flex-shrink-0 w-55 h-55 rounded-lg border border-gray-600 p-4 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-all snap-start"
            style={{ backgroundColor: colors[currentIndex].hex }}
          >
            <p className="text-white font-bold text-lg mb-2">
              {colors[currentIndex].name}
            </p>
            <button
              onClick={() => deleteColor(colors[currentIndex].id)}
              className="mt-auto p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        )}

        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % colors.length)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Right
        </button>

        <button
          onClick={() => setCurrentIndex(colors.length - 1)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Last
        </button>
      </div>
      <div className="text-center mt-4">
        <p className="text-white text-lg">
          Total colors {colors.length} color{colors.length > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};
export default ColorDisplay;
