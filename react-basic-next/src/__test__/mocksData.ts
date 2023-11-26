import { CardProps } from '@/components/Card/Card';
import { gSSP, IDetailedCard } from '@/types/card-type';

export const CardTestProps: CardProps = {
  id: 'hgss4-1',
  image: 'https://images.pokemontcg.io/hgss4/1.png',
  name: 'Aggron',
};

export const DetailedCardItemTestProps: IDetailedCard = {
  id: 'det1-1',
  name: 'Bulbasaur',
  supertype: 'Pokémon',
  hp: '60',
  rarity: 'Common',
  flavorText:
    'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
  images: {
    small: 'https://images.pokemontcg.io/det1/1.png',
    large: 'https://images.pokemontcg.io/det1/1_hires.png',
  },
};

export const CardListTestProps = [
  {
    id: 'dp3-1',
    name: 'Ampharos',
    images: {
      small: 'https://images.pokemontcg.io/dp3/1.png',
      large: 'https://images.pokemontcg.io/dp3/1_hires.png',
    },
  },
  {
    id: 'ex12-1',
    name: 'Aerodactyl',
    images: {
      small: 'https://images.pokemontcg.io/ex12/1.png',
      large: 'https://images.pokemontcg.io/ex12/1_hires.png',
    },
  },
  {
    id: 'mcd19-1',
    name: 'Caterpie',
    images: {
      small: 'https://images.pokemontcg.io/mcd19/1.png',
      large: 'https://images.pokemontcg.io/mcd19/1_hires.png',
    },
  },
  {
    id: 'ex7-1',
    name: 'Azumarill',
    images: {
      small: 'https://images.pokemontcg.io/ex7/1.png',
      large: 'https://images.pokemontcg.io/ex7/1_hires.png',
    },
  },
  {
    id: 'sm9-1',
    name: 'Celebi & Venusaur-GX',
    images: {
      small: 'https://images.pokemontcg.io/sm9/1.png',
      large: 'https://images.pokemontcg.io/sm9/1_hires.png',
    },
  },
];

export const GSSPTestProps: gSSP = {
  cards: {
    items: CardListTestProps,
    totalCount: 5,
    isLoading: false,
  },
  detailed: DetailedCardItemTestProps,
};
