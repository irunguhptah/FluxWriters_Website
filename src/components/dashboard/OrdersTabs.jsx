export default function OrdersTabs({ activeTab, setActiveTab, onTabSwitch }) {
  const tabs = [
    { key: 'progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'all', label: 'All Orders' }
  ];
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => {
            setActiveTab(tab.key);
            onTabSwitch(tab.key);
          }}
          className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === tab.key
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 shadow-inner'
              : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
          title={`Show ${tab.label}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}