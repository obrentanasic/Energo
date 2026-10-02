// Photos picked from the imported project / news images for the page heroes (all paths come from the importer).
import { newsList, projectList } from '../data'

const proj = (re, fallback = 0) => projectList.filter(p => p.image).find(p => re.test(p.title))?.image ?? projectList.filter(p => p.image)[fallback]?.image ?? null
const news = (re, fallback = 0) => newsList.filter(n => n.image).find(n => re.test(n.title))?.image ?? newsList.filter(n => n.image)[fallback]?.image ?? null

export const heroImages = {
  home: proj(/karuma/i, 0),
  about: proj(/kosa kvart/i, 1),
  services: proj(/karuma|piva|perućica/i, 2),
  sustainability: news(/ekovadis|održiv/i, 1),
  careers: news(/konferencij|stipend|praks/i, 2),
  wide: proj(/autoput|put\b/i, 3),
  investors: news(/skupšt|izveštaj/i, 3),
  publications: news(/publikac|monograf/i, 4),
}
