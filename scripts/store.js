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
      this.bookmarks.push( Bookmark.createBookmark(
        dataResponse.id,
        dataResponse.title,
        dataResponse.rating,
        dataResponse.url,
        dataResponse.desc
      ) );
      console.log(this.bookmarks);
    } catch(e) {
      console.log(e.message);
    }
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndToggleDetailed = function(id) {
    const bookmark = this.findById(id);
    bookmark.checked = !bookmark.checked;
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
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
    isDetailed: false,

    addBookmark,
    findById,
    findAndToggleDetailed,
    findAndDelete,
    // findAndUpdateName,
    // setBookmarkIsEditing,
  };
  
}());