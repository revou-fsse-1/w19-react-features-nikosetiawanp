export default function FilterByCategoryButton(props: {
  categoryName: string;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const applyCategoryFilter = () => {
    props.setCategoryFilter(
      (categoryFilter) => (categoryFilter = props.categoryName)
    );
  };

  return props.categoryFilter === props.categoryName ? (
    <button
      onClick={() => {
        applyCategoryFilter();
      }}
      className="flex h-[40px] w-fit flex-nowrap items-center rounded-xl bg-red-500 px-4 py-1 font-semibold text-white transition-colors transition-transform duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md"
    >
      {props.categoryName}
    </button>
  ) : (
    <button
      onClick={() => {
        applyCategoryFilter();
      }}
      className="h-[40px] w-fit rounded-xl bg-gray-200 px-4 py-1 font-semibold text-gray-500 transition-colors transition-transform duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md"
    >
      {props.categoryName}
    </button>
  );
}
