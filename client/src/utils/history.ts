/* eslint-disable @typescript-eslint/no-explicit-any */

interface HistoryType {
  navigate: any;
  push: (page: any, ...rest: any) => void;
}

const History: HistoryType = {
  navigate: null,
  push: (page: any, ...rest: any) => History.navigate(page, ...rest),
};

export default History;
