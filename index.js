const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }

//   console.log('It worked! It returned IP:', ip);
// });

// fetchCoordsByIP('72.137.45.137', (error, coords) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }

//   console.log('It worked! Coords:', coords);
// });

fetchISSFlyOverTimes({ latitude: '44.00010', longitude: '-79.46630' }, (error, coords) => {
  if (error) {
    console.log('It didn\'t work!', error);
    return;
  }

  console.log('It worked! Coords:', coords);
});