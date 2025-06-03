import Image from 'next/image';
import type { Dish } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, DollarSign, Clock } from 'lucide-react';

interface DishListItemProps {
  dish: Dish;
  onEdit: (dish: Dish) => void;
  onDelete: (dishId: string) => void;
}

export default function DishListItem({ dish, onEdit, onDelete }: DishListItemProps) {
  return (
    <Card className="flex flex-col sm:flex-row overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="sm:w-1/3 relative">
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          width={200}
          height={150}
          className="w-full h-40 sm:h-full object-cover"
          data-ai-hint={dish.dataAiHint || "food meal"}
        />
      </div>
      <div className="sm:w-2/3 flex flex-col">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-lg font-headline">{dish.name}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-2 flex-grow">
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{dish.description}</p>
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <DollarSign className="h-3 w-3 mr-1 text-primary" /> Pris: {dish.price} kr
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1 text-primary" /> Tillgänglighet: {dish.availability.startTime} - {dish.availability.endTime} ({dish.availability.days.join(', ')})
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(dish)}>
            <Edit className="mr-1 h-3 w-3" /> Redigera
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(dish.id)}>
            <Trash2 className="mr-1 h-3 w-3" /> Ta bort
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
