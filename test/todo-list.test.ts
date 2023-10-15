/**
 * @jest-environment jsdom
 */

const {
  taskList,
  addInput,
  removeInput,
  markTaskCompleted,
} = require("../src/todo-list");

global.alert = jest.fn();


describe("add task to array list", () => {
  it("should alert error if input is empty", () => {
    addInput("");
    expect(global.alert).toHaveBeenCalledWith("Tarea vacía");
  });

  it("should not add task if it is already in list", () => {
    addInput("task1");
    addInput("task1");
    expect(global.alert).toHaveBeenCalledWith("La tarea ya está en la lista");
  });

  it("add new task if does not exist", () => {
    addInput("task4");
    expect(taskList.some((task: any) => task.task === "task4")).toBe(true);
  });
});

describe("Mark task as completed", () => {
  it("marks task4 as completed", () => {
    markTaskCompleted("task4");
    const task4 = taskList.find((task: any) => task.task === "task4");
    expect(task4?.isChecked).toBe(true);
  });
});

describe("remove task to list", () => {
  it("should alert error if task is not checked", () => {
    console.log(taskList);
    removeInput("task1");
    expect(global.alert).toHaveBeenCalledWith("Tarea no marcada");
  });

  it("removes task4 from taskList when checked", () => {
    //task list initial length
    const initialLength = taskList.length;

    // call task1 to delete
    const updatedList = removeInput("task4");
    console.log(updatedList);

    // we check if length is -1 as task1 was deleted
    expect(updatedList.length).toBe(initialLength - 1);

    //confirm task4 is no longer on list
    expect(updatedList.some((task: any) => task.task === "task4")).toBe(false);
  });
});
