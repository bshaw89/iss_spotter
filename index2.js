const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(coords) {
  console.log('It worked! Coords:', coords);
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log('It didn\'t work: ', error.message);
  });

