const axios = require('axios');
const { keyApiNova: apiKey } = require('../../config');

const urlSearchSettlements = 'http://testapi.novaposhta.ua/v2.0/json/Address/searchSettlements/';
const urlGetPriceDelivery = 'http://testapi.novaposhta.ua/v2.0/en/getDocumentPrice/json/';

async function searchSettlements(addresses) {
  const result = await axios.post(urlSearchSettlements, {
    apiKey,
    modelName: 'Address',
    calledMethod: 'searchSettlements',
    methodProperties: {
      CityName: addresses,
      Limit: 1,
    },
  });
  return result.data.data[0].Addresses[0].Ref;
}

async function getPriceDelivery(params) {
  const result = await axios.post(urlGetPriceDelivery, {
    apiKey,
    modelName: 'InternetDocument',
    calledMethod: 'getDocumentPrice',
    methodProperties: {
      CitySender: `${params.from}`,
      CityRecipient: `${params.to}`,
      Weight: `${params.weight}`,
      ServiceType: 'DoorsDoors',
      Cost: `${params.price}`,
      CargoType: 'Cargo',
      SeatsAmount: '10',
    },
  });
  // console.log(result.data);
  return result.data;
}

module.exports = {
  searchSettlements,
  getPriceDelivery,
};
