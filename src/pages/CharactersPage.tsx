import React, { useState, useEffect } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { CharacterCard } from "../components/CharacterCard";
import { SearchBar } from "../components/SearchBar";
import type  { Character } from "../types/character";
import { useTheme } from "../contexts/ThemeProvider";
import { ChevronLeft, ChevronRight ,FileMinus } from "lucide-react";
import Header from "../components/Header";

const CharactersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const { characters, totalPages, isLoading, error } = useCharacters(page, search);
  console.log("characters:", characters);
  console.log("totalPages:", totalPages);
  

  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
 console.log(pageNumbers)
 console.log(totalPages)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Search */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Characters
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore all characters from the Rick and Morty universe
          </p>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Characters Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {characters.length > 0 ?characters.map((char) => (
                <CharacterCard key={char.id} character={char} />
              ))
              :
<div className="flex flex-col items-center justify-center py-20">
      <FileMinus className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
        No Data Found
      </p>
    </div>
              }
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:border-purple-500 dark:hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 transition-all"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {startPage > 1 && (
                  <>
                    <button
                      onClick={() => setPage(1)}
                      className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all"
                    >
                      1
                    </button>
                    {startPage > 2 && (
                      <span className="text-gray-400 dark:text-gray-600">...</span>
                    )}
                  </>
                )}

                {pageNumbers.map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all font-medium ${
                      pageNum === page
                        ? "bg-purple-500 border-purple-500 text-white"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:border-purple-500 dark:hover:border-purple-400"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {endPage < totalPages && (
                  <>
                    {endPage < totalPages - 1 && (
                      <span className="text-gray-400 dark:text-gray-600">...</span>
                    )}
                    <button
                      onClick={() => setPage(totalPages)}
                      className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:border-purple-500 dark:hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 transition-all"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                {characters.length} characters
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CharactersPage;
