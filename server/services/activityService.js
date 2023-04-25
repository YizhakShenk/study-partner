const CLIENT_URL = process.env.CLIENT_URL;
const activityRepo = require("../repositories/activityRepo");
const userRepo = require("../repositories/userRepo");
const postRepo = require("../repositories/postRepo");
const { addNotification } = require("../repositories/notificationRepo");
const { transferMail } = require("../utilities/mailer/mailer");
const { testMatched } = require("../utilities/post/postFunctions");
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const reactToPost = async (req) => {
  try {
    const { the_applicant_id, postId, day } = req.body;
    const post = await postRepo.getPost(postId);
    if (!post) {
      throw new Error("post not found");
    }
    const days = JSON.parse(post.days);
    if (days[day] === 0) {
      throw new Error("The day already taken or not able to study");
    }
    const user = await userRepo.getOneUser(null, post.user_id || null);
    if (!user) {
      throw new Error("user not found");
    }
    if (user.message) {
      throw new Error("user not found");
    }
    const title = "somone wants to practice with you";
    const message = `someone react to your post request to practice ${post.sub_category} on  ${week[day]}.`;
    const url = `${CLIENT_URL}/confirm-post?pid=${postId}&aid=${the_applicant_id}&day=${day}`;
    const htmlMessage = `<div style="background-color: silver; 
    margin-top: 50px;
    padding: 50px;
    text-align:center;">
        <h4 style="font-size: 21px; color: blue;">hii ${user.name}! </h4>
        <p style="font-size: 17px;" >${message}<br/>   
        please click  <a href=${url}> here </a> to confirm.<br/>
        have a nice day !!<br/>
        Study partner office</p>
        </div>`;
    const sendEmail = await transferMail(
      user.email,
      title,
      "",
      htmlMessage
    );
    if (sendEmail.message) {
      throw new Error(sendEmail.message, url);
    }
    await addNotification(user.id, title, message, url);
    return "email sent";
  } catch (err) {
    console.log(err);
    return err;
  }
};

const confirmPost = async (req) => {
  try {
    const { applicantId, postId, day } = req.body;
    if (
      applicantId === undefined ||
      postId === undefined ||
      day === undefined
    ) {
      throw new Error("error with request details.");
    }
    if (!day) {
      throw new Error("day not valid.");
    }
    const post = await postRepo.getPost(postId);
    if (!post) {
      throw new Error("post not found.");
    }
    const days = JSON.parse(post.days);
    if (days[day] === 0) {
      throw new Error("day already taken");
    }
    const autherPost = await userRepo.getOneUser(null, post.user_id);
    if (!autherPost) {
      throw new Error("auther not found.");
    }
    const applicant = await userRepo.getOneUser(null, applicantId);
    if (!applicant) {
      throw new Error("applicant not found.");
    }
    const titleMessage = `${autherPost.name}  want to study with you too`;
    const notificationMessage = `ypur partner ${autherPost.name} confirmed the meeting to study together..\n
    for more information you can rich him by his phone number or email below \n
    email address: ${autherPost.email}
    phone number: ${autherPost.phone_number}`;
    const htmlMessage = `<div style="background-color: silver; 
    margin-top: 50px;
    padding: 50px;
    text-align:center;">
    <h4 style="font-size: 21px; color: blue;" >hii ${applicant.name} </h4>
    <p style="font-size: 17px;"> ypur partner ${autherPost.name} confirmed the meeting to study together<br/>
          for more information you can rich him by his phone number or email below.<br/> have fun.<br/>
          study partner office.<br/>
          email address: ${autherPost.email} 
          phone number: ${autherPost.phone_number}</p>
          </div>`
    const transfer = await transferMail(applicant.email, titleMessage, null, htmlMessage);
    days[day] = 0;
    const matched = testMatched(days);
    await postRepo.updatePost(post.id, { days, matched: matched });
    await addNotification(applicant.id, titleMessage, notificationMessage, null);
    return "Email sent to the Partner";
  } catch (err) {
    console.log(err);
    return err;
  }
};

const denyPost = async (req) => {
  try {
    const { applicantId, postId } = req.body;
    if (applicantId === undefined || postId === undefined) {
      throw new Error("error with request details.");
    }
    const post = await postRepo.getPost(postId);
    if (!post) {
      throw new Error("post not found.");
    }
    const autherPost = await userRepo.getOneUser(null, post.user_id);
    if (!autherPost) {
      throw new Error("auther not found.");
    }
    const applicant = await userRepo.getOneUser(null, applicantId);
    if (!applicant) {
      throw new Error("applicant not found.");
    }
    const titleMessage = `${autherPost.name} cancel the meeting to study together`
    const notificationMessage = `${autherPost.name} cancel the meeting to study together.\n
    you can try find other partner posts in home page.`;
    const htmlMessage = `<div style=" 
    background-color: silver; 
    margin-top: 50px;
    padding: 50px;
    text-align:center;">
        <h4 style="font-size: 21px; color: blue;" >hii ${applicant.name} </h4>
        <p style="font-size: 17px;">ypur partner ${autherPost.name} cancel the meeting to study together<br />
            you able to click <a href=${CLIENT_URL}> here </a> to search other user's posts.<br />
            we wish you luck<br />
            study partner office</p>
    </div>`

    const transfer = await transferMail(applicant.email, titleMessage, null, htmlMessage);
    if (transfer.message) {
      throw new Error(transfer.message);
    }
    await postRepo.updatePost(postId, { mathed: 1 });
    await addNotification(applicant.id, titleMessage, notificationMessage, null);
    return "Email sent to the applicant";
  } catch (err) {
    console.log(err);
    return err;
  }
};

const rateUser = async (req) => {
  try {
    const { email, rate } = req.body;
    const user = await userRepo.getOneUser(email, null);
    if (!user) {
      throw new Error("user not found");
    }
    const newRate = (user.rate + rate) / user.num_of_rates;
    const answer = await userRepo.updateUser(email, null, {
      rate: newRate,
      num_of_rates: user.num_of_rates + 1,
    });
    if (answer.message) {
      throw new Error(answer.message);
    }
    return JSON.stringify(newRate);
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = activityService = {
  reactToPost,
  confirmPost,
  denyPost,
  rateUser,
};
