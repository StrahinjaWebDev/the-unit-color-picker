import { Color } from '../../core/entities/Color.ts';
import Button from './Button.tsx';
import ColorCard from './ColorCard.tsx';

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
    <div className="overflow-x-auto scroll-smooth  mt-4">
      <div className="flex gap-14">
        <Button children={'First'} onClick={() => setCurrentIndex(0)} />

        <Button
          children={'Left'}
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + colors.length) % colors.length)
          }
        />

        {colors.length > 0 && (
          <ColorCard color={colors[currentIndex]} deleteColor={deleteColor} />
        )}

        <Button
          children={'Right'}
          onClick={() => setCurrentIndex((currentIndex + 1) % colors.length)}
        />

        <Button
          children={'Last'}
          onClick={() => setCurrentIndex(colors.length - 1)}
        />
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-400 text-center mt-2 text-xl">
          Total colors {colors.length} color{colors.length > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};
export default ColorDisplay;
