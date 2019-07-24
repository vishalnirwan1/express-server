/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
const n = process.argv[2];
diamondTriangle(n);

function diamondTriangle(num) {
  let space = num - 1;
  let str = '';
  let i; let j;
  for (i = 0; i < num; i++) {
    for (j = 0; j < space; j++) {
      str += ' ';
    }
    for (j = 0; j <= i; j++) {
      str += '* ';
    }
    str += '\n';
    space--;
  }
  space = 0;

  for (i = num; i > 0; i--) {
    for (j = 0; j < space; j++) {
      str += ' ';
    }
    for (j = 0; j < i; j++) {
      str += '* ';
    }
    str += '\n';
    space++;
  }
  console.log(str);
}
