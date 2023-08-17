const axios = require('axios');

class JesusApi {
    getJesusQuote() {
      try {
        return axios.get('https://dwarfishlife.com/api/jesus/quotes');
      } catch (e) {
        throw Error('something went wrong');
      }
    };

    getJesusPic() {
        try {
          return axios.get('https://dwarfishlife.com/api/jesus/pic');
        } catch (e) {
          throw Error('something went wrong');
        }
      };
  }
  module.exports = JesusApi;