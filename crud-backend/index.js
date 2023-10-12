const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5001;

// middlewares

app.use(cors());
app.use(express.json());

// Mongo DB Connection

const uri = "mongodb+srv://nazmul:WAJexdLH839cHDRT@mongodbcloud.ja2jrii.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get('/users', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      console.log(result);
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      console.log(req.body);
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged!!! You are successfully connected to MongoDB!");
  } finally {
    // await client.close();

  }
}
run().catch(console.log);



app.get('/', (req, res) => {
  res.send('Simple Mongodb Crud Operation.');
})

app.listen(port, () => console.log(`MongoDB CRUD Backend app listening on port ${port}!`));