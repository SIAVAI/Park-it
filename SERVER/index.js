const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //Secret key for backend

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3001",
    "https://localhost:9000",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 9000;

// Wl4yMs7jQ5ZZhhxa
// park_it

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://park_it:Wl4yMs7jQ5ZZhhxa@cluster0.bruzsiw.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const paymentsCollection = client.db("park_it").collection("payments");
    app.post("/create-payment-intent", async (req, res) => {
      const { amount, spotId, userEmail, spotName } = req.body;

      try {
        // Convert dollar amount to cents
        const amountInCents = Math.round(amount * 100);

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        });

        const paymentRecord = {
          paymentIntentId: paymentIntent.id,
          amount: amountInCents,
          spotId: spotId,
          userEmail: userEmail,
          spotName: spotName,
          currency: "usd",
          status: paymentIntent.status,
          createdAt: new Date(),
        };

        await paymentsCollection.insertOne(paymentRecord);
        res.send({
          clientSecret: paymentIntent.client_secret,
        });

        //console.log("Payment Intent created:", paymentIntent);
      } catch (error) {
        console.error("Stripe payment error:", error.message);
        res.status(500).send({ error: error.message });
      }
    });

    // Fetch Payment History
    app.get("/payment-history", async (req, res) => {
      try {
        const payments = await paymentsCollection.find({}).toArray();
        res.status(200).json(payments);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).send({ error: "Failed to fetch payment history." });
      }
    });

    app.get("/payment/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const payment = await paymentsCollection.find(query).toArray();
      if (!payment) {
        return res.status(404).send({ error: "Payment not found" });
      }
      res.status(200).send(payment);
    });

    // Users Collection
    const userCollection = client.db("park_it").collection("users");

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      if (!user.phone) {
        user.phone = null;
      }
      const bookMark = [];
      const parkingHistory = [];
      const discount = null;
      const userData = {
        ...user,
        bookMark,
        parkingHistory,
      };
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists" });
      }
      const result = await userCollection.insertOne(userData);
      console.log(result);
      res.send(result);
    });

    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send({ message: "User deleted successfully" });
    });

    // Parking Collection
    const parkingCollection = client.db("park_it").collection("parking");
    // Get all parking spots
    app.get("/parking", async (req, res) => {
      try {
        const result = await parkingCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to retrieve parking spots" });
      }
    });
    // Get a specific parking spot by ID
    app.get("/parking/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const parkingSpot = await parkingCollection.findOne(query);

        if (!parkingSpot) {
          return res.status(404).send({ error: "Parking spot not found" });
        }

        res.status(200).send(parkingSpot);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to retrieve parking spot" });
      }
    });
    // Create a new parking spot
    app.post("/parking", async (req, res) => {
      const reviews = [];
      const isAvailable = true;
      try {
        const parkingSpot = req.body;

        if (
          !parkingSpot.name ||
          !parkingSpot.city ||
          !parkingSpot.lat ||
          !parkingSpot.lng
        ) {
          return res.status(400).send({ error: "Missing required fields" });
        }

        const spots = { ...parkingSpot, reviews, isAvailable };
        const result = await parkingCollection.insertOne(spots);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to create parking spot" });
      }
    });
    // Update a parking spot by ID and reviews
    app.put("/parking/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { rating, reviewText, name, email, photoURL } = req.body;
        if (!id) {
          return res.status(400).send({ error: "ID is missing" });
        }
        console.log("Received ID:", id);

        const filter = { _id: new ObjectId(id) };
        const newReview = {
          rating,
          reviewText,
          name,
          email,
          photoURL,
          date: new Date(),
        };
        const updateDoc = {
          $push: { reviews: newReview },
        };

        const result = await parkingCollection.updateOne(filter, updateDoc);

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .send({ error: "Parking spot not found or no changes made" });
        }

        res
          .status(200)
          .send({ success: true, message: "Review added successfully" });
      } catch (error) {
        console.error("Error updating parking spot:", error);
        res.status(500).send({ error: "Failed to update parking spot" });
      }
    });

    // Delete a parking spot by ID
    app.delete("/parking/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        console.log(id);

        const result = await parkingCollection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res.status(404).send({ error: "Parking spot not found" });
        }

        res.status(200).send({ message: "Parking spot deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to delete parking spot" });
      }
    });

    //Bookings
    const bookingsCollection = client.db("park_it").collection("bookings");
    app.get("/bookings", async (req, res) => {
      const result = await bookingsCollection.find().toArray();
      res.send(result);
    });

    app.get("/bookings/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const booking = await bookingsCollection.find(query).toArray();
      if (booking.length === 0) {
        return res.status(404).send({ error: "Booking not found" });
      }
      res.status(200).send(booking);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      res.status(201).send(result);
    });

    // Connect the client to the server (optional starting in v4.7)
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); // Listen to the port

app.get("/", (req, res) => {
  res.send("Hello World! this server is running on 9000");
});
