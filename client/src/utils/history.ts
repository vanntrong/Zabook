/* eslint-disable @typescript-eslint/no-explicit-any */

interface History {
  navigate: any;
  push: (page: any, ...rest: any) => void;
}

const History: History = {
  navigate: null,
  push: (page: any, ...rest: any) => History.navigate(page, ...rest),
};

export default History;
