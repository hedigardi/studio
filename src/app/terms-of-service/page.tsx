export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold font-headline text-primary mb-6">Användarvillkor</h1>
      <div className="space-y-4 text-foreground/80">
        <p>Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>

        <h2 className="text-xl font-semibold font-headline mt-6">1. Godkännande av villkor</h2>
        <p>Genom att använda HemmaTorgs plattform och tjänster ("Tjänsten") godkänner du dessa användarvillkor ("Villkoren"). Om du inte godkänner Villkoren, använd inte Tjänsten.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">2. Tjänsten</h2>
        <p>HemmaTorg är en plattform som möjliggör för privatpersoner ("Säljare") att annonsera och sälja hemlagade maträtter till andra privatpersoner ("Köpare"). HemmaTorg agerar som en mellanhand och facilitator för transaktioner och logistik.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">3. Användarkonton</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Du måste vara minst 18 år för att skapa ett konto.</li>
          <li>Du ansvarar för att all information du anger är korrekt och uppdaterad.</li>
          <li>Verifiering via BankID krävs för att säkerställa identitet.</li>
          <li>Du ansvarar för säkerheten på ditt konto och ditt lösenord (eller motsvarande via BankID).</li>
        </ul>

        <h2 className="text-xl font-semibold font-headline mt-6">4. Säljares ansvar</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Säljare är ansvariga för att deras maträtter är säkra, korrekt beskrivna och uppfyller alla tillämpliga lagar och regler, inklusive livsmedelslagstiftning och hygienkrav.</li>
          <li>Säljare måste ange korrekta priser, tillgänglighet och leveransalternativ.</li>
          <li>HemmaTorg kan inte hållas ansvarigt för kvaliteten på maten eller säljarens efterlevnad av lagar.</li>
        </ul>

        <h2 className="text-xl font-semibold font-headline mt-6">5. Köpares ansvar</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Köpare ansvarar för att läsa annonsbeskrivningar noggrant och ställa eventuella frågor till säljaren innan beställning.</li>
          <li>Eventuella allergier eller specialkostbehov bör kommuniceras tydligt.</li>
        </ul>

        <h2 className="text-xl font-semibold font-headline mt-6">6. Betalningar och avgifter</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Betalning sker via de metoder som erbjuds på plattformen (Swish, Stripe).</li>
          <li>HemmaTorg tar ut en serviceavgift från säljaren för varje genomförd transaktion. Storleken på avgiften specificeras separat.</li>
          <li>Eventuella leveranskostnader visas vid beställning.</li>
        </ul>
        
        <h2 className="text-xl font-semibold font-headline mt-6">7. Omdömen och innehåll</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Användare kan lämna omdömen och betyg. Dessa ska vara ärliga och respektfulla.</li>
          <li>Du får inte publicera innehåll som är olagligt, stötande, vilseledande eller inkräktar på andras rättigheter.</li>
          <li>HemmaTorg förbehåller sig rätten att ta bort innehåll som strider mot dessa villkor.</li>
        </ul>

        <h2 className="text-xl font-semibold font-headline mt-6">8. Ansvarsbegränsning</h2>
        <p>HemmaTorg tillhandahåller plattformen "i befintligt skick". Vi garanterar inte oavbruten eller felfri tjänst. Vi är inte ansvariga för direkta eller indirekta skador som uppstår genom användning av Tjänsten, förutom vad som följer av tvingande lagstiftning.</p>
        
        <h2 className="text-xl font-semibold font-headline mt-6">9. Ändringar av villkor</h2>
        <p>Vi kan ändra dessa Villkor. Väsentliga ändringar meddelas i förväg. Genom att fortsätta använda Tjänsten efter en ändring godkänner du de nya Villkoren.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">10. Avstängning och uppsägning</h2>
        <p>HemmaTorg förbehåller sig rätten att stänga av eller säga upp konton som bryter mot dessa Villkor eller svensk lag.</p>
        
        <h2 className="text-xl font-semibold font-headline mt-6">11. Tvistlösning</h2>
        <p>Svensk lag ska tillämpas på dessa Villkor. Tvister ska i första hand lösas genom överenskommelse. Om överenskommelse inte kan nås, ska tvist prövas av allmän domstol i Sverige.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">12. Kontakt</h2>
        <p>För frågor gällande dessa användarvillkor, kontakta oss på [kontakt@hemmat.org].</p>
      </div>
    </div>
  );
}
