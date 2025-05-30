'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconClock, IconCheck, IconX, IconRefresh } from '@tabler/icons-react';

interface BioRequest {
  id: string;
  prompt: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  result?: string;
  error?: string;
}

export function BioRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<BioRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'pending', name: 'Pending' },
    { id: 'completed', name: 'Completed' },
    { id: 'failed', name: 'Failed' },
  ];

  const handleRetry = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/v1/user/requests/${id}/retry`, {
        method: 'POST',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to retry request');
      }

      const updatedRequest = await response.json();
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? updatedRequest : req))
      );
    } catch (error) {
      console.error('Retry request failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/v1/user/requests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete request');
      }

      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error('Delete request failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: BioRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400';
      case 'completed':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: BioRequest['status']) => {
    switch (status) {
      case 'pending':
        return <IconClock className="w-5 h-5" />;
      case 'completed':
        return <IconCheck className="w-5 h-5" />;
      case 'failed':
        return <IconX className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const filteredRequests = selectedStatus === 'all'
    ? requests
    : requests.filter((req) => req.status === selectedStatus);

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <Button
            key={status.id}
            onClick={() => setSelectedStatus(status.id)}
            variant={selectedStatus === status.id ? 'default' : 'outline'}
            className={`whitespace-nowrap ${
              selectedStatus === status.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-black/50 border-white/10'
            }`}
          >
            {status.name}
          </Button>
        ))}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-red-500 text-sm">{error}</p>
        </motion.div>
      )}

      <AnimatePresence>
        {filteredRequests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <IconClock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No requests yet
            </h3>
            <p className="text-gray-400">
              Your bio generation requests will appear here
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <Card className="p-6 bg-black/50 backdrop-blur-sm border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {request.status === 'failed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRetry(request.id)}
                          disabled={isLoading}
                          className="text-gray-400 hover:text-purple-500"
                        >
                          <IconRefresh className="w-5 h-5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(request.id)}
                        disabled={isLoading}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <IconX className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">
                        Prompt
                      </h4>
                      <p className="text-white">{request.prompt}</p>
                    </div>

                    {request.status === 'completed' && request.result && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          Result
                        </h4>
                        <p className="text-gray-300">{request.result}</p>
                      </div>
                    )}

                    {request.status === 'failed' && request.error && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          Error
                        </h4>
                        <p className="text-red-400">{request.error}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    {new Date(request.createdAt).toLocaleString()}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 