// global $

'use strict';

// Module to hold bookmarks
const bookmarkList = (function() {
  
  // include functions




  // Invoke event listeners

  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleToggleDetailedClick();
    handleCloseError();

    // while not called here, will need to add renders in all of these at end
    // as well as some sort of handle error logic for invalid user input (perhaps simple alerts?)
    // and also some way to return custom errors... ensure http or https is entered...
    // all sorts of invalid user input to take care of. also consider best way to render each
    // individual bookmark, should probably do ONE <li> for ALL components of a bookmark, then another li
    // for each consecutive next bookmark

    // obviously all sorts of stuff I havent thought of
    // so wow so fun
  }



  // return only publically accessible functions
  return {
    render,
    bindEventListeners,
  };

})();


// MIGHT NOT NEED - CHECK IMPLEMENTATION
$(bindEventListeners());