// export interface ICharacter {
//   id: number;
//   name: string;
//   status: string;
//   species: string;
//   type: string;
//   gender: string;
//   origin: {
//     name: string;
//     url: string;
//   };
//   location: {
//     name: string;
//     url: string;
//   };
//   image: string;
//   episode: string[];
//   url: string;
//   created: string;
// }

export interface ICharacter {
  id: number;
  gender: string;
  date_of_birth: string;
  job: string;
  city: string;
  zipcode: string;
  latitude: number;
  profile_picture: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  state: string;
  country: string;
  longitude: number;
}

export interface ICharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}
