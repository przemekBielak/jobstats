var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mycustomers";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  
  var dbo = db.db("mycustomers");

  var myobj = { name: "Company Inc", address: "Highway 37" };

  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});