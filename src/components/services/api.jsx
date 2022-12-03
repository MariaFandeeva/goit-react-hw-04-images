import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: '30738734-dcb87b478c99ce7d2b96a65dd',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImg = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};
