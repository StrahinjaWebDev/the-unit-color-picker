import useSetSearchParam from '../../app/hooks/useSetSearchParam.ts';

interface ColorFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const ColorFilter = ({ filter, setFilter }: ColorFilterProps) => {
  const setSearchValue = useSetSearchParam();

  const onFilter = (newFilter: string) => {
    setFilter(newFilter);
    setSearchValue('name', newFilter || null);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={filter}
        onChange={(e) => onFilter(e.target.value)}
        className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-400"
        placeholder="Search for a color..."
      />
    </div>
  );
};

export default ColorFilter;
