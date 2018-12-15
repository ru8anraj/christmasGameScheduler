const superagent = require('superagent');

const request = {
  getSantas: function(url = '') {
    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .end((err, res) => {
          if (err) {
            reject('Error in getting santas data - > '+ err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },
  updateChild: function(santas) {
    return new Promise((resolve, reject) => {
      superagent
        .post('http://localhost:5005/santas/updateChild')
        .send({santas: santas})
        .end((err, res) => {
          if (err) {
            reject('Error in getting santas data - > '+ err);
          } else {
            resolve(res.text);
          }
        });
    });
  }
};

function assigningChild(santas, chitPot) {
  return new Promise((resolve, reject) => {
    santas.map((santa) => {
      let random = chitPot[Math.floor(Math.random() * chitPot.length)];
      let randIndex = chitPot.indexOf(random);
      if (randIndex > -1) {
        chitPot.splice(randIndex, 1);
      }
      santa.child = random;
    });
    resolve(santas);
  });
}

async function assignSanta(url) {
  return new Promise((resolve, reject) => {
    try {
      var santas = await request.getSantas(url);
      var chitPot = santas.map(santa => santa.name);
      var updatedSantas = await assigningChild(santas, chitPot);
      var updatingChild = await request.updateChild(santas);
      resolve('Assigned with child and saved to DB!');
    } catch(error) {
      reject('Error in assigning santas and child - > ' + error);
    }
  });
}

module.exports = assignSanta;