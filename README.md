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
