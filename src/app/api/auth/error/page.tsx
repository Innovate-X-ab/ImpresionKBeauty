// app/auth/error/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

// Create a component that uses the useSearchParams hook
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    'CredentialsSignin': 'Sign in failed. Check the details you provided are correct.',
    'OAuthAccountNotLinked': 'This email is already associated with another account. Please sign in using your original method.',
    'OAuthSignin': 'Error signing in with OAuth provider.',
    'OAuthCallback': 'Error during OAuth callback.',
    'default': 'An error occurred during authentication.'
  };

  const errorMessage = error ? (errorMessages[error] || errorMessages.default) : errorMessages.default;

  return (
    <div className="max-w-md w-full text-center">
      <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
      <h2 className="mt-6 text-3xl font-light text-gray-900">Authentication Error</h2>
      
      <div className="mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {errorMessage}
      </div>

      <div className="mt-8 space-y-4">
        <Link 
          href="/auth/login" 
          className="inline-block w-full px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Return to login
        </Link>
        
        <Link
          href="/"
          className="inline-block text-sm text-gray-600 hover:text-gray-900"
        >
          Return to home page
        </Link>
      </div>
    </div>
  );
}

// Main component that wraps the content in a Suspense boundary
export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="max-w-md w-full text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-gray-300" />
          <h2 className="mt-6 text-3xl font-light text-gray-900">Loading...</h2>
        </div>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
}