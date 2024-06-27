interface CatalogDisplayProps {
  categories: string[];
  onSelect: (selectedCategory: string) => void;
  selected: string;
}
export default function CatalogDisplay(props: CatalogDisplayProps) {
  const { categories, onSelect, selected } = props;
  return (
    <>
      <select onChange={(e) => onSelect(e.target.value)} value={selected}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
}
