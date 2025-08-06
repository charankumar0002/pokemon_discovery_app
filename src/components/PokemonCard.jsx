import React, { useEffect, useState } from 'react';
  
  export default function PokemonCard({ name, url }) {
    const [details, setDetails] = useState(null);
  
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setDetails(data));
    }, [url]);
  
    const addToCollection = () => {
      const stored = JSON.parse(localStorage.getItem('collection') || '[]');
      const exists = stored.find((p) => p.name === name);
      if (!exists) {
        stored.push({ name, image: details.sprites.front_default });
        localStorage.setItem('collection', JSON.stringify(stored));
      }
    };
  
    if (!details) return <div className="p-4 bg-white rounded shadow">Loading...</div>;
  
    return (
      <div className="p-4 bg-white rounded shadow">
        <img src={details.sprites.front_default} alt={name} className="w-20 h-20 mx-auto" />
        <h3 className="text-center capitalize font-semibold mt-2">{name}</h3>
        <div className="flex justify-center gap-1 mt-2">
          {details.types.map((t) => (
            <span key={t.type.name} className="text-xs px-2 py-1 bg-gray-200 rounded">{t.type.name}</span>
          ))}
        </div>
        <div className="text-xs mt-2">
          <p>HP: {details.stats[0].base_stat}</p>
          <p>Attack: {details.stats[1].base_stat}</p>
          <p>Defense: {details.stats[2].base_stat}</p>
        </div>
        <button onClick={addToCollection} className="block mt-3 w-full py-1 bg-blue-600 text-white rounded">+</button>
      </div>
    );
  }