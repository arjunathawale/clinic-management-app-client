import axios from 'axios';
import moment from 'moment';
const BASE_URL = '' // server url


export const apiPost = async (method, data) => {
  try {

    const start = new Date();
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      apikey: "VHiBaWkAQl52lwbqBtlGyzaQYfNfK94A",
    };
    let config = {
      headers
    }

    let body = JSON.stringify(data);
    const response = await axios.post(BASE_URL + method, data, config)
    if (!response) {
      return { code: 999, message: 'Response not found' };
    }
    const result = await response.data;
    if (result?.statusCode !== 200) {
      console.warn(
        `Error: ${BASE_URL}${method}`,
        moment(new Date()).diff(start, 'milliseconds'),
        body,
        result,
      );
    } else {
      console.log(
        `success: ${BASE_URL}${method}`,
        moment(new Date()).diff(start),
        data,
      );
    }
    return result;
  } catch (err) {
    console.warn(`Route Not Found: ${BASE_URL}${method}`, err);
    return { code: 999, message: '' + err };

  }

};

