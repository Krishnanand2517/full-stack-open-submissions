import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newObject => {
  config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return response.data;
};

const deleteBlog = async (blogToDelete) => {
  const response = await axios.delete(`${baseUrl}/${blogToDelete.id}`);
  return response.data;
};

export default { getAll, create, setToken, deleteBlog, update };