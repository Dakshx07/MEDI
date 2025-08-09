
import { AuthForm } from '@/components/auth-form';

export default function AuthPage() {
    return (
        <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4">
             <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)]"></div>
            <AuthForm />
        </div>
    )
}
