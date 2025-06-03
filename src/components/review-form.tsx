"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const reviewSchema = z.object({
  rating: z.number().min(1, "Betyg måste vara minst 1").max(5, "Betyg får vara max 5"),
  comment: z.string().min(10, "Kommentar måste vara minst 10 tecken lång").max(500, "Kommentar får vara max 500 tecken lång"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  dishId: string;
  sellerId: string;
  onSubmitSuccess: () => void; // Callback after successful submission
}

export default function ReviewForm({ dishId, sellerId, onSubmitSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });
  
  const { handleSubmit, control, setValue, watch } = form;
  const currentRating = watch('rating');

  const onSubmit: SubmitHandler<ReviewFormValues> = async (data) => {
    if (!user) {
      toast({ title: "Autentisering krävs", description: "Du måste vara inloggad för att lämna en recension.", variant: "destructive" });
      return;
    }

    console.log("Review submitted:", { ...data, dishId, sellerId, buyerName: user.name, date: new Date().toISOString() });
    // Here you would typically send the data to your backend API
    // For this mock, we'll just simulate success
    toast({ title: "Recension skickad!", description: "Tack för din feedback." });
    onSubmitSuccess(); // Call the callback
    form.reset(); // Reset form fields
  };

  if (!user) {
    return <p className="text-muted-foreground">Du måste vara <a href="/login" className="text-primary underline">inloggad</a> för att kunna recensera.</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold font-headline">Lämna en recension</h3>
        
        <FormField
          control={control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Betyg</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer transition-colors ${
                        (hoverRating || currentRating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                      onClick={() => setValue('rating', star, { shouldValidate: true })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="comment">Kommentar</FormLabel>
              <FormControl>
                <Textarea
                  id="comment"
                  placeholder="Berätta vad du tyckte om maträtten..."
                  className="bg-background min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Skickar..." : "Skicka recension"}
        </Button>
      </form>
    </Form>
  );
}
