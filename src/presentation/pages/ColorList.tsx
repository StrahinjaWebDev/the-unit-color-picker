import { useEffect, useState } from 'react';
import { useColors } from '../../app/hooks';
import ColorCard from '../components/ColorCard';
import ColorFilter from '../components/ColorFilter';
import ColorForm from '../components/ColorForm';
import { ColorRepository } from '../../data/repositories/ColorRepository';
import { Color } from '../../core/entities/Color.ts';
import { AddColor } from '../../core/use-cases/addColor.ts';
import { DeleteColor } from '../../core/use-cases/deleteColor.ts';

const ColorList = () => {
  const { colors, status, loadColors } = useColors();
  const [filter, setFilter] = useState('');

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(filter.toLowerCase()),
  );

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
    loadColors();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Color Management</h1>
      <ColorFilter onFilter={setFilter} />
      <ColorForm onSubmit={addColor} />
      <div className="flex gap-4">
        {filteredColors.map((color) => (
          <ColorCard
            key={color.id}
            color={color}
            onDelete={() => deleteColor(color.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorList;
