import React from "react"


export default function Catalog()
{
    const categories=[
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
];
const handleSelect = (selectedCategory: string) =>
  console.log(selectedCategory);
    return(
        <div>
            <CatalogDisplay>

            </CatalogDisplay>
        </div>

    ) 
}
