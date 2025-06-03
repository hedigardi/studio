"use client";

import { useState, useEffect, useCallback } from 'react';
import DishCard from '@/components/dish-card';
import DishFilters from '@/components/dish-filters';
import { mockDishes } from '@/lib/data';
import type { Dish } from '@/types';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export default function HomePage() {
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllDishes(mockDishes);
      setFilteredDishes(mockDishes.slice(0, ITEMS_PER_PAGE));
      setIsLoading(false);
    }, 500);
  }, []);

  const handleFilterChange = useCallback((filters: { city: string; foodType: string; searchTerm: string }) => {
    setIsLoading(true);
    setCurrentPage(1); // Reset to first page on new filter
    let tempDishes = mockDishes;

    if (filters.city !== "Alla") {
      tempDishes = tempDishes.filter(dish => dish.city === filters.city);
    }
    if (filters.foodType !== "Alla") {
      tempDishes = tempDishes.filter(dish => dish.foodType === filters.foodType);
    }
    if (filters.searchTerm) {
      tempDishes = tempDishes.filter(dish =>
        dish.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    setAllDishes(tempDishes); // Update the full list of filtered dishes for pagination
    setFilteredDishes(tempDishes.slice(0, ITEMS_PER_PAGE));
    setIsLoading(false);
  }, []);

  const totalPages = Math.ceil(allDishes.length / ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const newDishes = allDishes.slice(0, nextPage * ITEMS_PER_PAGE);
    setFilteredDishes(newDishes);
    setCurrentPage(nextPage);
    setIsLoading(false);
  };
  
  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">Välkommen till HemmaTorg!</h1>
        <p className="text-lg text-foreground max-w-2xl mx-auto">
          Upptäck utsökt hemlagad mat från dina grannar, eller dela med dig av dina egna kulinariska skapelser.
        </p>
      </section>

      <DishFilters onFilterChange={handleFilterChange} />

      {isLoading && !filteredDishes.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-48 bg-muted rounded mb-4"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : !isLoading && filteredDishes.length === 0 ? (
         <div className="text-center py-10">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">Inga maträtter matchade din sökning.</p>
            <p className="text-sm text-muted-foreground">Prova att ändra dina filter eller söktermer.</p>
          </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map(dish => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
          {currentPage < totalPages && (
            <div className="text-center mt-8">
              <Button onClick={handleLoadMore} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? 'Laddar...' : 'Ladda fler maträtter'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
