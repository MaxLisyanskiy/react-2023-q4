export type ISearchProps = {
  searchValue: string;
  getData: (value: string) => void;
};

export type ISearchState = {
  value: string;
};
