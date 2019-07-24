/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import { validateEmail } from './helper';


export default function validateUsers(user) {
  let correct = 0;
  let incorrect = 0;
  const emailArr = [];
  const correctEmail = [];
  const incorrectEmail = [];
  user.forEach((user1) => {
    const { traineeEmail, reviewerEmail } = user1;

    emailArr.push(traineeEmail);
    emailArr.push(reviewerEmail);
    console.log(emailArr);
    for (let i = 0; i < emailArr.length; i++) {
      if (validateEmail(emailArr[i])) {
        correctEmail.push(emailArr[i]);
        correct++;
      } else {
        incorrectEmail.push(emailArr[i]);
        incorrect++;
      }
    }
  });
  console.log('no. of correct email = ', correct);
  console.log('correct email id = ', correctEmail);
  console.log('no. of incorrect email = ', incorrect);
  console.log('incorrect email id = ', incorrectEmail);
}
