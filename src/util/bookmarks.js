import { useLocalStorage } from 'react-use';


export function addBookmark(entryKey) {
    setTimeout(() => {
      let allEntries = "bookmarks";
        
      // Parse any JSON previously stored in allEntries
      var existingEntries = JSON.parse(localStorage.getItem(allEntries));
      if (existingEntries == null) existingEntries = [];
      const entry = JSON.parse(localStorage.getItem(entryKey));
      entry.bookmarked = true;
      // Save allEntries back to local storage
      existingEntries.push(entry);
      localStorage.setItem(allEntries, JSON.stringify(existingEntries));
    }, 2000);
   
  }