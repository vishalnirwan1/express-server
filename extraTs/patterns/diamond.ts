/* eslint-disable no-console */
/* eslint-disable no-plusplus */
export default function diamondTriangle(num: number) {
  let space: number = num - 1;
  let str: string = '';
  let i: number; let j: number;
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
