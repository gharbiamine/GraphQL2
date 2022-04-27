import { v4 as uuidv4 } from "uuid";

export const Mutation = {
  createToDo: (_parent, { data }, { db, pubsub }) => {
    if (!db.users.find((u) => u.id == data.user)) {
      console.log("user not found");
    }
    const newToDo = {
      id: uuidv4(),
      ...data,
      status: data.status || "WAITING",
    };
    db.toDos.push(newToDo);
    pubsub.publish("newToDo", { newToDo });
    return newToDo;
  },

  updateToDo: (_parent, { data }, { db }) => {
    const updatedToDo = updateToDoInput;
    const updatedToDos = db.toDos.map((toDo) => {
      if (toDo.id === updateToDoInput.id) {
        updatedToDo = {
          id: updateToDoInput.id,
          ...data,
        };
        return updatedToDo;
      } else return toDo;
    });
    db.toDos = updatedToDos;
    pubsub.publish("updatedToDo", { updatedToDo });
    return updatedToDo;
  },

  deleteToDo: (_parent, { toDoId }, { db }) => {
    const deletedToDo = db.toDos.find((toDo) => toDo.id === toDoId);
    db.toDos = db.toDos.filter((toDo) => toDo.id !== toDoId);
    pubsub.publish("deletedToDo", { deletedToDo });
    return deletedToDo;
  },
};
