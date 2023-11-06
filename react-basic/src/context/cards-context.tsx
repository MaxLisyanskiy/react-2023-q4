import { createContext, useState } from 'react';
import { ICharacter } from '../types/characters';
import { ProviderProps, CardsContextType } from '../types/context-types';

export const CardsContext = createContext<CardsContextType | null>(null);

const CardsProvider = ({ children }: ProviderProps) => {
  const [cards, setCards] = useState<ICharacter[] | []>([]);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;
