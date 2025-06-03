import Image from 'next/image';
import Link from 'next/link';
import type { Dish } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Tag } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
}

export default function DishCard({ dish }: DishCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/dishes/${dish.id}`} className="block">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint={dish.dataAiHint || "food meal"}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-2">
          <Link href={`/dishes/${dish.id}`} className="hover:text-primary transition-colors">
            {dish.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{dish.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4 mr-1 text-primary" /> {dish.city}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Tag className="h-4 w-4 mr-1 text-primary" /> {dish.foodType}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="flex flex-col">
          <p className="text-lg font-bold text-primary">{dish.price} kr</p>
          {dish.averageRating && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
              {dish.averageRating.toFixed(1)}
            </div>
          )}
        </div>
        <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
          <Link href={`/dishes/${dish.id}`}>Visa Rätt</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
