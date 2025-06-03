export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold font-headline text-primary mb-6">Integritetspolicy</h1>
      <div className="space-y-4 text-foreground/80">
        <p>Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>
        
        <h2 className="text-xl font-semibold font-headline mt-6">1. Introduktion</h2>
        <p>HemmaTorg ("vi", "oss", "vår") värnar om din personliga integritet. Denna integritetspolicy beskriver hur vi samlar in, använder, lagrar och skyddar dina personuppgifter när du använder vår plattform och våra tjänster.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">2. Vilka uppgifter samlar vi in?</h2>
        <p>Vi kan samla in följande typer av personuppgifter:</p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Registreringsinformation:</strong> Namn, kontaktuppgifter (e-post, telefonnummer), adress, och information relaterad till BankID-verifiering.</li>
          <li><strong>Transaktionsinformation:</strong> Detaljer om beställningar, betalningsinformation (hanteras primärt av våra betalpartners Swish och Stripe).</li>
          <li><strong>Annonsinformation:</strong> Information du tillhandahåller om maträtter, inklusive beskrivningar och bilder.</li>
          <li><strong>Kommunikation:</strong> Meddelanden mellan dig och andra användare, eller mellan dig och vår support.</li>
          <li><strong>Användningsdata:</strong> Hur du interagerar med plattformen, t.ex. sökningar, visade sidor, IP-adress, enhetsinformation.</li>
          <li><strong>Omdömen och betyg:</strong> Feedback du ger eller tar emot.</li>
        </ul>

        <h2 className="text-xl font-semibold font-headline mt-6">3. Hur använder vi dina uppgifter?</h2>
        <p>Dina personuppgifter används för att:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Tillhandahålla och förbättra våra tjänster.</li>
          <li>Hantera ditt konto och dina transaktioner.</li>
          <li>Möjliggöra kommunikation mellan köpare och säljare.</li>
          <li>Säkerställa plattformens säkerhet och efterlevnad av lagar.</li>
          <li>Personalisera din upplevelse.</li>
          <li>Skicka relevant information och marknadsföring (med ditt samtycke där det krävs).</li>
        </ul>

        <h2 className="text-xl font-semibold font-headline mt-6">4. Hur delar vi dina uppgifter?</h2>
        <p>Vi kan dela dina uppgifter med:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Andra användare (t.ex. säljarens namn till köpare).</li>
          <li>Tredjepartsleverantörer som hjälper oss med tjänster som betalning, logistik och IT-infrastruktur.</li>
          <li>Myndigheter, om det krävs enligt lag.</li>
        </ul>
        <p>Vi säljer aldrig dina personuppgifter till tredje part.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">5. Dina rättigheter</h2>
        <p>Du har rätt att begära tillgång till, rättelse av, eller radering av dina personuppgifter. Du kan också invända mot eller begränsa behandlingen av dina uppgifter. Kontakta oss för att utöva dina rättigheter.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">6. Dataskydd</h2>
        <p>Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter mot obehörig åtkomst, förlust eller förstörelse.</p>
        
        <h2 className="text-xl font-semibold font-headline mt-6">7. Cookies</h2>
        <p>Vi använder cookies och liknande tekniker för att förbättra din användarupplevelse. Du kan hantera dina cookie-inställningar via din webbläsare.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">8. Ändringar i policyn</h2>
        <p>Vi kan komma att uppdatera denna integritetspolicy. Den senaste versionen finns alltid tillgänglig på vår plattform.</p>

        <h2 className="text-xl font-semibold font-headline mt-6">9. Kontakt</h2>
        <p>Om du har frågor om denna integritetspolicy, vänligen kontakta oss på [kontakt@hemmat.org].</p>
      </div>
    </div>
  );
}
