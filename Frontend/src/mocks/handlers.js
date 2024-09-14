import { http, HttpResponse } from 'msw'
import mocktails from './MocktailMock.json'

//https://mswjs.io/docs/getting-started
 
export const handlers = [
  http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php', () => {
    return HttpResponse.json({ drinks: mocktails })
  }),
]