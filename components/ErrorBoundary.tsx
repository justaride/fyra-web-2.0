'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors in child components and displays fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Fyra ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Noe gikk galt
            </h2>
            <p className="text-slate-600 mb-6">
              Vi beklager, men det oppstod en feil ved lasting av denne siden.
              Prøv å laste siden på nytt.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Prøv igjen
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Til forsiden
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700">
                  Tekniske detaljer
                </summary>
                <pre className="mt-2 p-3 bg-slate-100 rounded text-xs text-red-600 overflow-auto">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Simple error fallback for smaller sections
 */
export function ErrorFallback({
  message = 'Kunne ikke laste innhold',
  onRetry
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
      <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
      <p className="text-sm text-red-700 mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Prøv igjen
        </button>
      )}
    </div>
  );
}

export default ErrorBoundary;
