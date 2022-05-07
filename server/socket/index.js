export const addNewUser = (userId, socketId, userList) => {
  !userList.some((user) => user.userId === userId) && userList.push({ userId, socketId });
};

export const removeUser = (socketId, userList) => {
  userList = userList.filter((user) => user.socketId !== socketId);
};

export const getUser = (userId, userList) => {
  return userList.find((user) => user.userId === userId);
};

export const getSocketId = (userId, userList) => {
  return userList.find((user) => user.userId === userId)?.socketId;
};
