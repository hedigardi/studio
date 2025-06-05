import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Search, ShoppingCart, Utensils, Users, ShieldCheck } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary mb-4">Så Funkar HemmaTorg!</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          HemmaTorg är din plattform för att köpa och sälja hemlagad mat. Enkelt, tryggt och gott!
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold font-headline mb-4">För Köpare: Upptäck Lokala Smaker</h2>
          <p className="text-foreground/80 mb-6">
            Trött på samma gamla take-away? Med HemmaTorg kan du enkelt hitta passionerade hemmakockar i ditt område och beställa unika, vällagade måltider direkt till din dörr.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Search className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <span><strong>Sök & Filtrera:</strong> Hitta maträtter baserat på plats, typ av mat, eller specifika kockar.</span>
            </li>
            <li className="flex items-start">
              <ShoppingCart className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <span><strong>Beställ Enkelt:</strong> Lägg din beställning direkt i appen och betala smidigt med Swish eller kort.</span>
            </li>
            <li className="flex items-start">
              <Utensils className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <span><strong>Njut av Hemlagat:</strong> Få maten levererad och njut av en äkta hemlagad måltid.</span>
            </li>
             <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <span><strong>Lämna Omdöme:</strong> Hjälp andra köpare genom att betygsätta din upplevelse och maten.</span>
            </li>
          </ul>
        </div>
        <div>
          <img src="https://placehold.co/600x400.png" alt="Person som njuter av mat" data-ai-hint="eating food" className="rounded-lg shadow-xl" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
         <div>
          <img src="https://placehold.co/600x400.png" alt="Kock som lagar mat" data-ai-hint="cooking chef" className="rounded-lg shadow-xl md:order-first" />
        </div>
        <div className="md:order-last">
          <h2 className="text-3xl font-semibold font-headline mb-4">För Säljare: Dela Din Passion</h2>
          <p className="text-foreground/80 mb-6">
            Älskar du att laga mat? HemmaTorg gör det enkelt att nå ut till hungriga kunder i ditt närområde och tjäna pengar på din talang.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Users className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <span><strong>Registrera Dig:</strong> Skapa ett säljarkonto snabbt och säkert med BankID.</span>
            </li>
            <li className="flex items-start">
              <Utensils className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <span><strong>Lista Dina Rätter:</strong> Lägg enkelt upp annonser för dina maträtter med bilder, priser och tillgänglighet.</span>
            </li>
            <li className="flex items-start">
              <ShoppingCart className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <span><strong>Hantera Beställningar:</strong> Få notiser om nya beställningar och hantera dem via plattformen.</span>
            </li>
             <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
              <span><strong>Få Betalt:</strong> Vi hanterar betalningar och ser till att du får dina pengar tryggt och smidigt.</span>
            </li>
          </ul>
        </div>
      </section>
      
      <section>
        <h2 className="text-3xl font-semibold font-headline text-center mb-8">Vanliga Frågor (FAQ)</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">Hur fungerar leveransen?</AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              HemmaTorg ansvarar för logistiken. När en beställning görs koordinerar vår plattform upphämtning från säljaren och leverans till köparen. Exakta detaljer och eventuella avgifter för leverans specificeras vid beställning.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">Är det säkert att köpa mat via HemmaTorg?</AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              Vi strävar efter en trygg plattform. Säljare verifieras med BankID. Vi uppmuntrar säljare att följa alla relevanta livsmedelslagar och hygienkrav. Köpare kan läsa recensioner för att få en uppfattning om säljarens kvalitet och pålitlighet. Vi arbetar kontinuerligt med att förbättra säkerheten.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">Hur hanteras betalningar?</AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              Betalningar sker säkert via plattformen med Swish eller kort (via Stripe). HemmaTorg håller pengarna tills leveransen är bekräftad och betalar sedan ut till säljaren, minus en serviceavgift.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-semibold">Vad kostar det att använda HemmaTorg?</AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              För köpare är det gratis att använda plattformen utöver kostnaden för maten och eventuell leveransavgift. För säljare tar HemmaTorg ut en serviceavgift per genomförd försäljning. Denna avgift hjälper oss att driva och utveckla plattformen, samt hantera logistik och support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="text-center py-8">
        <Card className="bg-primary/10 inline-block p-6 rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 mr-3" /> Trygghet & Ansvar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 max-w-xl mx-auto">
              Vi tar ansvar för att skapa en säker och pålitlig marknadsplats. Detta inkluderar att följa svensk lagstiftning gällande livsmedelshantering, e-handel och dataskydd (GDPR). Vi uppmanar alla användare att bekanta sig med våra riktlinjer och villkor.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
