/* global Bookmark */

'use strict';
// EX CODE - GO BACK AND ONLY LEAVE SKELETON FUNCTIONS AND READ FRESH


// eslint-disable-next-line no-unused-vars
const store = (function(){

  // add Bookmark to local state version of bookmarks[]
  // Bookmark.createBookmark() delegated
  const addBookmark = function(dataResponse) {
    
    try {
      // Bookmark.validateName(name);
      // taken from a call from bookmarkList to add bookmark
      // which had already called the api createBookmark
      this.bookmarks.push( {
        id : dataResponse.id,
        title : dataResponse.title,
        rating: dataResponse.rating,
        url: dataResponse.url,
        desc: dataResponse.desc,
        isDisplayDetailed: false, 
      } );

    } catch(e) {
      console.log(e.message);
    }
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndToggleDetailed = function(id) {
    const bookmark = this.findById(id);
    bookmark.isDisplayDetailed = !bookmark.isDisplayDetailed;
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const setError = function(errorMessage) {
    this.error = errorMessage.message;
  };

  // MIGHT NOT NEED
  // const findAndUpdateName = function(id, name) {
  //   try {
  //     Bookmark.validateBookmarkLegality(name);
  //     const bookmark = this.findById(id);
  //     bookmark.name = name;
  //   } catch(e) {
  //     console.log('Cannot update title: ' + e.message);
  //   }
  // };

  // const setBookmarkIsEditing = function(id, isEditing) {
  //   const bookmark = this.findById(id);
  //   bookmark.isEditing = isEditing;
  // };

  return {
    bookmarks: [],
    isDisplayDetailed: false,
    error : null,      // NEED TO DEFINE THIS
    filterValue: '0',    // NEED TO CREATE A DEFINE/TOGGLE ENTRY ON THIS

    setError,
    addBookmark,
    findById,
    findAndToggleDetailed,
    findAndDelete,
    // findAndUpdateName,
    // setBookmarkIsEditing,
  };
  
}());