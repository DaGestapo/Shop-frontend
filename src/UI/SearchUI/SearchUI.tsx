import {FC, FormEvent, useState} from 'react';
import module from './SearchUI.module.scss';

interface SearchUIPropsI {
  placeholder: string;
}

const SearchUI:FC<SearchUIPropsI> = ({placeholder}) => {
  const [searhQuery, setSearhQuery] = useState<string>('');

  const searchForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <form 
      className={module.form}
      onSubmit={searchForm}
    >
        <input 
          type="text" 
          className={module.input}
          placeholder={placeholder}
          onChange={(e) => setSearhQuery(e.target.value)}
          />
        <button>
          Search
        </button>
    </form>
  );
}

export default SearchUI;
