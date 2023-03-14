const BASE_URL = 'https://picsum.photos/v2';

const getList = async ({page = 1}) => {
  const response = await fetch(`${BASE_URL}/list?page=${page}`);
  const photos = await response.json();
  return photos;
};

const formatPhotoUri = (id, width, height) => {
  return `https://picsum.photos/id/${id}/${Math.floor(width)}/${Math.floor(
    height,
  )}`;
};

export {getList, formatPhotoUri};
