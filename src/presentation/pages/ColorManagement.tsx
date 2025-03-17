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
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const ColorList = () => {
  const { colors, loadColors, loadColorsByName } = useColors();
  const [filter, setFilter] = useState(useGetSearchParam('name'));
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<string | null>(null);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const addColor = async (color: Color) => {
    const { name, hex } = color;

    if (!name || !hex) {
      toast.error(`Color ${!name ? 'name' : 'hex'} is required`);
      return;
    }

    await new AddColor(new ColorRepository()).execute(color);
    toast.success('Color added successfully');
    loadColors();
  };

  const deleteColor = async (id: string) => {
    const deleteColorUseCase = new DeleteColor(new ColorRepository());
    await deleteColorUseCase.execute(id);
    toast.success('Color deleted successfully');
    setCurrentIndex(0);
    loadColors();
  };

  const handleConfirmDelete = () => {
    if (colorToDelete) {
      deleteColor(colorToDelete);
      setIsModalOpen(false);
      setColorToDelete(null);
    }
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
    <div className="p-12 bg-[#181A2A] min-h-screen w-full flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white text-center p-12 tracking-wide">
        Color Management
      </h1>

      <div className="flex gap-24">
        <ColorForm onSubmit={addColor} />

        <div>
          <ColorFilter filter={filter} setFilter={setFilter} />

          <ColorDisplay
            colors={colors}
            deleteColor={(id) => {
              setColorToDelete(id);
              setIsModalOpen(true);
            }}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setColorToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ColorList;
