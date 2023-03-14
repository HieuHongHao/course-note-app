import { PokemonClient } from "pokenode-ts";


const globalForPokeClient = globalThis as unknown as { pokemonClient: PokemonClient };

export const pokeClient = globalForPokeClient.pokemonClient || new PokemonClient();