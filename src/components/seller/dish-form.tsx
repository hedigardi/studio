"use client";

import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Dish } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { foodTypes as defaultFoodTypes, cities as defaultCities } from '@/lib/data';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";


const dishSchema = z.object({
  name: z.string().min(3, "Namnet måste vara minst 3 tecken").max(100),
  description: z.string().min(10, "Beskrivning måste vara minst 10 tecken").max(500),
  price: z.number().min(1, "Pris måste vara minst 1 kr").positive("Priset måste vara positivt"),
  imageUrl: z.string().url("Ogiltig bild-URL").or(z.literal("")),
  city: z.string().min(1, "Stad måste väljas"),
  foodType: z.string().min(1, "Mattyp måste väljas"),
  availabilityStartTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Ogiltigt tidsformat (HH:MM)"),
  availabilityEndTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Ogiltigt tidsformat (HH:MM)"),
  availabilityDays: z.array(z.string()).min(1, "Minst en dag måste väljas"),
  deliveryOptions: z.array(z.string()).min(1, "Minst ett leveransalternativ måste väljas"),
});

type DishFormValues = z.infer<typeof dishSchema>;

interface DishFormProps {
  dish?: Dish | null; // For editing
  isOpen: boolean;
  onClose: () => void;
  onSave: (dishData: Dish) => void;
  sellerId: string;
  sellerName: string;
}

const daysOfWeek = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];
const deliveryOptionsList = ["Hemleverans", "Avhämtning"];

export default function DishForm({ dish, isOpen, onClose, onSave, sellerId, sellerName }: DishFormProps) {
  const { toast } = useToast();
  const form = useForm<DishFormValues>({
    resolver: zodResolver(dishSchema),
    defaultValues: dish ? {
      name: dish.name,
      description: dish.description,
      price: dish.price,
      imageUrl: dish.imageUrl,
      city: dish.city,
      foodType: dish.foodType,
      availabilityStartTime: dish.availability.startTime,
      availabilityEndTime: dish.availability.endTime,
      availabilityDays: dish.availability.days,
      deliveryOptions: dish.deliveryOptions,
    } : {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      city: defaultCities[1] || '', // Default to first actual city
      foodType: defaultFoodTypes[1] || '', // Default to first actual foodtype
      availabilityStartTime: '17:00',
      availabilityEndTime: '20:00',
      availabilityDays: ['Fre'],
      deliveryOptions: ['Avhämtning'],
    },
  });

  const onSubmit: SubmitHandler<DishFormValues> = (data) => {
    const newDishData: Dish = {
      id: dish?.id || `dish-${Date.now()}`, // Generate new ID or use existing
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(data.name)}`,
      dataAiHint: `${data.foodType.toLowerCase()} ${data.name.toLowerCase().split(" ")[0]}`,
      sellerId: sellerId,
      sellerName: sellerName,
      city: data.city,
      foodType: data.foodType,
      availability: {
        startTime: data.availabilityStartTime,
        endTime: data.availabilityEndTime,
        days: data.availabilityDays,
      },
      deliveryOptions: data.deliveryOptions,
    };
    onSave(newDishData);
    toast({ title: dish ? "Maträtt Uppdaterad" : "Maträtt Skapad", description: `${data.name} har sparats.` });
    onClose();
    form.reset();
  };
  
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline">{dish ? 'Redigera Maträtt' : 'Lägg till Ny Maträtt'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Namn på maträtt</FormLabel>
                <FormControl><Input placeholder="T.ex. Köttbullar med mos" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Beskrivning</FormLabel>
                <FormControl><Textarea placeholder="Beskriv din maträtt..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pris (kr)</FormLabel>
                  <FormControl><Input type="number" placeholder="125" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bild URL (valfritt)</FormLabel>
                  <FormControl><Input placeholder="https://exempel.com/bild.jpg" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>Stad</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj stad" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {defaultCities.filter(c => c !== "Alla").map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="foodType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Mattyp</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj mattyp" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {defaultFoodTypes.filter(ft => ft !== "Alla").map(ft => <SelectItem key={ft} value={ft}>{ft}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            
            <FormItem>
              <FormLabel>Tillgänglighet</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="availabilityStartTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Starttid (HH:MM)</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="availabilityEndTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Sluttid (HH:MM)</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </FormItem>

            <FormField control={form.control} name="availabilityDays" render={() => (
              <FormItem>
                 <FormLabel>Dagar</FormLabel>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <FormField key={day} control={form.control} name="availabilityDays" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(day)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), day])
                              : field.onChange((field.value || []).filter((value) => value !== day))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{day}</FormLabel>
                    </FormItem>
                  )} />
                ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="deliveryOptions" render={() => (
              <FormItem>
                <FormLabel>Leveransalternativ</FormLabel>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                {deliveryOptionsList.map((option) => (
                  <FormField key={option} control={form.control} name="deliveryOptions" render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 my-1">
                       <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), option])
                              : field.onChange((field.value || []).filter((value) => value !== option))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  )} />
                ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Avbryt</Button>
              </DialogClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sparar..." : "Spara Maträtt"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
