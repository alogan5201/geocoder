import { useLocalStorage } from "react-use";

const LocalStorage = () => {
  const [value, setValue, remove] = useLocalStorage("my-key", "foo");
function addObjectToLocalstorageList(key, obj) {
  // Get the current list of objects
  const currentList = JSON.parse(localStorage.getItem(key)) || [];
const newObj = { name: "John", age: 30, city: "New York" };
const newObj2 = { name: "Andrew", age: 30, city: "New York" };

  // Add the new object to the list
  currentList.push(obj);

  // Store the new list of objects
  localStorage.setItem(key, JSON.stringify(currentList));
}
function removeObjectFromLocalStorageList(key, objId) {
  // Get the current list of objects
  const currentList = JSON.parse(localStorage.getItem(key)) || [];

  // Filter out the object with the specified id
  const newList = currentList.filter((item) => item.id !== objId);

  // Store the new list of objects
  localStorage.setItem(key, JSON.stringify(newList));
}
  return (
    <div>
      <div>Value: {value}</div>
      <button
        onClick={() =>
          addObjectToLocalstorageList("bookmarks", {id:1, name: "John", age: 30, city: "New York" })
        }
      >
        new Object
      </button>
      <button
        onClick={() =>
          addObjectToLocalstorageList("bookmarks", { id:2, name: "Andrew", age: 30, city: "New York" })
        }
      >
        new Object 2
      </button>
      <button onClick={() => setValue("bar")}>bar</button>
      <button onClick={() => setValue("baz")}>baz</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};

export default LocalStorage;