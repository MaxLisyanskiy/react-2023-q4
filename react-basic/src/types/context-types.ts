export type ProviderProps = {
  children: string | JSX.Element | JSX.Element[];
};

export type SearchContextType = {
  search: string;
  changeSearch: (search: string) => void;
};
