import axios from 'axios';
import URL from '../constants/constants';

// API GET test
const apiTest = async () => {
      try {
         const response = await axios.get(URL);
         console.log(response);
         console.log(response.data);
      } catch (error) {
         console.error(error);
      }
};


   
export default apiTest;