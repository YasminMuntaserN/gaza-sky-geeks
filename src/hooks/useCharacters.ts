import { useMutation ,useQuery } from "@tanstack/react-query";
import { getAllCharacters, getCharacterById, getEpisodesByIds } from "../api/characters";
import type  { Character } from "../types/character";
import type  { Episode } from "../types/episode";

export function useCharacters(page: number, search: string) {
  const { data, isLoading, error } = useQuery<CharactersResponse>({
    queryKey: ["characters", page, search],
    queryFn: async () => {
      const result = await getAllCharacters(page, search);
      console.log("API result:", result);
      return result;
    },
    keepPreviousData: true, 
  });
  return {
    characters: data?.results ?? [],
    totalPages: data?.info?.pages ?? 1,
    isLoading,
    error,
  }; 
}

export function useCharacterDetails() {
  const { mutate: getCharacter, data, status, error } = useMutation({
    mutationFn: (id: number) => getCharacterById(id),
    mutationKey: ["characterDetails"],
  });

  return {
    getCharacter,
    character: data,
    isLoading: status === "pending",
    error,
  };
}

export function useEpisodes() {
  const { mutate: getEpisodes, data, status, error } = useMutation({
    mutationFn: (ids: number[]) => getEpisodesByIds(ids),
    mutationKey: ["episodes"],
  });

  return {
    getEpisodes,
    episodes: data ?? [],
    isLoading: status === "pending",
    error,
  };
}
