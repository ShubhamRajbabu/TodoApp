import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BodyArea = () => {
  const [todo, setTodo] = useState("");
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    let dataString = localStorage.getItem("todosList");
    if (dataString) {
      let data = JSON.parse(localStorage.getItem("todosList"));
      setTodosList(data);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todosList", JSON.stringify(todosList));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodosList([...todosList, { id: uuidv4(), todo, isCompleted: false }]);
    localStorage.setItem(
      "todosList",
      JSON.stringify([...todosList, { id: uuidv4(), todo, isCompleted: false }])
    );
    setTodo("");
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todosList.findIndex((item) => {
      return item.id === id;
    });
    let newTodoList = [...todosList];
    newTodoList[index].isCompleted = !newTodoList[index].isCompleted;
    setTodosList(newTodoList);
  };

  const handleEdit = (e, id) => {
    let todoIndex = todosList.filter((item) => item.id === id);
    setTodo(todoIndex[0].todo);
    handleDelete(id);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodoList = todosList.filter((item) => item.id !== id);
    setTodosList(newTodoList);
    saveToLocalStorage();
  };
  return (
    <div className="bg-purple-100 mx-auto my-8 rounded-2xl p-8 min-h-[80vh] w-3/4 justify-center text-center ">
      <div className="text-xl font-semibold items-center">
        <h2>Add todos</h2>
      </div>
      <div className="gap-2 mx-auto">
        <input
          onChange={handleChange}
          value={todo}
          type="text"
          placeholder="Add todo"
          className="w-1/2 my-5"
        />
        <button
          onClick={handleAdd}
          disabled={todo.length < 3}
          className=" bg-green-500 rounded-lg px-4 py-1 m-2 hover:bg-green-600 disabled:bg-slate-400 text-white"
        >
          Add
        </button>
      </div>
      <div>
        <div>
          <h2 className="font-semibold text-xl">Your Todos</h2>
        </div>
        <div>
          {todosList.length > 0 ? (
            todosList.map((item) => (
              <div className="flex flex-col w-full justify-center items-center  ">
                <div
                  key={item.id}
                  className="flex  w-1/2 justify-between items-center my-2 "
                >
                  <div className="flex gap-8">
                    <input
                      type="checkbox"
                      name={item.id}
                      value={item.isCompleted}
                      onChange={handleCheckbox}
                    />
                    <div
                      key={item.id}
                      className={
                        item.isCompleted ? "line-through my-2" : "my-2"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="flex gap-2 my-1">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className=" bg-blue-500 rounded-lg px-4 py-1 hover:bg-blue-600 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-red-500 rounded-lg px-4 py-1  hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm font-light">No Todos to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyArea;
