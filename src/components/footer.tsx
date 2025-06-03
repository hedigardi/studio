import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p className="text-sm">&copy; {new Date().getFullYear()} HemmaTorg. Alla rättigheter förbehållna.</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="text-xs hover:text-primary">Integritetspolicy</Link>
          <Link href="/terms-of-service" className="text-xs hover:text-primary">Användarvillkor</Link>
          <Link href="/contact" className="text-xs hover:text-primary">Kontakt</Link>
        </div>
      </div>
    </footer>
  );
}
