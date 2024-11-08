import axios from 'axios';

// API GET test
const URL = "http://43.201.46.230:8080/api/v1/cors";

const getTest = async () => {
      try {
         const response = await axios.get(URL);
         console.log(response);
         console.log(response.data);
      } catch (error) {
         console.error(error);
      }
};
   
export default getTest;