import axios from 'axios';

const API_KEY = '34815757-11540e8253cc9068e0c598d0d';
// const perPage = 12
export const getPosts = (query, page) => {
  console.log(page);
  return axios.get(
    `https://pixabay.com/api/?q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
};
