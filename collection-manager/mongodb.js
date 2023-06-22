// //CRUD create read update delete
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "collection-manager";
const db = client.db(dbName);
const Collection = db.collection("users");
const petsCollection = db.collection("pets");

petsCollection.insertMany([
  {
    type: "dog",
    name: "Buddy",
    adoptionStatus: "Available",
    picture: "https://example.com/buddy.jpg",
    height: 50,
    weight: 22,
    color: "Brown and White",
    bio: "Buddy is a friendly dog who loves to play and go on walks.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Golden Retriever",
  },
  {
    type: "dog",
    name: "Charlie",
    adoptionStatus: "Available",
    picture: "https://example.com/charlie.jpg",
    height: 45,
    weight: 18,
    color: "White and Black",
    bio: "Charlie is an active dog who loves to play fetch and go on runs.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Border Collie",
  },
  {
    type: "cat",
    name: "Luna",
    adoptionStatus: "Adopted",
    picture: "https://example.com/luna.jpg",
    height: 28,
    weight: 7,
    color: "Black",
    bio: "Luna is a cuddly cat who loves to curl up in laps and get pets.",
    hypoallergenic: "Yes",
    dietaryRestrictions: "None",
    breed: "Bombay",
  },
  {
    type: "dog",
    name: "Cooper",
    adoptionStatus: "Available",
    picture: "https://example.com/cooper.jpg",
    height: 55,
    weight: 35,
    color: "Grey",
    bio: "Cooper is a friendly dog who loves to make new friends at the dog park.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Great Dane",
  },
  {
    type: "cat",
    name: "Simba",
    adoptionStatus: "Available",
    picture: "https://example.com/simba.jpg",
    height: 30,
    weight: 9,
    color: "Orange and White",
    bio: "Simba is a playful cat who loves to bat around toys and climb cat trees.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Maine Coon",
  },
  {
    type: "dog",
    name: "Bailey",
    adoptionStatus: "Adopted",
    picture: "https://example.com/bailey.jpg",
    height: 40,
    weight: 22,
    color: "Golden",
    bio: "Bailey is a sweet dog who loves to snuggle up with her favorite people.",
    hypoallergenic: "Yes",
    dietaryRestrictions: "None",
    breed: "Shih Tzu",
  },
  {
    type: "cat",
    name: "Whiskers",
    adoptionStatus: "Available",
    picture: "https://example.com/whiskers2.jpg",
    height: 25,
    weight: 6,
    color: "Grey and White",
    bio: "Whiskers is a shy but sweet cat who loves to nap in cozy beds.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Russian Blue",
  },
  {
    type: "dog",
    name: "Lucy",
    adoptionStatus: "Available",
    picture: "https://example.com/lucy.jpg",
    height: 50,
    weight: 30,
    color: "Black and White",
    bio: "Lucy is an energetic dog who loves to run and play with toys.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Boxer",
  },
  {
    type: "dog",
    name: "Buddy",
    adoptionStatus: "Available",
    picture: "https://example.com/buddy.jpg",
    height: 60,
    weight: 25,
    color: "Brown",
    bio: "Buddy is a friendly dog who loves to play fetch and go on long walks.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Golden Retriever",
  },
  {
    type: "cat",
    name: "Whiskers",
    adoptionStatus: "Adopted",
    picture: "https://example.com/whiskers.jpg",
    height: 30,
    weight: 10,
    color: "Grey",
    bio: "Whiskers is a shy but sweet cat who loves to cuddle up on laps.",
    hypoallergenic: "Yes",
    dietaryRestrictions: "None",
    breed: "Siamese",
  },
  {
    type: "dog",
    name: "Rocky",
    adoptionStatus: "Available",
    picture: "https://example.com/rocky.jpg",
    height: 55,
    weight: 30,
    color: "Black",
    bio: "Rocky is an energetic dog who loves to run and play.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Labrador Retriever",
  },
  {
    type: "cat",
    name: "Fluffy",
    adoptionStatus: "Available",
    picture: "https://example.com/fluffy.jpg",
    height: 25,
    weight: 8,
    color: "White",
    bio: "Fluffy is a playful cat who loves to chase toys and climb on furniture.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Persian",
  },
  {
    type: "dog",
    name: "Daisy",
    adoptionStatus: "Adopted",
    picture: "https://example.com/daisy.jpg",
    height: 40,
    weight: 20,
    color: "Golden",
    bio: "Daisy is a gentle dog who loves to snuggle up with her favorite people.",
    hypoallergenic: "Yes",
    dietaryRestrictions: "None",
    breed: "Poodle",
  },
  {
    type: "cat",
    name: "Mittens",
    adoptionStatus: "Available",
    picture: "https://example.com/mittens.jpg",
    height: 30,
    weight: 12,
    color: "Orange",
    bio: "Mittens is a curious cat who loves to explore her surroundings.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "Tabby",
  },
  {
    type: "dog",
    name: "Max",
    adoptionStatus: "Adopted",
    picture: "https://example.com/max.jpg",
    height: 50,
    weight: 28,
    color: "Brown",
    bio: "Max is a loyal dog who loves to go on long hikes with his family.",
    hypoallergenic: "No",
    dietaryRestrictions: "None",
    breed: "German Shepherd",
  },
]);

// // async function main() {
// //   // Use connect method to connect to the server
// //   await client.connect();
// //   console.log("Connected successfully to server");

// // Create collectio ----------------------------------

// //   //   const id = new ObjectId();
// //   //   console.log(id);
// //   //   console.log(id.getTimestamp());
// //   //   try {
// //   //   } catch (error) {
// //   //     if (error instanceof MongoServerError) {
// //   //       console.log(`Error worth logging: ${error}`); // special case for some reason
// //   //     }
// //   //     throw error; // still want to crash
// //   //   }
// //   // the following code examples can be pasted here...

// //   return "done.";
// // }

// // main()
// //   .then(console.log)
// //   .catch(console.error)
// //   .finally(() => client.close());
// //-------------------------------------------------------

// // Read Collection --------------------------------------

// // const collection = petsCollection;
// // petsCollection.find({ type: "Cat" }).toArray((err, doc) => {
// //   if (err) {
// //     console.log("Unable to fetch");
// //   }
// //   console.log(doc);
// // });

// // petsCollection.find({ type: "Cat" }).count((err, doc) => {
// //   if (err) {
// //     console.log("Unable to fetch");
// //   }
// //   console.log(doc);
// // });
// // const collection = Collection;
// // collection.findOne(
// //   { _id: new ObjectId("63b49682badcb6113a487569") },
// //   function (err, doc) {
// //     if (err) {
// //       console.log("Unable to fetch");
// //     }
// //     console.log(doc);
// //   }
// // );
// //-------------------------------------------------------

// // Update collection ------------------------------------

// // const updateCollection = petsCollection
// //   .updateOne(
// //     { _id: new ObjectId("63b48ced3090fc0c9eb6f619") },
// //     {
// //       $set: {
// //         name: "Shmulik",
// //       },
// //     }
// //   )
// //   .then((result) => {
// //     console.log(result);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });
// //-------------------------------------------------------

// // Delete collection ------------------------------------
// // petsCollection
// //   .deleteOne({ _id: ObjectId("63b48ced3090fc0c9eb6f619") })
// //   .then((result) => {
// //     console.log(result);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// //-------------------------------------------------------
