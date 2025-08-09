
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { LogIn, UserPlus } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 8 characters.'),
});

type FormType = 'login' | 'signup';

export function AuthForm() {
  const searchParams = useSearchParams();
  const [formType, setFormType] = useState<FormType>(searchParams.get('form') === 'signup' ? 'signup' : 'login');

  const form = useForm<z.infer<typeof loginSchema> | z.infer<typeof signupSchema>>({
    resolver: zodResolver(formType === 'login' ? loginSchema : signupSchema),
    defaultValues: formType === 'login' ? { email: '', password: '' } : { name: '', email: '', password: '' },
  });

  useEffect(() => {
    form.reset();
  }, [formType, form]);

  const onSubmit = (values: z.infer<typeof loginSchema> | z.infer<typeof signupSchema>) => {
    console.log(values);
    // Handle login/signup logic here
  };
  
  const formVariants = {
    hidden: { opacity: 0, x: formType === 'login' ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: formType === 'login' ? 50 : -50 },
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <div className="flex justify-center p-2 bg-muted rounded-md mb-4">
            <Button
                variant={formType === 'login' ? 'default' : 'ghost'}
                onClick={() => setFormType('login')}
                className="flex-1 transition-all"
            >
                Login
            </Button>
            <Button
                variant={formType === 'signup' ? 'default' : 'ghost'}
                onClick={() => setFormType('signup')}
                className="flex-1 transition-all"
            >
                Sign Up
            </Button>
        </div>
        <CardTitle className="text-2xl text-center">
            {formType === 'login' ? 'Welcome Back!' : 'Create an Account'}
        </CardTitle>
        <CardDescription className="text-center">
            {formType === 'login' ? 'Sign in to access your account.' : 'Get started with MediChain today.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
            <motion.div
                key={formType}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {formType === 'signup' && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                 {formType === 'login' ? <LogIn className="mr-2"/> : <UserPlus className="mr-2"/>}
                 {formType === 'login' ? 'Login' : 'Create Account'}
              </Button>
            </form>
          </Form>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
