import { useEffect, useState, useRef } from 'react';
import { useColors } from '../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import ColorFilter from '../components/ColorFilter';
import ColorForm from '../components/ColorForm';
import { ColorRepository } from '../../data/repositories/ColorRepository';
import { Color } from '../../core/entities/Color.ts';
import { AddColor } from '../../core/use-cases/addColor.ts';
import { DeleteColor } from '../../core/use-cases/deleteColor.ts';

const ColorList = () => {
  const { colors, loadColors, loadColorsByName } = useColors();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('name') || '');
  const [currentIndex, setCurrentIndex] = useState(0);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const addColor = async (color: Color) => {
    const addColorUseCase = new AddColor(new ColorRepository());
    await addColorUseCase.execute(color);
    loadColors();
  };

  const deleteColor = async (id: string) => {
    const deleteColorUseCase = new DeleteColor(new ColorRepository());
    await deleteColorUseCase.execute(id);
    loadColors();
  };

  useEffect(() => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      if (filter) {
        loadColorsByName(filter);
      } else {
        loadColors();
      }
    }, 1000);

    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [filter]);

  useEffect(() => {
    if (filter) {
      setSearchParams({ name: filter });
    } else {
      setSearchParams({});
    }
  }, [filter, setSearchParams]);

  return (
    <div className="p-5 bg-gray-500 min-h-screen w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white text-center mb-4">
        Color Management
      </h1>

      <div className="flex gap-6">
        {/* ColorForm Section on the Left */}
        <div className="w-1/3">
          <ColorForm onSubmit={addColor} />
        </div>

        {/* Right Section with ColorFilter and Buttons */}
        <div className="flex-1">
          <ColorFilter
            onFilter={(newFilter: string) => setFilter(newFilter)}
            initialValue={filter}
          />

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
                  setCurrentIndex(
                    (prevIndex) =>
                      (prevIndex - 1 + colors.length) % colors.length,
                  )
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
                onClick={() =>
                  setCurrentIndex(
                    (prevIndex) => (prevIndex + 1) % colors.length,
                  )
                }
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorList;
