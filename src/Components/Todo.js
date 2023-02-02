import React, { useState, useEffect } from "react";
import todo from "../images/todo.jpg";

export const Todo = () => {
  const getItemLocalstorage = () => {
    let todoList = JSON.parse(localStorage.getItem("todo-list"));
    // console.log(todoList);
    if (todoList) {
      return todoList;
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getItemLocalstorage());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEdited, setIsEdited] = useState(null);

  const addItem = () => {
    if (!inputData) {
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEdited) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData(" ");
      setIsEdited(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);

      setInputData("");
    }
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEdited(id);
  };

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(items));
  }, [items]);

  // useEffect(() => {
  //   document.addEventListener("keydown",detectKey,true)
  // }, [])

  // const detectKey = (e) => {
  //     if(e.keyCode === 13){
  //         console.log("hey you pressed enter");
  //         addItem();
  //     }

  // }

  const enterItem = (event) => {
    if (event.key === "Enter") {
      if (!inputData) {
      } else {
        setItems([...items, inputData]);
        setInputData("");
      }
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todo-img" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>
          <div className="add-item">
          <i class="fa-solid fa-pen"></i>
            <input
              type="text"
              placeholder = " Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa-solid fa-paper-plane add-btn"
                title="Add Item"
                onClick={addItem}
                onKeyDown={enterItem}
              ></i>
            ) : (
              <i
                className="fa-solid fa-pen-to-square edit-btn"
                title="update Item"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="show-items">
            {items.map((elem) => {
              return (
                <div className="each-item" key={elem.id}>
                  <h3>{elem.name}</h3>

                  <div className="buttons">
                    {" "}
                    <i
                      className="fa-solid fa-pen-to-square edit-btn"
                      title="edit Item"
                      onClick={() => editItem(elem.id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash del-btn"
                      title="delete Item"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
          <div className="remove-btn">
            <button className="btn" onClick={removeAll}>
              Remove All
            </button>
          </div>
      </div>
    </>
  );
};

export default Todo;
