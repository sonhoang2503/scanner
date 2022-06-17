// const a1 = [
//   { userid: '100', projectid: '10', rowid: '0' },
//   { userid: '101', projectid: '11', rowid: '1' },
//   { userid: '102', projectid: '12', rowid: '2' },
//   { userid: '103', projectid: '13', rowid: '3' },
//   { userid: '101', projectid: '10', rowid: '4' },
// ];
// const a2 = [
//   { userid: '101', projectid: '11' },
//   { userid: '102', projectid: '12' },
//   { userid: '103', projectid: '11' },
// ];

// let a = a1.filter(
//   ({ userid, projectid }) => !a2.some((x) => x.userid == userid)
// );
// console.log(a);

const arr1 = [1, 2, 4];
const arr2 = [4, 6, 7];

const arr = [...arr1, ...arr2];
console.log(arr);

const arrNew = new Set(arr);
console.log([...arrNew]);

// const state = new Set([5, 10, 15, 20, 30, 45, 60]);
// console.log(Array.from(state));
// console.log([...state]);
