
let users         = [{
    traineeEmail    : 'trainee1@successive.tech',
    reviewerEmail   : 'reviewe'
}];
validateUsers(users);
function validateEmail(email)
{
    var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(email);
}

function validateUsers(user)
{
    let correct       = 0;
    let incorrect     = 0;
    let emailArr      = [];
    let correctEmail  = [];
    let incorrectEmail= [];
    user.forEach(function(user1){
       const {traineeEmail,reviewerEmail} = user1;
       
       emailArr.push(traineeEmail);
       emailArr.push(reviewerEmail);
       //console.log(emailArr)
        for(let i =0;i<emailArr.length;i++)
       if(validateEmail(emailArr[i]))
       {
        correctEmail.push(emailArr[i])
        correct++;
       }
       else{
            incorrectEmail.push(emailArr[i])
            incorrect++;
           }
    })
    console.log("no. of correct email = ", correct)
    console.log("correct email id = ",correctEmail)
    console.log("no. of incorrect email = ", incorrect)
    console.log("incorrect email id = ",incorrectEmail)
}