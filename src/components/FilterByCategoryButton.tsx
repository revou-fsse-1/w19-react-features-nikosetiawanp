import { useState } from "react";

// ada 3 props yg masuk kesini : props.filterValue , props.categoryName

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
      className="bg-red-500 flex items-center flex-nowrap text-white h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:shadow-md hover:scale-105 hover:cursor-pointer transition-transform transition-colors duration-300"
    >
      {props.categoryName}
    </button>
  ) : (
    <button
      onClick={() => {
        applyCategoryFilter();
      }}
      className="bg-gray-200 text-gray-500 h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:shadow-md hover:scale-105 hover:cursor-pointer transition-transform transition-colors duration-300"
    >
      {props.categoryName}
    </button>
  );
}
