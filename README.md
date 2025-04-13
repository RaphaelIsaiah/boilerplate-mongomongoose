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

Ah, you’re right, Raphael! That important piece deserves to be summarized properly for the README. Here’s how I’d frame it:

---

### Handling Database Interactions with Callbacks

In server-side applications, interactions with the database are handled in **functions** that execute when specific events occur (e.g., a user hitting an API endpoint). These functions often involve **asynchronous operations** like inserting, updating, or searching for data. To manage these tasks effectively, we use **callbacks**.

#### **Using the `done` Callback**

- The `done` callback signals that an operation has been completed.
- It follows the Node.js convention:
  - On success: `done(null, data)` (pass the result in the second argument).
  - On error: `done(err)` (pass the error as the first argument).

#### **Example**

Here’s a typical structure of a handler function:

```javascript
const someFunc = (done) => {
  // Perform an operation
  if (error) return done(error); // Handle errors
  done(null, result); // Return the result on success
};
```

#### **Important Note**

When working with remote services (like a database), **errors may occur**. Always handle errors appropriately to ensure the application remains stable and predictable.

---

### **What is the `done` Function?**

1. **Purpose**:

   - The `done` function tells the application (or test runner) that your operation has completed, allowing it to move to the next step.
   - It's essential for asynchronous operations, like saving data to a database, because such operations take time and won't finish immediately.

2. **Usage**:

   - The `done` function follows the **Node.js error-first callback convention**, which means:
     - If there's an error, you call `done(err)` where `err` is the error object.
     - If the operation is successful, you call `done(null, data)` where `data` is the result of the operation.

3. **Example Workflow**:
   Here's a simplified representation:

   ```javascript
   const someAsyncFunction = (done) => {
     performSomeAsyncOperation((err, result) => {
       if (err) return done(err); // Pass the error to done if something goes wrong
       done(null, result); // Pass the result to done on success
     });
   };
   ```

   - This ensures the test framework knows whether the task was completed successfully or if an error occurred.

---

### **Why is `done` Important?**

1. **For Tests**:

   - It ensures the testing framework knows when your function completes, especially when working with asynchronous code.
   - Without it, the test may timeout or behave incorrectly.

2. **For Async Tasks**:
   - It allows controlled execution of tasks, ensuring that you handle both success and error scenarios effectively.

---

### Create Many Records with `Model.create()`

To insert multiple documents into a MongoDB collection using Mongoose, follow these steps:

#### **1. Use `Model.create()`**

Pass an array of objects to `Model.create()`:

```javascript
Person.create(arrayOfPeople, (err, data) => {
  if (err) return done(err); // Handle error
  done(null, data); // Handle success
});
```

#### **Example Implementation for `Model.create()`**

```javascript
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
```

#### **Example Input**

Array of people:

```javascript
[
  { name: "John", age: 30, favoriteFoods: ["Pizza"] },
  { name: "Mary", age: 25, favoriteFoods: ["Pasta", "Salad"] },
  { name: "Mark", age: 35, favoriteFoods: ["Steak"] },
];
```

#### **Output**

Returns the array of saved documents.

---

#### **Understand `Model.find()`**

- `Model.find()` is a Mongoose method used to retrieve documents from the database that match a given query.
- It takes two arguments:
  1. **Query**: A JSON object specifying the search criteria.
  2. **Callback**: A function to handle the result, using the Node.js error-first convention.

#### **Example Implementation for `Model.find()`**

Function to find people by name:

```javascript
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
```

#### **Result**

Returns an array of documents with the `name` field matching `personName`.

---

### **Search Options that Model.find() supports**

---

`Model.find()` in Mongoose is incredibly versatile and supports a wide range of search options to help you query your database effectively. Here are some of the key options and features it supports:

---

#### **1. Basic Query**

You can search for documents that match specific field values:

```javascript
Person.find({ name: "John" }, callback);
```

---

#### **2. Query Operators**

Mongoose supports MongoDB query operators for more advanced searches:

- **Comparison Operators**:

  - `$gt` (greater than), `$lt` (less than), `$gte` (greater than or equal to), `$lte` (less than or equal to):

    ```javascript
    Person.find({ age: { $gt: 25 } }, callback); // Find people older than 25
    ```

  - `$ne` (not equal):

    ```javascript
    Person.find({ name: { $ne: "John" } }, callback); // Find people not named John
    ```

- **Logical Operators**:

  - `$or` (either condition is true):

    ```javascript
    Person.find({ $or: [{ name: "John" }, { age: 30 }] }, callback);
    ```

  - `$and` (both conditions are true):

    ```javascript
    Person.find({ $and: [{ name: "John" }, { age: 30 }] }, callback);
    ```

- **Existence Check**:

  - `$exists` (checks if a field exists):

    ```javascript
    Person.find({ favoriteFoods: { $exists: true } }, callback);
    ```

---

#### **3. Partial Matches**

- **Regular Expressions**:
  Search for documents where a field matches a pattern:

  ```javascript
  Person.find({ name: /john/i }, callback); // Case-insensitive match for "john"
  ```

---

#### **4. Array Queries**

- **Match Specific Elements**:

  ```javascript
  Person.find({ favoriteFoods: "Pizza" }, callback); // Find people who like Pizza
  ```

- **Match Multiple Elements**:

  ```javascript
  Person.find({ favoriteFoods: { $all: ["Pizza", "Burger"] } }, callback);
  ```

- **Array Length**:

  ```javascript
  Person.find({ favoriteFoods: { $size: 2 } }, callback); // Find people with exactly 2 favorite foods
  ```

---

#### **5. Field Selection**

You can specify which fields to include or exclude in the result:

```javascript
Person.find({ name: "John" }, "name age", callback); // Include only name and age
```

---

#### **6. Sorting and Limiting**

- **Sort Results**:

  ```javascript
  Person.find({}).sort({ age: -1 }).exec(callback); // Sort by age in descending order
  ```

- **Limit Results**:

  ```javascript
  Person.find({}).limit(5).exec(callback); // Limit to 5 results
  ```

- **Skip Results**:

  ```javascript
  Person.find({}).skip(10).limit(5).exec(callback); // Skip the first 10 results and return the next 5
  ```

---

#### **7. Chaining Queries**

Mongoose allows you to chain multiple query methods for more complex searches:

```javascript
Person.find({ age: { $gte: 20 } })
  .sort({ name: 1 })
  .limit(10)
  .exec(callback);
```

---

### **Understand Model.findOne()**

Unlike `Model.find()`, which returns an array of matches, `Model.findOne()` will return only one matching document (or `null` if no match is found). It is especially useful when searching by properties that you have declared as **unique**.

It takes the same arguments:

- **Query**: A JSON object specifying the search criteria.
- **Callback**: A function to handle the result (following the Node.js error-first convention).

---

### **Understand Model.findById()**

`Model.findById()` is a Mongoose method specifically for searching documents using their unique MongoDB `_id` field.
It works like `Model.findOne()`, but it automatically matches the `_id` field, so there’s no need to specify `{ _id: personId }` in the query.

---

### **Perform Classic Updates by Running Find, Edit, then Save - The Old Way**

---

- Before modern Mongoose methods existed, the typical way to edit a document involved:

  - **Finding** the document using a method like `Model.findById()`.
  - **Editing** the document directly by updating its fields.
  - **Saving** the document back to the database using `.save()`.

- This approach is often still used when you need the updated document (e.g., to send it back in an API response).

#### **Introduction to `Model.update()`**

- Mongoose introduced the `Model.update()` method for performing bulk updates across many documents that match certain criteria.
- **Advantages**:
  - You can update multiple documents in one call.
  - It’s faster for large-scale updates since it directly interacts with the MongoDB driver.

#### **Limitations of `Model.update()`**

- **Doesn’t return the updated document**:
  - After using `Model.update()`, you only get a "status message" indicating the success or failure of the update.
  - If you need the updated document, you’ll need to fetch it again with another query.
- **Model validations are bypassed**:
  - Mongoose validations (defined in your schema) are not applied because `Model.update()` directly calls the MongoDB driver.
  - This can lead to unintended issues if you rely on schema validations to enforce data integrity.

---

#### **Why Use "Find, Edit, then Save" Instead?**

Although `Model.update()` is faster for bulk updates, the "find, edit, then save" approach has distinct advantages:

- It lets you retrieve and work with the updated document immediately.
- It ensures that schema validations (like type checking or required fields) are applied.
- It's simpler and more intuitive for smaller-scale updates involving one document.

---

##### **Summary**

- `Model.update()` is useful for bulk updates and direct interactions with the MongoDB driver but doesn’t provide the updated document or apply schema validations.
- "Find, edit, then save" is preferred when you need the updated document and want to ensure schema validations are enforced.

---

### **Understand `findOneAndUpdate()`**

This method finds **one document** that matches the query and updates it.

By default, it returns the **original (unmodified) document**. However, you can get the updated document by adding the option `{ new: true }`.

#### **Use `Model.findOneAndUpdate()` to locate and update a document:**

```js
Person.findOneAndUpdate(
  { name: personName }, // Search query
  { age: ageToSet }, // Update object
  { new: true }, // Return the updated document
  callback // Handle result or error
);
```

---
