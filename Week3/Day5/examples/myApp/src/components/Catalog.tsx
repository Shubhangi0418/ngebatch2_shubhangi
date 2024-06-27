import React, { useState } from "react";
import CatalogDisplay from "./CatalogDisplay";

export default function Catalog() {
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const [selectedCategory, setSelectedCategory] = useState("men's clothing");
  /*   const handleSelect = (selectedCategory: string) => {
    console.log(selectedCategory);
    setSelectedCategory(selectedCategory);
  }; */
  return (
    <div>
      <CatalogDisplay
        categories={categories}
        onSelect={setSelectedCategory}
        selected={selectedCategory}
      />
      <p>Category selected : {selectedCategory}</p>
    </div>
  );
}
