import axios from 'axios';

const getData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/profile');
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export default getData;

// const getData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/profile');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching data", error);
//       throw error;
//     }
//   };
  
//   export default getData;
  
