/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import { validateEmail } from './helper';

export default function validateUsers(user) {
  let correct: number = 0;
  let incorrect: number = 0;
  const emailArr: string[] = [];
  const correctEmail: string[] = [];
  const incorrectEmail: string[] = [];
  user.forEach((user1) => {
    const { traineeEmail, reviewerEmail } = user1;

    emailArr.push(traineeEmail);
    emailArr.push(reviewerEmail);
    for (const i of emailArr) {
      if (validateEmail(i)) {
        correctEmail.push(i);
        correct++;
      } else {
        incorrectEmail.push(i);
        incorrect++;
      }
    }
  });
  console.log('no. of correct email = ', correct);
  console.log('correct email id = ', correctEmail);
  console.log('no. of incorrect email = ', incorrect);
  console.log('incorrect email id = ', incorrectEmail);
}
