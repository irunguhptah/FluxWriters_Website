import { useState, useEffect } from 'react';
import { X, Search, Check, User, Star } from 'lucide-react';

export default function InviteWriterModal({ isOpen, onClose, onInvite, order }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWriters, setSelectedWriters] = useState([]);
  const [writers, setWriters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch writers based on search query
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchWriters = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/writers?search=${searchQuery}&subject=${order.subject}`);
        setWriters(await response.json());
      } catch (error) {
        console.error('Failed to fetch writers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const debounceTimer = setTimeout(() => {
      if (searchQuery.length > 2 || searchQuery.length === 0) {
        fetchWriters();
      }
    }, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, isOpen, order.subject]);

  const toggleWriterSelection = (writerId) => {
    setSelectedWriters(prev => 
      prev.includes(writerId) 
        ? prev.filter(id => id !== writerId) 
        : [...prev, writerId]
    );
  };

  const handleInvite = () => {
    onInvite(selectedWriters);
    setSelectedWriters([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Invite Writers to Bid
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mt-4">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  placeholder="Search writers by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">
                Select writers to invite (max 10):
              </p>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : writers.length > 0 ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {writers.map(writer => (
                    <div 
                      key={writer.id}
                      className={`border-b border-gray-200 last:border-b-0 p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                        selectedWriters.includes(writer.id) ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => toggleWriterSelection(writer.id)}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-300 to-blue-300 flex items-center justify-center text-white font-bold mr-3">
                          {writer.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{writer.name}</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < writer.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                              ({writer.completedOrders} orders)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {selectedWriters.includes(writer.id) ? (
                          <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </span>
                        ) : (
                          <span className="h-5 w-5 rounded-full border border-gray-300"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    {searchQuery ? 'No writers match your search' : 'Start typing to search for writers'}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleInvite}
              disabled={selectedWriters.length === 0}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                selectedWriters.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500'
              }`}
            >
              Send Invitations ({selectedWriters.length})
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}