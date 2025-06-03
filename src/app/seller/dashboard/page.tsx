"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { mockDishes } from '@/lib/data';
import type { Dish } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Utensils, AlertTriangle } from 'lucide-react';
import DishForm from '@/components/seller/dish-form';
import DishListItem from '@/components/seller/dish-list-item';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SellerDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [sellerDishes, setSellerDishes] = useState<Dish[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dishToDelete, setDishToDelete] = useState<string | null>(null);


  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/seller/dashboard');
    } else if (user && user.role !== 'seller') {
      toast({ title: "Åtkomst nekad", description: "Du måste vara inloggad som säljare för att se denna sida.", variant: "destructive" });
      router.push('/');
    } else if (user) {
      // Simulate fetching dishes for this seller
      setTimeout(() => {
        const dishes = mockDishes.filter(dish => dish.sellerId === user.id); // In a real app, user.id would be the sellerId
        // For mock, let's assume seller1 is the logged in user if no dishes found under mock-user-id
        if (user.id.startsWith("mock-") && dishes.length === 0) {
             setSellerDishes(mockDishes.filter(dish => dish.sellerId === "seller1"));
        } else {
            setSellerDishes(dishes);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [user, authLoading, router, toast]);

  const handleOpenForm = (dish: Dish | null = null) => {
    setEditingDish(dish);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingDish(null);
  };

  const handleSaveDish = (dishData: Dish) => {
    setSellerDishes(prevDishes => {
      const existingIndex = prevDishes.findIndex(d => d.id === dishData.id);
      if (existingIndex > -1) {
        const updatedDishes = [...prevDishes];
        updatedDishes[existingIndex] = dishData;
        return updatedDishes;
      }
      return [...prevDishes, dishData];
    });
    // In real app, you'd also update mockDishes or your backend
  };

  const handleDeleteDish = (dishId: string) => {
    setSellerDishes(prevDishes => prevDishes.filter(d => d.id !== dishId));
    toast({ title: "Maträtt Borttagen", description: "Maträtten har tagits bort från dina annonser." });
    setDishToDelete(null); // Close dialog
    // In real app, you'd also update mockDishes or your backend
  };

  if (authLoading || isLoading) {
    return (
      <div className="text-center py-10">
        <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Laddar instrumentpanel...
      </div>
    );
  }

  if (!user || user.role !== 'seller') {
    return null; // Redirects are handled in useEffect
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline text-primary flex items-center">
          <Utensils className="mr-3 h-8 w-8" />
          Mina Maträtter
        </h1>
        <Button onClick={() => handleOpenForm()} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <PlusCircle className="mr-2 h-5 w-5" /> Lägg till Ny Maträtt
        </Button>
      </div>

      {sellerDishes.length === 0 ? (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">Du har inga aktiva maträtter.</p>
          <p className="text-sm text-muted-foreground mb-4">Klicka på "Lägg till Ny Maträtt" för att börja sälja.</p>
          <Button onClick={() => handleOpenForm()} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <PlusCircle className="mr-2 h-5 w-5" /> Skapa din första annons
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellerDishes.map(dish => (
            <DishListItem 
              key={dish.id} 
              dish={dish} 
              onEdit={() => handleOpenForm(dish)} 
              onDelete={() => setDishToDelete(dish.id)}
            />
          ))}
        </div>
      )}

      {user && (
         <DishForm
            dish={editingDish}
            isOpen={isFormOpen}
            onClose={handleCloseForm}
            onSave={handleSaveDish}
            sellerId={user.id} // This would be the actual seller ID
            sellerName={user.name}
          />
      )}

      {dishToDelete && (
        <AlertDialog open={!!dishToDelete} onOpenChange={() => setDishToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Är du säker?</AlertDialogTitle>
              <AlertDialogDescription>
                Denna åtgärd kan inte ångras. Detta kommer permanent att ta bort maträtten från dina annonser.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDishToDelete(null)}>Avbryt</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteDish(dishToDelete)} className="bg-destructive hover:bg-destructive/90">
                Ta bort
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
