require('dotenv').config()
const express = require("express")
const jwt = require('jsonwebtoken');
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p62hq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("DineEasyDB");

        const usersCollection = database.collection("users")
        const menuCollection = database.collection("menu");
        const reviewCollection = database.collection("reviews")
        const cartCollection = database.collection("carts")


        // JWT related API
        app.post('/jwt', async (req, res) => {
            const user = req.body

            // follow doc(Github):
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            })
            res.send({ token })
        })

        // Middleware
        const verifyToken = (req, res, next) => {
            // console.log("Inside verify token", req.headers.authorization);

            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'Unauthorized access' });
            }

            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'Unauthorized access' });
                }
                // Success case - token is valid
                req.decoded = decoded;
                next();
            });
        }

        // custom=> For verifying the user is Actual admin or not
        // use verify admin after verifyToken
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email
            const query = { email: email }
            const user = await usersCollection.findOne(query)
            const isAdmin = user?.role === 'admin'
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            next();
        }

        // Users related APIS
        app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
            // console.log(req.headers);

            const result = await usersCollection.find().toArray()
            res.send(result)
        })

        app.post("/users", async (req, res) => {
            const users = req.body

            const query = { email: users.email }
            const existUser = await usersCollection.findOne(query)
            console.log(existUser);
            if (existUser) {
                return res.send({ message: "User Already exist.", insertedId: null })
            }

            const result = await usersCollection.insertOne(users)
            res.send(result)
        })

        app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await usersCollection.deleteOne(filter)
            res.send(result)
        })

        app.patch("/users/admin/:id", async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }

            const updateDoc = {
                $set: {
                    role: "admin"
                }
            }

            const result = await usersCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // Check Admin
        app.get('/users/admin/:email', verifyToken, verifyAdmin, async (req, res) => {
            const email = req.params.email

            if (email !== req.decoded.email) {
                return res.status(403).send({ message: "forbidden access" })
            }

            const query = { email: email }
            const user = await usersCollection.findOne(query)
            let admin = false
            if (user) {
                admin = user?.role === 'admin'
            }
            res.send({ admin })
        })

        // Menu Related APIS
        app.get("/menu",verifyToken,verifyAdmin, async (req, res) => {
            const result = await menuCollection.find().toArray()
            res.send(result)
        })

        app.post('/menu', async (req, res) => {
            const menuItem = req.body
            const result = await menuCollection.insertOne(menuItem)
            res.send(result)
        })

        // Reviews Related APIS
        app.get("/reviews", async (req, res) => {
            const result = await reviewCollection.find().toArray()
            res.send(result)
        })


        // Cart Related APIS
        app.get("/carts", async (req, res) => {
            const email = req.query.email
            const query = { email: email }

            const result = await cartCollection.find(query).toArray()
            res.send(result)
        })

        app.post("/carts", async (req, res) => {
            const cartItem = req.body
            const result = await cartCollection.insertOne(cartItem)
            res.send(result)
        })

        app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await cartCollection.deleteOne(query)
            res.send(result)
        })






        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Hello from DineEasy Server!");
})

app.listen(port, () => {
    console.log(`DineEasy Server is running from ${port}`);
})
