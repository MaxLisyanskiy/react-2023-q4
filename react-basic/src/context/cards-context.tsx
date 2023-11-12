import { createContext, useState } from 'react';
import { ICard } from '../types/card-type';
import { ProviderProps, CardsContextType } from '../types/context-types';

export const CardsContext = createContext<CardsContextType | null>(null);

const CardsProvider = ({ children }: ProviderProps) => {
  const [cards, setCards] = useState<ICard[] | []>([]);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;
