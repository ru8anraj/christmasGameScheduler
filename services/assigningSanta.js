const superagent = require('superagent');

const request = {
  /*
   * Calling server to interact with DB
   */

  getSantas: function() {
    /*
     * Getting all santas data from DB
     */
    return new Promise((resolve, reject) => {
      superagent
        .get("http://localhost:5005/santas/getSantas")
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
    /*
     * Updating child for each santa in bulk to DB
     */
    return new Promise((resolve, reject) => {
      superagent
        .post('http://localhost:5005/santas/updateChild')
        .send({santas: santas})
        .end((err, res) => {
          if (err) {
            reject('Error in getting santas data - > '+ err);
          } else if(res.text == 'done') {
            resolve('Updated child in bulk');
          } else if(res.text == 'error') {
            reject('Error from db to update in bulk');
          }
        });
    });
  }
};

function assigningChild(santas, chitPot) {
  /*
   * Assigns child for each santa {{not a good logic -- need betterment}}
   */
  santas.map((santa) => {
    let random = chitPot[Math.floor(Math.random() * chitPot.length)];
    let randIndex = chitPot.indexOf(random);
    if (randIndex > -1) {
      chitPot.splice(randIndex, 1);
    }
    santa.child = random;
  });
  return(santas);
}

async function assignSanta() {
  /* getting santas data from DB */
  var santas = await request.getSantas().catch(err => console.error(err));
  
  /* duplicating santas array */
  var chitPot = santas.map(santa => santa.name);
  
  /* Assigning child to each santa */
  var updatedSanta = await assigningChild(santas, chitPot)

  /* updating the santa with value in DB */
  await request.updateChild(updatedSanta).catch(err => console.error(err));
  console.log(santas); // unintentional closure! {Can't understand how it works}

  return('Assigned with child and saved to DB!');
}

module.exports = assignSanta;