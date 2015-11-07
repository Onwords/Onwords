var pg = require('pg');
var request = require('request');
var expect = require('../../node_modules/chai/chai').expect;

describe("Onwords Node Database Server", function() {
  var connectionString = 'postgres://localhost:5432/onwords_backend_test';

  beforeEach(function(done) {
    var annotations = "annotations";
    var comments = "comments";
    var followers = "followers";
    var uri = "uri";
    var uri_users = "uri_users";
    var uri_users_followers = "uri_users_followers";
    var users = "users";
    var users_followers = "users_followers";

     /* Empty the db table before each test so that multiple tests
      * (or repeated runs of the tests) won't screw each other up: */
    pg.connect(connectionString, function (err, client, close) {
      if (err) console.log('Connection error: ', err);
      client.query("TRUNCATE " + annotations
                        + ", " + comments
                        + ", " + followers
                        + ", " + uri
                        + ", " + uri_users
                        + ", " + uri_users_followers
                        + ", " + users
                        + ", " + users_followers);
      close();
    });
    done();
  });

  // afterEach(function() {
  //   // dbConnection.end();
  // });

    it("should not do anything", function() {
        expect(1).to.equal(1);
      });

  it("should create a user", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:9000/api/users",
              json: { username: "Valjean" }
    }, function () {
      // Post a message to the node chat server:
      request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                message: "In mercy's name, three days is all I need.",
                roomname: "Hello"
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = "SELECT * FROM messages";
        var queryArgs = [];

        dbConnection.query(queryString, /*queryArgs,*/ function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test (WE CHANGED IT).
          expect(results[0].message).to.equal("In mercy's name, three days is all I need.");

          done();
        });
      });
    });
  });

  // it("Should output all messages from the DB", function(done) {
  //   // Let's insert a message into the db
  //      var queryString = "INSERT INTO messages SET ?";
  //      var queryArgs = {id: 1, message: "Men like you can never change!", room: "main"};
  //   // TODO - The exact query string and query args to use
  //   // here depend on the schema you design, so I'll leave
  //   // them up to you. */

  //   dbConnection.query(queryString, queryArgs, function(err) {
  //     if (err) { throw err; }

  //     // Now query the Node chat server and see if it returns
  //     // the message we just inserted:
  //     request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
  //       var messageLog = JSON.parse(body);
  //       expect(messageLog[0].text).to.equal("Men like you can never change!");
  //       expect(messageLog[0].roomname).to.equal("main");
  //       done();
  //     });
  //   });
  // });
});
