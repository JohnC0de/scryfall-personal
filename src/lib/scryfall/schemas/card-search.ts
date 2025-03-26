import { z } from 'zod'

export const cardSchema = z.object({
  id: z.string(),
  oracle_id: z.string(),
  name: z.string(),
  set_name: z.string(),
  collector_number: z.string(),
  image_status: z.string(),
  image_uris: z
    .object({
      small: z.string(),
      normal: z.string(),
    })
    .nullish(),
  lang: z.string(),
})
export type Card = z.infer<typeof cardSchema>

export const cardListSchema = z.object({
  object: z.string(),
  has_more: z.boolean(),
  next_page: z.string().nullish(),
  data: z.array(cardSchema),
})
export type CardList = z.infer<typeof cardListSchema>
