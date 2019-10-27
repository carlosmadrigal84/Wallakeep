import Ad from '../models/Ad';

const API_URL = 'http://localhost:3001/apiv1/anuncios';


const listAds = () => {
       return axios.get(this.API_URL)
               .then(res => res.results.map(ad => new Ad(ad)))
}

export {
  listAds
};

export default API_URL;