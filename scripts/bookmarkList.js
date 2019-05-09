// global $

'use strict';

// Module to hold bookmarks
const bookmarkList = (function() {
  
  // include functions

  // $.fn.extend({
  //   serializeJson: function() {
  //     if (!this.is('input-form')) throw new TypeError('Must run serializeJson on FORM elements only');
      
  //     const formData = new FormData(this[0]);
  //     const o = {};
  //     formData.forEach((val, field) => {
  //       o[field] = val; 
  //     });
  //     console.log(formData);
    
  //     return JSON.stringify(o);
  //   }
  // });

  // function serializeJson(form) {
  //   const formData = new FormData(form);
  //   const o = {};
  //   formData.forEach((val, name) => o[name] = val);
  //   return JSON.stringify(o);
  // }

  function handleNewBookmarkSubmit() {
    $('#myForm').submit( function(e) {
      e.preventDefault();
      const title = e.target.title.value;
      const url = e.target.url.value;
      const description = e.target.description.value;
      const rating = e.target.rating.value;

      console.log(title);
      console.log(url);
      console.log(description);
      console.log(rating);

    });
    // const form = document.getElementById('myForm');
    // const stringedJson = serializeJson(form);
    // console.log(stringedJson);
  }



  // DEFINE THESE
  function handleDeleteBookmarkClicked() {}
  function handleToggleDetailedClick() {}
  function handleCloseError() {}
  function render() {}


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