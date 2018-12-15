const santas = require('express').Router()
    , MongoClient = require('mongodb').MongoClient
    , url = 'mongodb://localhost:27017'
    , dbName = 'christmasGame'
    , collectionName = 'santas';

function mongoClient() {
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
  insertSanta: function(db, document) {
    return new Promise((resolve, reject) => {
      const collection = db.collection(collectionName);
      collection.insertOne(document, function(err, result) {
        if (err) {
          reject('error in inserting santa docs - > '+ err);
        } else {
          resolve('Inserted '+ JSON.stringify(result));
        }
      });
    });
  },

  /* getting list of santas from santas collection */
  findSantas: function(db) {
    return new Promise((resolve, reject) => {
      const collection = db.collection(collectionName);
      collection.find({}).toArray(function(err, docs) {
        if (err) {
          reject('error in fetching santas - > '+ err);
        } else {
          resolve(JSON.stringify(docs));
        }
      });
    });
  }
};

/* child routes */
santas.post('/addSanta', async function(req, res) {
  var client = await mongoClient().catch(err => console.error(err));
  var db = client.db(dbName);
  var document = {
    // for testing purpose -> Hardcoded doc obj
    name: 'tester'
  };
  dbCalls.insertSanta(db, document)
    .then((t) => {
      console.log(t);
      client.close();
      res.send('Santa added successfully');
    })
    .catch((err) => {
      console.error(err);
      res.send('Error in adding santa');
    });
});

santas.get('/getSantas', async function(req, res) {
  var client = await mongoClient().catch(err => console.error(err));
  var db = client.db(dbName);
  dbCalls.findSantas(db)
    .then((t) => {
      let santas = JSON.parse(t);
      client.close();
      res.json(santas);
    })
    .catch((err) => {
      console.error(err);
      res.send('Error in fetching santas data');
    });
});

santas.post('/updateChild', function(req, res) {
  console.log(req.body);
  res.send('done');
});

module.exports = santas;