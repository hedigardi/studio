import type { Review } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, UserCircle } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';
import { sv } from 'date-fns/locale'; // For Swedish date formatting

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const timeAgo = formatDistanceToNowStrict(new Date(review.date), { addSuffix: true, locale: sv });

  return (
    <Card className="mb-4 shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserCircle className="h-6 w-6 mr-2 text-muted-foreground" />
            <CardTitle className="text-md font-semibold">{review.buyerName}</CardTitle>
          </div>
          <div className="flex items-center">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground pt-1">{timeAgo}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
