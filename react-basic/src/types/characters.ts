export interface ICharacter {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom: string;
  attacks: Attack[];
  weaknesses: Weakness[];
  resistances: Resistance[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: Images;
  tcgplayer: Tcgplayer;
  cardmarket: Cardmarket;
}
interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Weakness {
  type: string;
  value: string;
}

interface Resistance {
  type: string;
  value: string;
}

interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

interface Legalities {
  unlimited: string;
}

interface SetImages {
  symbol: string;
  logo: string;
}

interface Images {
  small: string;
  large: string;
}

interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: Prices;
}

interface Prices {
  holofoil: Holofoil;
  reverseHolofoil: ReverseHolofoil;
}

interface Holofoil {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number | null;
}

interface ReverseHolofoil {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
}

interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: CardmarketPrices;
}

interface CardmarketPrices {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}

export interface ICharacterResponse {
  data: ICharacter[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface PageInfoProps {
  search: string | null;
  page: number;
  pageSize: number;
  totalCount: number;
}
