require("dotenv").config();

const mongoose = require("mongoose"); // Require mongoose

// Connect to the MongoDB database using mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Required name field of type String
  age: Number, // Age field of type Number
  favoriteFoods: [String], // Array of Strings for favoriteFoods
});

// Create the Person model
let Person = mongoose.model("Person", personSchema);

// Create and save a record of a model
// Creates and saves a new Person document with predefined values to the database.
const createAndSavePerson = (done) => {
  // Create a new Person instance
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "burger"],
  });

  // Save the instance to the database
  person.save((err, data) => {
    if (err) return done(err); // Call done with error if something goes wrong
    done(null, data); // Call done with the saved data on success
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  // Use Model.create() to insert multiple documents
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err); // Pass the error to the done callback
    done(null, data); // Pass the array of saved documents to the done call back
  });
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
