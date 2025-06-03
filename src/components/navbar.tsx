"use client";

import Link from 'next/link';
import { Home, Info, UtensilsCrossed, UserCircle, LogIn, LogOut, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-headline font-bold text-primary">
          HemmaTorg
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center">
              <Home className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Hem</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/how-it-works" className="flex items-center">
              <Info className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Så funkar det</span>
            </Link>
          </Button>
          {loading ? (
            <Button variant="ghost" size="sm" disabled>Laddar...</Button>
          ) : user ? (
            <>
              {user.role === 'seller' && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/seller/dashboard" className="flex items-center">
                    <UtensilsCrossed className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Mina Annonser</span>
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center">
                <LogOut className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Logga ut</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center text-primary border-primary hover:bg-primary/10">
                <UserCircle className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">{user.name}</span>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login" className="flex items-center">
                <LogIn className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Logga in</span>
              </Link>
            </Button>
          )}
           <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
             <ShoppingCart className="mr-1 h-4 w-4" />
             <span className="hidden sm:inline">Varukorg (0)</span>
           </Button>
        </div>
      </nav>
    </header>
  );
}
