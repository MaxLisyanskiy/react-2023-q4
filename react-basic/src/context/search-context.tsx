import { createContext, useState } from 'react';
import { ProviderProps, SearchContextType } from '../types/context-types';

export const SearchContext = createContext<SearchContextType | null>(null);

const SearchProvider = ({ children }: ProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('rss_project_01_search') ?? '',
  );

  return (
    <SearchContext.Provider
      value={{ search: searchValue, changeSearch: setSearchValue }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
