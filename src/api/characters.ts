import { apiClient } from "../services/apiClient";
import type  { Character } from "../types/character";
import type  { Episode } from "../types/episode";

export async function getAllCharacters(page = 1, search = "") {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  const data = await res.json(); 
  return data;
}


export const getCharacterById = async (id: number): Promise<Character> => {
  const { data } = await apiClient.get(`/character/${id}`);
  return data;
};

export const getEpisodesByIds = async (ids: number[]): Promise<Episode[]> => {
  const { data } = await apiClient.get(`/episode/${ids.join(",")}`);
  return Array.isArray(data) ? data : [data]; 
};
