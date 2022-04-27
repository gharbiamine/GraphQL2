export const Subscription = {
  newTodo: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("newToDo");
    },
  },
  updatedTodo: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("updatedToDo");
    },
  },
  deletedTodo: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("deletedToDo");
    },
  },
};
