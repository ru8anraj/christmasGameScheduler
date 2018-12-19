const qb = require('express').Router()
    , MongoClient = require('mongodb').MongoClient
    , url = 'mongodb://localhost:27017'
    , dbName = 'christmasGame'
    , collectionName = 'questionBank';


var questions = [];


function mongoClient() {
  /*
   * Creating connection to Mongo Server
   */
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
      if (err) {
        reject('Error in connecting to DB from santas');
      } else {
        console.info('Successfully connected to Mongo Server from santas');
        resolve(client);
      }
    });
  });
}

const dbCalls = {
  /* inserting santa to the santas collection */
  getQuest: function(db) {
    return new Promise((resolve, reject) => {
      const collection = db.collection(collectionName);
      collection.find({}).toArray(function(err, docs) {
        if (err) {
          reject('error in fetching quest - > '+ err);
        } else {
          resolve(JSON.stringify(docs));
        }
      });
    });
  },
}

qb.get('/', async function(req, res) {
  var client = await mongoClient().catch(err => console.error(err));
  var db = client.db(dbName);

  dbCalls.getQuest(db)
    .then((t) => {
      questions = JSON.parse(t);
      res.json(question);
    })
    .catch((err) => {
      console.error(err);
      res.send('Error in fetching santas data');
    });
});

qb.get('/quest', function(req, res) {
  let q = questions.map((que, i) => {
    if(i < 5) {
      return que;
    }
  });
  questions.pop();
  questions.pop();
  questions.pop();
  questions.pop();
  questions.pop();  
  res.json(q);
});

module.exports = qb;