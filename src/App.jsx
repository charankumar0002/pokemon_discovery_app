import React, { useState } from 'react';
import Discovery from './pages/Discovery';
import CollectionList from './components/CollectionList';


export default function App() {
  const [page, setPage] = useState('discovery');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setPage('discovery')} className="px-4 py-2 bg-blue-500 text-white rounded">Discovery</button>
        <button onClick={() => setPage('collection')} className="px-4 py-2 bg-green-500 text-white rounded">My Collection</button>
      </div>
      {page === 'discovery' ? <Discovery /> : <CollectionList />}
    </div>
  );
}
