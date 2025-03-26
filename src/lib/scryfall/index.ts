import { cardNamedSchema } from '@/lib/scryfall/schemas/card-named'
import { cardListSchema } from '@/lib/scryfall/schemas/card-search'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

export class ScryfallService {
  private static readonly ENDPOINTS = {
    CARDS_SEARCH: '/cards/search',
    CARDS_NAMED: '/cards/named',
  }

  private api = axios.create({
    baseURL: 'https://api.scryfall.com',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  getCards(q?: string) {
    return queryOptions({
      queryKey: ['cards', q],
      queryFn: async () => {
        try {
          if (!q) return null
          const { data } = await this.api.get(ScryfallService.ENDPOINTS.CARDS_SEARCH, {
            params: { q },
          })
          console.log({ data })
          return cardListSchema.parse(data)
        } catch (e) {
          if (e instanceof AxiosError) toast.error(e.response?.data.details ?? e.message)
          return null
        }
      },
      enabled: !!q,
    })
  }

  getCardByName(name: string, exact = false) {
    return queryOptions({
      queryKey: ['card', name, exact],
      queryFn: async () => {
        const { data } = await this.api.get(ScryfallService.ENDPOINTS.CARDS_NAMED, {
          params: {
            [exact ? 'exact' : 'fuzzy']: name,
          },
        })
        return cardNamedSchema.parse(data)
      },
    })
  }
}
export const scryfallService = new ScryfallService()

export const useGetCards = (q?: string) => {
  return useSuspenseQuery(scryfallService.getCards(q))
}
