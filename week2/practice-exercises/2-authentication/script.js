
/**
 * 2. Authentication
 * 
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */

import fetch from "node-fetch";

async function fetchBooks() {
  const apiUrl = 'https://restapiabasicauthe-sandbox.mxapps.io/api/books';
  const base64Credentials = 'YWRtaW46aHZnWDhLbFZFYQ==';

  const response = await fetch(apiUrl, {
    headers: { 'Authorization': `Basic ${base64Credentials}` }
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.log(`Error ${response.status}: ${response.statusText}`);
  }
}

fetchBooks();