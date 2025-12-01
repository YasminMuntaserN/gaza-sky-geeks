import React from "react";
import type { Character } from "../types/character";
import { useNavigate } from "react-router-dom";

interface Props {
  character: Character;
}

export const CharacterCard: React.FC<Props> = ({ character }) => {
  const navigate = useNavigate();
  const statusClasses: Record<string, string> = {
    Alive: "bg-green-500 dark:bg-green-400 text-white",
    Dead: "bg-red-500 dark:bg-red-400 text-white",
    unknown: "bg-gray-500 dark:bg-gray-400 text-white",
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" onClick={()=>navigate(`characters/${character.id}`)} >
      <div className="relative overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[character.status]}`}>
  {character.status}
</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white truncate">
          {character.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {character.species}
        </p>
      </div>
    </div>
  );
};
