function addObjectToLocalstorageList(key, obj) {
  // Get the current list of objects
  const currentList = JSON.parse(localStorage.getItem(key)) || [];

  // Add the new object to the list
  currentList.push(obj);

  // Store the new list of objects
  localStorage.setItem(key, JSON.stringify(currentList));
  window.dispatchEvent(new Event("storage"));
}
function removeObjectFromLocalStorageList(key, lat,lng) {
  // Get the current list of objects
  const currentList = JSON.parse(localStorage.getItem(key)) || [];

  // Filter out the object with the specified id
  const newList = currentList.filter((item) => item.lat !== lat && item.lng !== lng);
  // Store the new list of objects
  localStorage.setItem(key, JSON.stringify(newList));
  window.dispatchEvent(new Event("storage"));
}

export function alreadyBookmarked(key, lat,lng) {
   const currentList = JSON.parse(localStorage.getItem(key)) || [];
   for (let index = 0; index < currentList.length; index++) {
     const element = currentList[index];
     if (element.lat === lat && element.lng === lng) {
       return true;
     }
   }
}

export function addKeyValueToObjectInLocalStorageList(storageKey, objectId, newKey, newValue) {
  // Get the current list of objects
  const currentList = JSON.parse(localStorage.getItem(storageKey)) || [];

  // Find the object in the array that you want to update
  const objectToUpdate = currentList.find((obj) => obj.id === objectId);

  // If the object is found, add the new key-value pair to it
  if (objectToUpdate) {
    objectToUpdate[newKey] = newValue;
  }

  // Store the updated list of objects back into localStorage
  localStorage.setItem(storageKey, JSON.stringify(currentList));
  window.dispatchEvent(new Event("storage"));
}
  export function handleBookmarkChange(addBookmark,key,obj){
    if(addBookmark){
      addObjectToLocalstorageList(key,obj)
    }
    else {
      removeObjectFromLocalStorageList(key,obj.lat,obj.lng)
    }
  }