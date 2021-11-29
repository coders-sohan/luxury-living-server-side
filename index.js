const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zajjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((err) => {
	// const collection = client.db("test").collection("devices");
	// // perform actions on the collection object
	// const user = { name: "sohan" };
	// collection.insertOne(user).then(() => {
	// 	console.log("inserted success");
	// });
	// client.close();
});

async function run() {
	try {
		await client.connect();
		const database = client.db("LuxuryLiving");
		const projectsCollection = database.collection("projects");
		const servicesCollection = database.collection("services");

		// get projects data
		app.get("/projects", async (req, res) => {
			const projects = projectsCollection.find({});
			const projectsData = await projects.toArray();
			res.send(projectsData);
		});

		// get services data
		app.get("/services", async (req, res) => {
			const services = servicesCollection.find({});
			const servicesData = await services.toArray();
			res.send(servicesData);
		});

		console.log("Database connected");
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("running db");
});

app.listen(port, () => {
	console.log("local host running", port);
});
