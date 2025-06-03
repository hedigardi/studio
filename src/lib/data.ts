import type { Dish, Seller, Review } from '@/types';

export const mockSellers: Seller[] = [
  { id: 'seller1', name: 'Kalles Kök', city: 'Stockholm', bio: 'Lagat mat med kärlek i över 20 år. Specialiserad på svensk husmanskost.', profileImageUrl: 'https://placehold.co/100x100.png' },
  { id: 'seller2', name: 'Marias Sushi & Sånt', city: 'Göteborg', bio: 'Färsk sushi gjord på beställning. Endast de bästa råvarorna!', profileImageUrl: 'https://placehold.co/100x100.png' },
  { id: 'seller3', name: 'Ahmeds Falafelhörna', city: 'Malmö', bio: 'Autentisk falafel precis som i Mellanöstern. Prova mina hemgjorda såser!', profileImageUrl: 'https://placehold.co/100x100.png' },
];

export const mockDishes: Dish[] = [
  {
    id: 'dish1',
    name: 'Köttbullar med potatismos',
    description: 'Klassiska svenska köttbullar serverade med gräddsås, potatismos, lingonsylt och pressgurka.',
    price: 125,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'meatballs potatoes',
    sellerId: 'seller1',
    sellerName: 'Kalles Kök',
    city: 'Stockholm',
    foodType: 'Svenskt',
    availability: { startTime: '17:00', endTime: '20:00', days: ['Mån', 'Tis', 'Ons', 'Tor', 'Fre'] },
    deliveryOptions: ['Hemleverans', 'Avhämtning'],
    averageRating: 4.5,
  },
  {
    id: 'dish2',
    name: 'Lyxig Sushitallrik (12 bitar)',
    description: 'En blandning av nigiri och maki: lax, tonfisk, räka, avokado. Inkluderar soja, wasabi och ingefära.',
    price: 150,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sushi platter',
    sellerId: 'seller2',
    sellerName: 'Marias Sushi & Sånt',
    city: 'Göteborg',
    foodType: 'Japanskt',
    availability: { startTime: '16:00', endTime: '21:00', days: ['Tis', 'Ons', 'Tor', 'Fre', 'Lör'] },
    deliveryOptions: ['Hemleverans'],
    averageRating: 4.8,
  },
  {
    id: 'dish3',
    name: 'Falafelrulle Special',
    description: 'Krispig falafel, färska grönsaker, hummus och tahinisås, allt inrullat i ett varmt pitabröd.',
    price: 85,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'falafel wrap',
    sellerId: 'seller3',
    sellerName: 'Ahmeds Falafelhörna',
    city: 'Malmö',
    foodType: 'Mellanöstern',
    availability: { startTime: '11:00', endTime: '19:00', days: ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'] },
    deliveryOptions: ['Avhämtning'],
    averageRating: 4.2,
  },
  {
    id: 'dish4',
    name: 'Pasta Carbonara',
    description: 'Krämig pasta carbonara med pancetta, äggula, pecorino romano och svartpeppar.',
    price: 130,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pasta carbonara',
    sellerId: 'seller1',
    sellerName: 'Kalles Kök',
    city: 'Stockholm',
    foodType: 'Italienskt',
    availability: { startTime: '17:00', endTime: '20:00', days: ['Ons', 'Tor'] },
    deliveryOptions: ['Hemleverans', 'Avhämtning'],
    averageRating: 4.0,
  },
];

export const mockReviews: Review[] = [
  { id: 'review1', dishId: 'dish1', sellerId: 'seller1', buyerName: 'Anna K.', rating: 5, comment: 'Fantastiskt goda köttbullar! Precis som mormors.', date: '2024-05-10T10:00:00Z' },
  { id: 'review2', dishId: 'dish1', sellerId: 'seller1', buyerName: 'Erik S.', rating: 4, comment: 'Mycket bra, lite mer sås hade varit perfekt.', date: '2024-05-11T12:30:00Z' },
  { id: 'review3', dishId: 'dish2', sellerId: 'seller2', buyerName: 'Sofia L.', rating: 5, comment: 'Sushin var otroligt färsk och god! Rekommenderas starkt.', date: '2024-05-12T19:00:00Z' },
  { id: 'review4', dishId: 'dish3', sellerId: 'seller3', buyerName: 'Mohammed A.', rating: 4, comment: 'God falafel, snabb service vid avhämtning.', date: '2024-05-13T13:15:00Z' },
  { id: 'review5', dishId: 'dish2', sellerId: 'seller2', buyerName: 'David B.', rating: 5, comment: 'Bästa sushin i Göteborg!', date: '2024-05-14T20:00:00Z' },
];

export const foodTypes: string[] = ["Alla", "Svenskt", "Italienskt", "Japanskt", "Mellanöstern", "Indiskt", "Vegetariskt"];
export const cities: string[] = ["Alla", "Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås"];
