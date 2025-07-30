import { useState } from 'react';
import { Star, List, Grid } from 'lucide-react';
import AllWriters from './WritersPage';
import FavoriteWriters from './FavoriteWriters';

export default function WriterOverview() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  return (
    <div className="space-y-6">
      {/* Header with tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              All Writers
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-1 ${
                activeTab === 'favorites'
                  ? 'border-yellow-400 text-yellow-600 dark:text-yellow-400 dark:border-yellow-400'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <Star className="h-4 w-4" />
              Favorites
            </button>
          </nav>
          
          {/* View mode toggle (only for All Writers) */}
          {activeTab === 'all' && (
            <div className="flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg ${
                  viewMode === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'all' ? (
          <AllWriters viewMode={viewMode} />
        ) : (
          <FavoriteWriters />
        )}
      </div>

      {/* Stats bar */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">50+</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Total Writers</p>
          </div>
          <div>
            <p className="text-xl font-bold text-yellow-500 dark:text-yellow-400">12</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Top Rated</p>
          </div>
          <div>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">38</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Available Now</p>
          </div>
          <div className="hidden md:block">
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">4.8</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Avg. Rating</p>
          </div>
          <div className="hidden md:block">
            <p className="text-xl font-bold text-red-500 dark:text-red-400">1.2h</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Avg. Response</p>
          </div>
        </div>
      </div>
    </div>
  );
}