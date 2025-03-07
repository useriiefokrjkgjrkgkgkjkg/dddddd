import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (category: string, sort: string) => void;
}

export const SearchFilters: FC<SearchFiltersProps> = ({
  onSearch,
  onFilterChange
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name or address"
            className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-white/20"
            onChange={(e) => onSearch(e.target.value)}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            Filters
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-white/20"
                  onChange={(e) => onFilterChange(e.target.value, '')}
                >
                  <option value="">All Categories</option>
                  <option value="art">Art</option>
                  <option value="gaming">Gaming</option>
                  <option value="music">Music</option>
                  <option value="collectibles">Collectibles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Sort By
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-white/20"
                  onChange={(e) => onFilterChange('', e.target.value)}
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="recent">Recently Listed</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 