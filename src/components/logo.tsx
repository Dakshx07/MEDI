import { ShieldPlus } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <ShieldPlus className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold text-foreground">MediChain</h1>
    </div>
  );
}
