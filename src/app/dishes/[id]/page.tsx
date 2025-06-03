"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { mockDishes, mockSellers, mockReviews } from '@/lib/data';
import type { Dish, Seller, Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Tag, Clock, Truck, UserCircle, ChevronLeft } from 'lucide-react';
import ReviewCard from '@/components/review-card';
import ReviewForm from '@/components/review-form';
import { useToast } from '@/hooks/use-toast';

export default function DishPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [dish, setDish] = useState<Dish | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const dishId = params.id as string;

  const fetchDishData = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundDish = mockDishes.find(d => d.id === dishId);
      if (foundDish) {
        setDish(foundDish);
        const foundSeller = mockSellers.find(s => s.id === foundDish.sellerId);
        setSeller(foundSeller || null);
        const dishReviews = mockReviews.filter(r => r.dishId === dishId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setReviews(dishReviews);
      } else {
        // Handle dish not found, maybe redirect or show error
        toast({ title: "Maträtt ej hittad", description: "Kunde inte hitta den valda maträtten.", variant: "destructive" });
        router.push('/');
      }
      setIsLoading(false);
    }, 500);
  }, [dishId, router, toast]);

  useEffect(() => {
    if (dishId) {
      fetchDishData();
    }
  }, [dishId, fetchDishData]);

  const handleOrder = () => {
    // Mock order placement
    toast({
      title: "Beställning Placerad!",
      description: `Din beställning av ${dish?.name} har tagits emot. (Simulerad)`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 bg-muted rounded w-1/4 mb-8"></div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="h-96 bg-muted rounded-lg mb-4"></div>
            <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-muted rounded mb-4"></div>
          </div>
          <div>
            <div className="h-12 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-primary/50 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!dish) {
    return <div className="text-center py-10">Kunde inte hitta maträtten.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Tillbaka till listan
      </Button>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column: Image and Core Info */}
        <div className="md:col-span-2">
          <Card className="overflow-hidden shadow-xl">
            <CardHeader className="p-0 relative">
              <Image
                src={dish.imageUrl}
                alt={dish.name}
                width={800}
                height={500}
                className="w-full h-auto md:h-[400px] object-cover"
                data-ai-hint={dish.dataAiHint || "food meal"}
                priority
              />
            </CardHeader>
            <CardContent className="p-6">
              <h1 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-3">{dish.name}</h1>
              <div className="flex items-center mb-4">
                {dish.averageRating && (
                   <span className="flex items-center mr-4 text-yellow-500">
                    {Array(Math.floor(dish.averageRating)).fill(0).map((_, i) => (
                       <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                    {dish.averageRating % 1 !== 0 && <Star key="half" className="h-5 w-5 fill-current opacity-50" />} 
                    {/* Simplified half star */}
                    <span className="ml-1 text-foreground text-sm">({dish.averageRating.toFixed(1)})</span>
                  </span>
                )}
                <span className="text-2xl font-bold text-foreground">{dish.price} kr</span>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6">{dish.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center text-foreground">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <strong>Plats:</strong> <span className="ml-1">{dish.city}</span>
                </div>
                <div className="flex items-center text-foreground">
                  <Tag className="h-5 w-5 mr-2 text-primary" />
                  <strong>Typ:</strong> <span className="ml-1">{dish.foodType}</span>
                </div>
                <div className="flex items-center text-foreground">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <strong>Tillgänglig:</strong> <span className="ml-1">{dish.availability.startTime} - {dish.availability.endTime} ({dish.availability.days.join(', ')})</span>
                </div>
                <div className="flex items-center text-foreground">
                  <Truck className="h-5 w-5 mr-2 text-primary" />
                  <strong>Leverans:</strong> <span className="ml-1">{dish.deliveryOptions.join(' / ')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Seller Info & Order */}
        <div className="md:col-span-1 space-y-6">
          {seller && (
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center mb-2">
                   {seller.profileImageUrl ? (
                    <Image src={seller.profileImageUrl} alt={seller.name} width={48} height={48} className="rounded-full mr-3" data-ai-hint="profile avatar" />
                  ) : (
                    <UserCircle className="h-12 w-12 mr-3 text-muted-foreground" />
                  )}
                  <CardTitle className="text-xl font-headline">{seller.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {seller.bio && <p className="text-sm text-muted-foreground mb-3">{seller.bio}</p>}
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleOrder}>
                  Beställ Nu ({dish.price} kr)
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Recensioner ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length > 0 ? (
                <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                  {reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Inga recensioner ännu.</p>
              )}
            </CardContent>
          </Card>
          
          <ReviewForm dishId={dish.id} sellerId={dish.sellerId} onSubmitSuccess={fetchDishData} />
        </div>
      </div>
    </div>
  );
}
