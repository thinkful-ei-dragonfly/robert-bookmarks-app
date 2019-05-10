// eslint-disable-next-line no-unused-vars

'use strict';

const api = (function() {
  
  // base URL for bookmarks server end point
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/robertwnewtry/bookmarks';

  // returns a parsed json if fetch is valid, otherwise standardizes the handling of errors for all requests 
  function fetchHandler(...params) {
    // setup error in scope outside fetch promise chain to set up as undefined
    // if it remains undefined in the function (error object statement is never hit)
    // then the response was of a 200 level 
    let error;
    return fetch(...params)
      .then(response => {
        if (!response.ok) {
          // if response is not 2xx, start building error object
          // response.status collects the xxx error
          error = { code: response.status };

          // if response is not JSON type (does not include any json text (char response)),
          //  place Status Text in error object and immediately reject promise
          // .statusText is a read-only property of the Response interface that
          // contains the status message corresponding to the status code (i.e. OK for 200)
          if (!response.headers.get('content-type').includes('json')) {
            error.message = response.statusText;
            // error is simply an object now that contains the response code and the OK vs FAIL, etc. case
            // the promise.reject() function returns a Promise that is rejected. For debugging purposes 
            // and selective error catching, it is useful to make reason an instanceof Error.
            // we did not do that here, but included the earlier status codes collected. 
            // The argument can be thought of as the communicated reason
            return Promise.reject(error);
          }
        }

        // otherwise, return parsed JSON. json() method is a Body method which takes the Response stream
        // and reads it to completion. It returns a promise that resolves with the result of parsing the body
        // text in JSON
        return response.json();
      })
      .then(data => {
      // if error has been defined i.e. if an error exists, place the JSON message into the error object and 
      // reject the Promise with your error object so it lands in the next 
      // catch. We should note how the API sends errors -- not all APIs
      // will respond with a JSON object containing the message key
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }

        // otherwise, return the json as normal resolved Promise that now contains our data
        return data;
      });
  }



  /** 
   * Get all of the Bookmark data contained in the server, most of the logic of which is facilitated
   * through the above fetchHandler() above. getBookmarks() returns a resolved Promise containing
   * the data. Returned keys include: id, title, url, desc, rating 
   */
  function getBookmarks() {
    // The get URL just requires the base url + /bookmarks, which is already done in the constant above
    return fetchHandler(BASE_URL);
  }



  // creating a new item (POST) requires a request body
  // params: 
  // title, string, required
  // url, string, required min 5 length and include protocol (http/https)
  // desc	string, optional Min 1 length
  // rating, number, optional between 1 and 5
  function createBookmark(title, rating, desc, url) {
    
    // ^^ will probably need to take a Bookmark parameter and then extract out Id to append to url

    // JSON.stringify(body);

    // input 
    const headersObj = new Headers( {
      'content-type' : 'application/json',
    } );
     
    const postBookmarkURL = BASE_URL;

    const sendBody = {
      title,
      rating,
      desc,
      url, 
    };

    const body = JSON.stringify(sendBody);

    // THIS IS A TEST
    // eslint-disable-next-line no-undef
    return fetchHandler( postBookmarkURL, {
      method : 'POST',
      headers : headersObj,
      body,
    } );
  }



  /**
   * Delete requires a matching id parameter in the format i.e. /bookmarks/8sdfbvbs65sd
   * 
   * !!!  NEED TO RECEIVE ID FROM bookmarkList.js which it listens for when user presses delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   */
  function deleteBookmark(id) { 

    // ALL I NEED?? IS THIS GOING TO CORRECTLY DELETE FROM STORE?
    try {
      fetchHandler(BASE_URL + '/' + id, { method: 'DELETE' });
      // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-undef` 
    } catch (e) {
      console.log(e.message);
    }

  
  }
  // shouldnt need updateBookmark() due to no edit functionality
  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };


})();
