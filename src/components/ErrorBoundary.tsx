import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('STRIDE App Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('stride_custom_products');
      localStorage.removeItem('stride_cart');
    } catch {
      // ignore
    }
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F7F5] dark:bg-[#111111] text-[#111111] dark:text-[#F7F7F5] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-[#1A1A1E] rounded-3xl p-8 border border-black/10 dark:border-white/10 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#C6F432]/20 text-[#7ba500] dark:text-[#C6F432] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl font-black tracking-tight">
                Something went wrong
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                The application encountered an unexpected issue. You can safely reload the store or reset cached data.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-5 py-3 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="w-4 h-4" />
                Reload Page
              </button>

              <button
                onClick={this.handleReset}
                className="flex-1 px-5 py-3 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <Home className="w-4 h-4" />
                Reset & Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
