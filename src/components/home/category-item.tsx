import { Button } from "@/components/ui/button";
import { Category } from "@/types/category.type";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface CategoryItemProps {
    category: Category;
    depth?: number;
    setCategoryId: Dispatch<SetStateAction<string>>;
    categoryId: string;
}

function CategoryItem({
    category,
    depth = 0,
    setCategoryId,
    categoryId,
}: CategoryItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubcategories = category.children && category.children.length > 0;
    return (
        <div>
            <Button
                variant="ghost"
                className={`w-full justify-start ${
                    depth > 0 && "pl-4"
                } hover:bg-yellow-300 ${
                    categoryId === category._id && "bg-black text-white"
                }`}
                onClick={() => {
                    setIsOpen(!isOpen);
                    setCategoryId(category._id);
                }}
            >
                {hasSubcategories && (
                    <span className="mr-2">
                        {isOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </span>
                )}
                {category.name}
            </Button>
            {isOpen && hasSubcategories && (
                <div className="ml-4">
                    {category.children.map((subcategory) => (
                        <CategoryItem
                            key={subcategory._id}
                            category={subcategory}
                            depth={depth + 1}
                            setCategoryId={setCategoryId}
                            categoryId={categoryId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryItem;
