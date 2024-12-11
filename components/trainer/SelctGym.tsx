
import React, { useState } from 'react';
import { Input } from '@/components/ui/input'; // Adjust the import path based on your project structure
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from '@/components/ui/command'; // Example for a command-based select component
import { Search } from 'lucide-react';

const gyms = [
  "Gold's Gym",
  'Planet Fitness',
  'LA Fitness',
  '24 Hour Fitness',
  'Anytime Fitness',
  'Snap Fitness',
  'Crunch Fitness',
  'Equinox',
  'Lifetime Fitness',
  'YMCA',
];

const SelectGym: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGym, setSelectedGym] = useState<string | null>(null);

  const filteredGyms = gyms.filter((gym) =>
    gym.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4 p-2 bg-white rounded-lg flex items-center">
        <Search className="mr-2 text-muted-foreground" />
        <Input
          placeholder="Search Gym"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none focus:ring-0"
        />
      </div>
      
      <ul className="max-h-52 overflow-auto bg-white rounded-lg shadow-sm">
        {filteredGyms.length > 0 ? (
          filteredGyms.map((gym, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                selectedGym === gym ? 'bg-gray-300' : ''
              }`}
              onClick={() => setSelectedGym(gym)}
            >
              {gym}
            </li>
          ))
        ) : (
          <li className="p-2 text-center text-gray-500">No gyms found.</li>
        )}
      </ul>
    </div>
  );
};

export default SelectGym;
