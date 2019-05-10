//

'use strict';

// individual bookmark module 
// only allows access to create bookmark and validate bookmark */
const Bookmark = (function Bookmark() {

  // creates and returns a bookmark
  // VALIDATEBOOKMARKLEGALITY NEEDS TO BE CALLED FIRST
  // uncertain about field data privacy... best way for access?, they are not supposed to be updated except for isDisplayDetailed
  function createBookmark( id, title, rating, url, desc ) {
    
    // SAFETY FORMULA TO ACCESS FIELD DATA LATER FOR DISPLAY?
    
    return {
      id,
      title,
      rating,
      url,
      desc,
      isDisplayDetailed : false, // this display detailed boolean value is not actually stored in server, just a local store field for UI
    };
  }


  // MIGHT NOT NEED, MAYBE BONUS
  // returns true if input conditions are met, otherwise false
  function validateBookmarkLegality(title, rating, link, description, id) {

    // assure all inputs are not empty
    if (!rating && rating !== 0 && !link && !description) {
      return false;
    }

    // INCLUDE LINK CHECK FOR HTTP AND HTTPS

    
    // fields are valid and bookmark can be created and added
    return true;

  }


  return {
    validateBookmarkLegality,
    createBookmark,
  };


})();

