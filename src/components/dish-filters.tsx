"use client";

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { foodTypes as defaultFoodTypes, cities as defaultCities } from '@/lib/data'; // Assuming these are exported from data.ts

interface DishFiltersProps {
  onFilterChange: (filters: { city: string; foodType: string; searchTerm: string }) => void;
  cities?: string[];
  foodTypes?: string[];
}

export default function DishFilters({ 
  onFilterChange, 
  cities = defaultCities, 
  foodTypes = defaultFoodTypes 
}: DishFiltersProps) {
  const [city, setCity] = useState<string>("Alla");
  const [foodType, setFoodType] = useState<string>("Alla");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleSearch = () => {
    onFilterChange({ city, foodType, searchTerm });
  };

  if (!isClient) {
    return (
      <div className="mb-8 p-4 bg-card rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-center animate-pulse">
        <div className="h-10 bg-muted rounded w-full sm:w-1/3"></div>
        <div className="h-10 bg-muted rounded w-full sm:w-1/3"></div>
        <div className="h-10 bg-muted rounded w-full sm:w-1/3"></div>
        <div className="h-10 bg-primary/50 rounded w-full sm:w-auto px-6"></div>
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-1">
          <label htmlFor="searchTerm" className="block text-sm font-medium text-foreground mb-1">Sök Maträtt</label>
          <Input
            id="searchTerm"
            type="text"
            placeholder="T.ex. Köttbullar, Sushi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="cityFilter" className="block text-sm font-medium text-foreground mb-1">Stad/Ort</label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger id="cityFilter" className="w-full bg-background">
              <SelectValue placeholder="Välj stad" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <label htmlFor="foodTypeFilter" className="block text-sm font-medium text-foreground mb-1">Typ av mat</label>
          <Select value={foodType} onValueChange={setFoodType}>
            <SelectTrigger id="foodTypeFilter" className="w-full bg-background">
              <SelectValue placeholder="Välj typ av mat" />
            </SelectTrigger>
            <SelectContent>
              {foodTypes.map((ft) => (
                <SelectItem key={ft} value={ft}>{ft}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSearch} className="w-full md:w-auto bg-primary hover:bg-primary/90 md:col-span-1">
          <Search className="mr-2 h-4 w-4" /> Sök
        </Button>
      </div>
    </div>
  );
}
