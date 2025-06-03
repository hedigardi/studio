import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  // Mock form submission handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Tack för ditt meddelande! Vi återkommer så snart som möjligt. (Detta är en simulerad funktion)");
    // Here you would typically send form data to a backend
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold font-headline text-primary mb-8 text-center">Kontakta Oss</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Skicka ett meddelande</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-medium">Namn</Label>
                <Input id="name" type="text" placeholder="Ditt namn" required className="mt-1 bg-background" />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium">E-post</Label>
                <Input id="email" type="email" placeholder="din.email@exempel.com" required className="mt-1 bg-background" />
              </div>
              <div>
                <Label htmlFor="subject" className="font-medium">Ämne</Label>
                <Input id="subject" type="text" placeholder="Ämne för ditt meddelande" required className="mt-1 bg-background" />
              </div>
              <div>
                <Label htmlFor="message" className="font-medium">Meddelande</Label>
                <Textarea id="message" placeholder="Skriv ditt meddelande här..." required rows={5} className="mt-1 bg-background" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Skicka Meddelande</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Våra Kontaktuppgifter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/80">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>support@hemmat.org (Föredragen kontaktväg)</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span>08-123 456 78 (Telefontid vardagar 09-12)</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
                <span>
                  HemmaTorg AB<br />
                  Exempelgatan 123<br />
                  111 22 Stockholm<br/>
                  (Endast postadress)
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Följ Oss</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-foreground/80">
                Håll dig uppdaterad med de senaste nyheterna och erbjudandena från HemmaTorg! (Sociala medie-länkar kommer snart)
              </p>
              {/* Placeholder for social media links */}
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" disabled>Facebook (Snart)</Button>
                <Button variant="outline" size="sm" disabled>Instagram (Snart)</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
