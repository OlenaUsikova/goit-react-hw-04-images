import PropTypes from 'prop-types'
import { BsSearchHeart } from 'react-icons/bs';

import {
  SearchbarWr,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.target.elements.query.value);
  };
  return (
    <SearchbarWr>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearchHeart />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </SearchForm>
    </SearchbarWr>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func}