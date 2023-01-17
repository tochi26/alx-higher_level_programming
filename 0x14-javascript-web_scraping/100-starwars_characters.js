#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2]; // get the movie ID from the command line argument
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    const data = JSON.parse(body);
    const characters = data.characters;
    characters.forEach(function(character) {
      request(character, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const characterData = JSON.parse(body);
          console.log(characterData.name);
        }
      });
    });
  }
});
