export const addNewUser = (newUser, socketId, userList) => {
  !userList.some((user) => user._id === newUser._id) && userList.push({ userData: newUser, socketId });
};

export const removeUser = (socketId, userList) => {
  userList = userList?.filter((user) => user.socketId !== socketId);
};

export const getUser = (userId, userList) => {
  return userList.find((user) => user.userData._id === userId);
};

export const getSocketId = (userId, userList) => {
  return userList.find((user) => user.userData._id === userId)?.socketId;
};
