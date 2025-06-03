"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Banknote, User } from 'lucide-react'; // Using Banknote as a stand-in for BankID icon
import { useToast } from "@/hooks/use-toast";


export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Simulate BankID authentication delay
    setTimeout(() => {
      login(role);
      toast({ title: "Inloggning Lyckades!", description: `Välkommen till HemmaTorg som ${role === 'buyer' ? 'köpare' : 'säljare'}.`});
      const redirectUrl = searchParams.get('redirect') || (role === 'seller' ? '/seller/dashboard' : '/');
      router.push(redirectUrl);
      setIsLoggingIn(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Banknote className="mx-auto h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-2xl font-headline">Logga in på HemmaTorg</CardTitle>
          <CardDescription>Välj din roll och fortsätt med BankID (simulerad).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="mb-2 block font-medium">Jag vill logga in som:</Label>
            <RadioGroup
              defaultValue="buyer"
              onValueChange={(value: 'buyer' | 'seller') => setRole(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buyer" id="role-buyer" />
                <Label htmlFor="role-buyer" className="font-normal">Köpare</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seller" id="role-seller" />
                <Label htmlFor="role-seller" className="font-normal">Säljare</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifierar med BankID...
              </>
            ) : (
              <>
                <User className="mr-2 h-5 w-5" /> Logga in med BankID (Simulerad)
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-xs text-muted-foreground">
            Detta är en simulerad BankID-inloggning för demonstrationsändamål.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
