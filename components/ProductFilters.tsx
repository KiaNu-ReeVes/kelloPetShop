'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    price: true,
    stock: true,
  });

  const categories = [
    { id: 'food-bowls', label: 'ظرف غذای حیوانات' },
    { id: 'cat-treats', label: 'تشویقی گربه' },
    { id: 'hygiene', label: 'بهداشتی' },
    { id: 'care', label: 'مراقبتی' },
    { id: 'dog-treats', label: 'تشویقی سگ' },
  ];

  const brands = [
    { id: 'dr-haas', label: 'دکتر هاس' },
    { id: 'fanby', label: 'فنبی' },
    { id: 'vanpi', label: 'ونپی' },
    { id: 'winston', label: 'وینستون' },
  ];

  const priceRanges = [
    { id: 'under-50k', label: 'کمتر از ۵۰ هزار' },
    { id: '50k-100k', label: '۵۰ تا ۱۰۰ هزار' },
    { id: '100k-200k', label: '۱۰۰ تا ۲۰۰ هزار' },
    { id: 'over-200k', label: 'بیشتر از ۲۰۰ هزار' },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({ category: categoryId });
  };

  const handleBrandChange = (brandId: string) => {
    onFilterChange({ brand: brandId });
  };

  const handlePriceChange = (priceRange: string) => {
    onFilterChange({ priceRange });
  };

  const handleStockChange = (inStock: boolean) => {
    onFilterChange({ inStock });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6 h-fit sticky top-20">
      {/* Category Filter */}
      <div>
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3 text-foreground hover:text-primary transition-colors"
        >
          <h3 className="font-bold">دسته‌بندی</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 rounded border-2 border-primary/40 bg-input text-primary accent-primary cursor-pointer hover:border-primary/60 transition-colors"
                />
                <span className="ml-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="pt-6 border-t border-border">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full mb-3 text-foreground hover:text-primary transition-colors"
        >
          <h3 className="font-bold">برند</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.brand && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={() => handleBrandChange(brand.id)}
                  className="w-4 h-4 rounded border-2 border-secondary/40 bg-input text-secondary accent-secondary cursor-pointer hover:border-secondary/60 transition-colors"
                />
                <span className="ml-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {brand.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="pt-6 border-t border-border">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3 text-foreground hover:text-primary transition-colors"
        >
          <h3 className="font-bold">محدوده قیمت</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  onChange={() => handlePriceChange(range.id)}
                  className="w-4 h-4 border-2 border-accent/40 bg-input text-accent accent-accent cursor-pointer hover:border-accent/60 transition-colors"
                />
                <span className="ml-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stock Filter */}
      <div className="pt-6 border-t border-border">
        <button
          onClick={() => toggleSection('stock')}
          className="flex items-center justify-between w-full mb-3 text-foreground hover:text-primary transition-colors"
        >
          <h3 className="font-bold">موجودی</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.stock ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.stock && (
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => handleStockChange(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-primary/40 bg-input text-primary accent-primary cursor-pointer hover:border-primary/60 transition-colors"
              />
              <span className="ml-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                فقط کالاهای موجود
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <button className="w-full pt-6 border-t border-border text-primary hover:text-primary/80 font-medium transition-colors">
        پاک کردن فیلترها
      </button>
    </div>
  );
}
