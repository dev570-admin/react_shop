type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

function SearchBar({ value, onChange, className = "search-bar" }: SearchBarProps) {
  return (
    <input
      className={className}
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;