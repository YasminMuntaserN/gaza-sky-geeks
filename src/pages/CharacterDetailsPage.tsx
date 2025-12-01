import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCharacterDetails, useEpisodes } from "../hooks/useCharacters";
import { useTheme } from "../contexts/ThemeProvider";
import { ArrowLeft, MapPin, Globe, Tv } from "lucide-react";
import Header from "../components/Header";

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { getCharacter, character, isLoading: loadingCharacter } = useCharacterDetails();
  const { getEpisodes, episodes, isLoading: loadingEpisodes } = useEpisodes();

  useEffect(() => {
    if (id) {
      const charId = parseInt(id);
      getCharacter(charId);
    }
  }, [id]);

  useEffect(() => {
    if (character && character.episode.length > 0) {
      const episodeIds = character.episode.map((epUrl) => parseInt(epUrl.split("/").pop()!));
      getEpisodes(episodeIds);
    }
  }, [character]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loadingCharacter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Character not found
            </h2>
            <button
              onClick={() => navigate("/characters")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Characters
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/characters")}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Characters
        </button>

        {/* Character Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Character Image */}
            <div className="lg:col-span-1 grid grid-cols[2fr_1fr_1fr] gap-6 mb-8">
              <div className="relative">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full rounded-xl shadow-lg"
                />
                <div className="absolute top-4 right-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(character.status)} text-white text-sm font-medium shadow-lg`}>
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    {character.status}
                  </div>
                </div>
              </div>
              {/* Origin */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Origin</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{character.origin.name}</p>
                </div>
                                {/* Location */}
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Last Known Location</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{character.location.name}</p>
                </div>
            </div>

            {/* Character Info */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {character.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {character.species} • {character.gender}
              </p>

              {/* Episodes Section */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Tv className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Episodes ({character.episode.length})
                  </h2>
                </div>

                {loadingEpisodes ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                    {episodes.map((ep) => (
                      <div
                        key={ep.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {ep.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {ep.episode} • {ep.air_date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterDetailsPage;