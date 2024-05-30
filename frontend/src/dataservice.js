import axios from 'axios';

const getData = async () => {
  try {
    const response = await axios.get('https://portfolio-backend1-eta.vercel.app/api/profile');
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export default getData;


