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

// Create many records using the person model
const createManyPeople = (arrayOfPeople, done) => {
  // Use Model.create() to insert multiple documents
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err); // Pass the error to the done callback
    done(null, data); // Pass the array of saved documents to the done call back
  });
};

const findPeopleByName = (personName, done) => {
  // Use Model.find() to search the database
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err); // Handle error
    done(null, data); // Handle success by passing the results
  });
};

const findOneByFood = (food, done) => {
  // Use Model.findOne() to search the database for a single matching document
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  // Use Model.findById() to search the database
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Step 1: Find the person by _id
  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    // Step 2: Add the food to favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // Mark the field as modified before saving
    person.markModified("favoriteFoods");

    // Step 3: Save the updated document
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // Find and updatate the person's age
  Person.findOneAndUpdate(
    { name: personName }, // Search query: find a person by name
    { age: ageToSet }, // Update: set the age to 20
    { new: true }, // Options: return the updated document
    (err, updatedPerson) => {
      // Callback to handle the result
      if (err) return done(err); // Handle error
      done(null, updatedPerson); // Pass the updated document
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, removedPeople) => {
    if (err) return done(err);
    done(null, removedPeople);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }) // Step 1: Find people who like "burrito"
    .sort({ name: 1 }) // Step 2: Sort by name in ascending order
    .limit(2) // Step 3: Limit to 2 documents
    .select("-age") // Step 4: Exclude the age field
    .exec(
      // Step 5: Execute the query
      (err, data) => {
        if (err) return done(err); // Handle errors
        done(null, data); // Pass the results to done
      }
    );
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
