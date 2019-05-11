/* eslint-disable no-undef */
// global $

'use strict';


/* global store, api, $ */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){

  function generateError(message) {
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  

  function generateBookmarkElement(bookmark) {

    let isRatingHidden = 1.1 === bookmark.rating;
    let hideRatingOptionClass = '';
    if (isRatingHidden) {
      hideRatingOptionClass = 'hide-rating';
    }
    // let expandState = 'Expand details';
    let expandButton = '<button class="js-expand-button">Details</button>';
    let deleteButton = '<button class="js-delete-button">Delete</button>';

    const detailedBtnStatus = bookmark.isDisplayDetailed ? 'disabled' : '';

    let bookmarkString = `<div class="bookmark-container" data-bookmark-id="${bookmark.id}">`;
    if (bookmark.isDisplayDetailed) {
      bookmarkString +=
        `<li class="js-detailed-bookmark">
          <p>${bookmark.title}</p>
          <p class="${hideRatingOptionClass}">${bookmark.rating} Star</p>
          <p>${bookmark.desc}</p>
          <p><a href="${bookmark.url}">Visit Site</a></p>
        </li>`;
    } else {
      bookmarkString += 
          `<li class="js-undetailed-bookmark">
            <p>${bookmark.title}</p>
            <p class="${hideRatingOptionClass}">${bookmark.rating} Star</p>
          </li>`;
    }

    // changed bookmark-controls to form
    bookmarkString += `<div class="js-bookmark-buttons" data-bookmark-id="${bookmark.id}">`;
    bookmarkString +=  expandButton;
    bookmarkString += deleteButton;
    bookmarkString += '</div>';
    return bookmarkString += '</div>';

    //  `<form class="js-buttons" data-bookmark-id="${bookmark.id}">
        
    //       <button class="bookmark-toggle js-bookmark-toggle ${detailedBtnStatus}" data-bookmark-id="${bookmark.id}">
    //         <span class="button-label">Display detailed</span>
    //       </button>
        
        
        
    //       <button class="bookmark-delete js-bookmark-delete" data-bookmark-id="${bookmark.id}">
    //         <span class="button-label">Delete</span>
    //       </button>
        
    //   </form> 
    // </div>`;
  }
  
  
  function generateBookmarkListString(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }
  
  function renderError() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  }
  
  function render() {
    renderError();

    // 
    // Filter bookmark list if store filter > filterValue  
    let bookmarks = [ ...store.bookmarks ];
    if (store.filterValue !== '0') {
      bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filterValue);
    }
  
    // // Filter item list if store prop `searchTerm` is not empty
    // if (store.searchTerm) {
    //   items = items.filter(item => item.name.includes(store.searchTerm));
    // }
  
    // render the bookmark list in the DOM
    console.log('`render` ran');
    const bookmarkListString = generateBookmarkListString(bookmarks);
  
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListString);
  }
  
  
  function handleNewBookmarkSubmit() {
    // console.log('i made it to before handle submit');
    $('#js-myForm').submit( function(e) {
      e.preventDefault();
      const title = e.target.title.value;
      const url = e.target.url.value;
      const desc = e.target.desc.value;
      const rating = e.target.rating.value;
    
      api.createBookmark(title, rating, desc, url)
        .then((newBookmark) => {
          store.addBookmark(newBookmark);
          render();
        })
        .catch((err) => {
          store.setError(err.message);
          renderError();
        });
    });
  }
  
  //OLD TRY
  // function getBookmarkIdFromElement(bookmark) {
  //   return $(bookmark)
  //     .closest('.js-buttons')
  //     .data('data-bookmark-id');
  // }

  // NEW TRY GET BOOKMARK ID TRY DOESNT CALL INNER FIND________________________ 
  function handleToggleDetailed() {
    $('.js-bookmark-list').on('click', '.js-expand-button', event => {
      const id = $(event.currentTarget).closest('.js-bookmark-buttons').attr('data-bookmark-id');
      console.log(id);
      store.findAndToggleDetailed(id);
      render();
    });
  }
  
  // function handleToggleDetailed() {
  //   $('.js-buttons').on('submit', '.js-bookmark-toggle', event => {
  //     const id = getBookmarkIdFromElement(event.currentTarget); //NECESSARY??
  //     const bookmark = store.findById(id); // THIS GETS THE ACTUAL ITEM - NOT USED RIGHT NOW
  //     store.findAndToggleDetailed(id);
  //     render();
  //   });
  //   .catch((err) => { // THIS SHOULDNT HAPPEN BECAUSE NOT CALLING API
  //     console.log(err);
  //     store.setError(err.message);
  //     renderError();
  //   }
  //   );
  // }
    
  
  function handleDeleteBookmarkClicked() {
    $('.js-bookmark-list').on('click', '.js-delete-button', event => {
      const id = $(event.currentTarget).closest('.js-bookmark-buttons').attr('data-bookmark-id');
      console.log('delete ' + id);
      console.log('delete registered');
      api.deleteBookmark(id)
        .then(response => {       // was just () =>
          store.findAndDelete(id);
          render();
        })
        .catch((err) => {
          console.log(err);
          store.setError(err.message);
          renderError();
        }
        );
    });
  }
  
  // function handleEditShoppingItemSubmit() {
  //   $('.js-shopping-list').on('submit', '.js-edit-item', event => {
  //     event.preventDefault();
  //     const id = getItemIdFromElement(event.currentTarget);
  //     const itemName = $(event.currentTarget).find('.bookmark').val();
  //     api.updateItem(id, { name: itemName })
  //       .then(() => {
  //         store.findAndUpdate(id, { name: itemName });
  //         store.setItemIsEditing(id, false);
  //         render();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         store.setError(err.message);
  //         renderError();
  //       });
  //   });
  // }
  
  function handleToggleFilter() {
    $('#js-filter-rating').change(event => {
      store.filterValue = event.currentTarget.filterRating.value; 
      console.log('filter by ' + store.filterValue);
      // store.toggleCheckedFilter();
      render();
    });
  }
  
  // function handleShoppingListSearch() {
  //   $('.js-shopping-list-search-entry').on('keyup', event => {
  //     const val = $(event.currentTarget).val();
  //     store.setSearchTerm(val);
  //     render();
  //   });
  // }

  // function handleItemStartEditing() {
  //   $('.js-shopping-list').on('click', '.js-item-edit', event => {
  //     const id = getItemIdFromElement(event.target);
  //     store.setItemIsEditing(id, true);
  //     render();
  //   });
  // }

  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      renderError();
    });
  }
  
  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleToggleDetailed();
    handleDeleteBookmarkClicked();
    handleToggleFilter();
    handleCloseError();

    // while not called here, will need to add renders in all of these at end
    // as well as some sort of handle error logic for invalid user input (perhaps simple alerts?)
    // and also some way to return custom errors... ensure http or https is entered...
    // all sorts of invalid user input to take care of. also consider best way to render each
    // individual bookmark, should probably do ONE <li> for ALL components of a bookmark besides, then another <ul>
    // for each consecutive next bookmark

    // obviously all sorts of stuff I havent thought of 
  }

  // return only publically accessible functions
  return {
    render,
    bindEventListeners,
  };

})();









// ---------------------------------------------------------------------------------------------------




//   function bindEventListeners() {
//     handleNewItemSubmit();
//     handleItemCheckClicked();
//     handleDeleteItemClicked();
//     handleEditShoppingItemSubmit();
//     handleToggleDetailedClicked();
//     handleToggleFilterClick();
//     handleShoppingListSearch();
//     handleItemStartEditing();
//     handleCloseError();
//   }

//   // This object contains the only exposed methods from this module:
//   return {
//     render: render,
//     bindEventListeners: bindEventListeners,
//   };
// }());















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

// function handleNewBookmarkSubmit() {
//   console.log('i made it to before handle submit');
//   $('#js-myForm').submit( function(e) {
//     e.preventDefault();
//     const title = e.target.title.value;
//     const url = e.target.url.value;
//     const desc = e.target.desc.value;
//     const rating = e.target.rating.value;

//     api.createBookmark(title, rating, desc, url);

//     console.log('I almost made it to render');
//     render();

//   });
//   // const form = document.getElementById('myForm');
//   // const stringedJson = serializeJson(form);
//   // console.log(stringedJson);
// }



// // DEFINE THESE
// function handleDeleteBookmarkClicked() {

//   render();
// }


// function handleToggleDetailedClick() {

//   render();
// }


// function handleCloseError() {

//   render();
// }

// function handleFilterByRating() {
    
//   render();
// }

  
// function render() {
//   let bookmarksArr;
//   console.log('i made it to render');
//   api.getBookmarks()
//     // .then( response => {
//     //   if (!response.ok) {
//     //     console.log(response.message);
//     //     throw new Error(response.message);
//     //   } 
//     // })
//     .then( response => { 
//       response.forEach(bookmark => { 
//         store.addBookmark( bookmark ); 
//       } );
//     } )
//     .catch(error => error.message ); 

//   // clear cache if not empty
//   $('.results').empty('');

//   // print all bookmarks
//   for (let i = 0; i < store.bookmarks.length; i++) {
//     $('.results').append(
//       `<ul class="js-bookmark-results">
//       <ul><h4>${store.bookmarks[i].title}</h4>
//         <li>${store.bookmarks[i].rating}</li>
//         <li class="hidden">${store.bookmarks[i].desc}</li>
//         <li class="hidden"><a href="https://google.com" class="hidden">${store.bookmarks[i].link}</a></li>
//       </ul>
//     </ul>`
//     );
      
    
//   }
        
    
    
// }


// // Invoke event listeners

// function bindEventListeners() {

// handleNewItemSubmit();
// handleItemCheckClicked();
// handleDeleteItemClicked();
// // handleEditShoppingItemSubmit();
// handleToggleDetailedClicked();
// handleToggleFilterClick();
// handleShoppingListSearch();
// handleItemStartEditing();
// handleCloseError();
