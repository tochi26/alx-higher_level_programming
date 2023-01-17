#!/usr/bin/node
const request = require("request");

async function getMovieCharacters(movieId) {
  try {
    // Make the request to the movie API endpoint
    const movieUrl = `https://swapi.dev/api/films/${movieId}/`;
    const movieResponse = await requestPromise(movieUrl);
    const movieData = JSON.parse(movieResponse);

    // Get the character URLs from the movie data
    const characterUrls = movieData.characters;

    // Use map to make requests to each character's API endpoint and return the character name
    const characterNames = await Promise.all(
      characterUrls.map(async characterUrl => {
        const characterResponse = await requestPromise(characterUrl);
        const characterData = JSON.parse(characterResponse);
        return characterData.name;
      })
    );

    // Log each character name to the console
    characterNames.forEach(name => console.log(name));
  } catch (error) {
    console.error(error);
  }
}

// Wrapper function for request to handle errors and return a promise
function requestPromise(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        reject(`Invalid status code: ${response.statusCode}`);
      } else {
        resolve(body);
      }
    });
  });
}

// Get the movie ID from the command line argument
const movieId = process.argv[2];
getMovieCharacters(movieId);
