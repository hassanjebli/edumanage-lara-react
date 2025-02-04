import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { axiosClient } from '../../api/axios';

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(30),
});

const StudentLogin = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'hassan@example.com',
      password: '12345678',
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (values) => {
    try {
      // First, get the CSRF cookie
      await axiosClient.get('/sanctum/csrf-cookie');

      // Then, attempt to log in
      const response = await axiosClient.post('/login', values);

      // Check the response status
      if (response.status === 204) {
        navigate('/authenticated');
      } else {
        // If the status is not 204, set an error on the form
        form.setError('email', {
          type: 'manual',
          message: 'Login failed. Please check your credentials.',
        });
      }
    } catch (error) {
      // Handle any errors that occur during the request
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage =
          error.response.data.message || 'An error occurred during login.';
        form.setError('email', {
          type: 'manual',
          message: errorMessage,
        });
      } else if (error.request) {
        // The request was made but no response was received
        form.setError('email', {
          type: 'manual',
          message: 'No response from the server. Please try again later.',
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        form.setError('email', {
          type: 'manual',
          message: 'An unexpected error occurred. Please try again.',
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div
        className="w-full max-w-md 
        bg-white dark:bg-zinc-800 
        shadow-2xl dark:shadow-zinc-900/50 
        rounded-2xl 
        border border-zinc-200 dark:border-zinc-700 
        p-10 
        transition-all duration-300
        hover:shadow-xl
      "
      >
        <h2
          className="text-4xl font-bold text-center 
          text-emerald-600 dark:text-emerald-400 
          mb-8 
          tracking-tight
        "
        >
          Student Login
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className={`
                        border-zinc-300 dark:border-zinc-600 
                        focus:border-zinc-500 dark:focus:border-zinc-400
                        focus:ring-2 focus:ring-zinc-500/30 dark:focus:ring-zinc-400/30
                        transition-all duration-300
                        rounded-xl
                        py-2.5
                        ${
                          errors.email
                            ? 'border-red-500 dark:border-red-500'
                            : ''
                        }
                      `}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className={`
                        border-zinc-300 dark:border-zinc-600 
                        focus:border-zinc-500 dark:focus:border-zinc-400
                        focus:ring-2 focus:ring-zinc-500/30 dark:focus:ring-zinc-400/30
                        transition-all duration-300
                        rounded-xl
                        py-2.5
                        ${
                          errors.password
                            ? 'border-red-500 dark:border-red-500'
                            : ''
                        }
                      `}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="
                w-full 
                bg-emerald-600 hover:bg-emerald-700 
                dark:bg-emerald-500 dark:hover:bg-emerald-600
                transition-colors duration-300
                text-white
                rounded-xl
                py-3
                hover:shadow-lg
                hover:shadow-emerald-500/30 dark:hover:shadow-emerald-500/30
                text-base
                font-semibold
                tracking-wide
              "
            >
              Log In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StudentLogin;
