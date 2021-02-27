//crud operations

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// const { MongoClient, ObjectID } = require("mongodb");
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// const connectionUrl = "mongodb://127.0.0.1:27017";
// const dataBaseName = "task-manager";

// MongoClient.connect(
//   connectionUrl,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to database");
//     }
//     const db = client.db(dataBaseName);
//     const filter = { task: "Playing" };
//     db.collection("task")
//       .deleteOne(filter)
//       .then(result => result)
//       .catch(error => error);
//   }
// );
// const filter = { completed: false };
//     const upDateDoc = {
//       $set: {
//         completed: true
//       }
//     };
//     db.collection("task")
//       .updateMany(filter, upDateDoc)
//       .then(result => console.log(result))
//       .catch(error => console.log(error));
// db.collection("users")
//   .updateOne(
//     {
//       _id: new ObjectID("602f3a34f5ccee9f18b7ad4f")
//     },
//     {
//       $inc: {
//         age: 1
//       }
//     }
//   )
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });
// db.collection("users").findOne(
//   { _id: new ObjectID("602f3a34f5ccee9f18b7ad4f") },
//   (error, user) => {
//     if (error) {
//       return console.log("Hey there is an error here");
//     }
//     console.log(user);
//   }
// );

//   db.collection("users")
//     .find({ name: "Harry" })
//     .toArray((error, users) => {
//       console.log(users);
//     });
//   db.collection("users")
//     .find({ name: "Harry" })
//     .count((error, count) => {
//       console.log(count);
//     });

//   db.collection("task").findOne(
//     { _id: new ObjectID("602f46c4d89cc0a2cbf01cb4") },
//     (error, last) => {
//       console.log(last);
//     }
//   );
//   db.collection("task")
//     .find({ completed: false })
//     .toArray((error, user) => {
//       console.log(user);
//     });
