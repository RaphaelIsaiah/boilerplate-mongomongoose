# MongoDB and Mongoose Challenges

This is the boilerplate for the MongoDB and Mongoose lessons. Instructions for completing these lessons start at [FreeCodeCamp Backend Course](https://www.freecodecamp.org/learn/back-end-development-and-apis/mongodb-and-mongoose/install-and-set-up-mongoose)

## Notes

### Connect to MongoDB Database Using Mongoose

To connect the project to a MongoDB database, follow these steps:

#### **1. Install and Require Mongoose**

Ensure Mongoose is installed and required:

```javascript
const mongoose = require("mongoose");
```

#### **2. Add a `.env` File**

Create a `.env` file in the project root and define your MongoDB connection string:

```plaintext
MONGO_URI='your-mongodb-atlas-uri'
```

#### **3. Connect to the Database**

Use `mongoose.connect()` to connect to the database:

```javascript
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

---

### **Understanding Schema and Models**

1. **Schema**:

   - A schema defines the structure of documents in a MongoDB collection.
   - It specifies the fields, data types, and constraints for each document.
   - Schemas are the foundation for creating **models**.

2. **Model**:

   - A model is created from a schema and acts as a blueprint for MongoDB documents.
   - Models enable you to perform CRUD (Create, Read, Update, Delete) operations on the corresponding collection.

3. **Interaction with Databases**:
   - In server environments, database interactions (like inserting or querying) typically happen in **handler functions**.
   - These functions often use callbacks, such as `done(null, data)` for success or `done(err)` for errors, following Node.js conventions.

---

### Create a Mongoose Model

To interact with a MongoDB collection, follow these steps:

#### **1. Define a Schema**

Use Mongoose to define the structure of your collection:

```javascript
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
```

#### **2. Create a Model**

Create a model from the schema and assign it to a variable:

```javascript
const Person = mongoose.model("Person", personSchema);
```

#### **3. Example of Using the Model**

Use the model to create a new document:

```javascript
const newPerson = new Person({
  name: "Timmy",
  age: 30,
  favoriteFoods: ["Pizza", "Ice Cream"],
});

newPerson.save((err, data) => {
  if (err) console.error(err);
  console.log(data);
});
```

---
