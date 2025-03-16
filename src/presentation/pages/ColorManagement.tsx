import { useEffect, useState, useRef } from 'react';
import { useColors } from '../../app/hooks/useColors.ts';
import { toast } from 'react-hot-toast';
import ColorFilter from '../components/ColorFilter';
import ColorForm from '../components/ColorForm';
import { Color } from '../../core/entities/Color.ts';
import { AddColor } from '../../core/use-cases/addColor.ts';
import { DeleteColor } from '../../core/use-cases/deleteColor.ts';
import ColorDisplay from '../components/ColorDisplay.tsx';
import { ColorRepository } from '../../data/repositories/ColorRepository.ts';
import useGetSearchParam from '../../app/hooks/useGetSearchParam.ts';

const ColorList = () => {
  const { colors, loadColors, loadColorsByName } = useColors();
  const [filter, setFilter] = useState(useGetSearchParam('name'));
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
    setCurrentIndex(0);
    loadColors();
  };

  useEffect(() => {
    const fetchColors = () => {
      if (filter) {
        loadColorsByName(filter)
          .unwrap()
          .catch(() => toast.error(`Color not found with name: ${filter}`));
      } else {
        loadColors();
        setCurrentIndex(0);
      }
    };

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(fetchColors, 500);

    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [filter]);

  return (
    <div className="p-5 bg-gray-500 min-h-screen w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white text-center mb-4">
        Color Management
      </h1>

      <div className="flex gap-6">
        <ColorForm onSubmit={addColor} />

        <div>
          <ColorFilter filter={filter} setFilter={setFilter} />

          <ColorDisplay
            colors={colors}
            deleteColor={deleteColor}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorList;
