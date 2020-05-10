/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const myIpUrl = 'https://api.ipify.org?format=json';
  request(myIpUrl, (error, response, body) => {
    if (!response) {
      callback("invalid URL", null);
      return;
    }

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    if (ip.length === 0) {
      callback(("IP address not found", null));
    }
    callback(null, ip);
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const latLongURL = `https://ipvigilante.com/json/${ip}`;
  request(latLongURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if (!response) {
    //   callback("Invalid URL", null);
    //   return;
    // }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;
    // const coords = {
    //   latitude,
    //   longitude
    // }
    callback(null, { latitude, longitude });
    return;
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  // ...

  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passtimes = JSON.parse(body).response;
    callback(null, passtimes);
    return;
  });
};

module.exports =
{
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};