const bcrypt = require('bcrypt');
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS);
const jwt = require('jsonwebtoken');
const AuthRepo = require('../repositories/authRepo');
const UserRepo = require('../repositories/userRepo');
const { emailValid, passwordValid } = require('../utilities/validations/validations');
const { cookieParse } = require('../utilities/cookieParse/cookieParse')
const { transferMail } = require('../utilities/mailer/mailer');
const { convertToReadingPossibility } = require('../utilities/post/adjustungPostData')

const auth = async (req) => {
    try {
        const { id } = req.body
        if (!id) {
            return false;
        }
        console.log(req.headers.cookie);
        const cookie = req.headers.cookie || null
        if (!cookie || cookie === undefined) {
            return false;
        }
        const obj = cookieParse(cookie)
        if (!obj) {
            throw new Error("couldn't parse cookie");
        }
        const isVarify = jwt.verify(obj.token, process.env.SECRET_KEY);
        if (isVarify.email) {
        }
        const user = await UserRepo.getOneUser(null, id);
        if (!user) {
            return true
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            country: user.country,
            languages: user.languages,
            phone_number: user.phone_number,
            age: user.age,
            about: user.about || null,
            posts: (user.posts && user.posts.map((post) => { return convertToReadingPossibility(post) })) || null,
            subjects: user.subjects || null,
            notifications: user.notifications || null,
            rates:answer.rates || [],
        };
    }
    catch (err) {
        console.log(err);
        return err
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ((!email || !emailValid(email)) || (!password || !passwordValid(password))) { throw Error('auth faild') }

        const answer = await AuthRepo.logIn(email);

        if (answer.message) {
            throw new Error('email or password are not correct');
        }
        const isComparePassword = await bcrypt.compare(password, answer.password);
        if (!isComparePassword) {
            throw new Error('email or password are not correct');
        }
        const accessToken = jwt.sign({ email }, process.env.SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });
        res.cookie(process.env.TOKEN_NAME, accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: false
        })
        res.cookie('id', answer.id, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: false
        })
        return {
            id: answer.id,
            name: answer.name,
            email: answer.email,
            country: answer.country,
            languages: answer.languages,
            phone_number: answer.phone_number,
            age: answer.age,
            about: answer.about || null,
            posts: (answer.posts && answer.posts.map((post) => { return convertToReadingPossibility(post) })) || null,
            subjects: answer.subjects || null,
            notifications: answer.notifications || null,
            rates:answer.rates ||null,
        }
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


const forgetPassword = async (reqBody) => {
    try {
        const { email } = reqBody;
        if (!email) {
            throw Error('please send email');
        }
        else if (!emailValid(email)) {
            throw Error('email not valid');
        }
        const user = await UserRepo.getOneUser(email);
        if (!user) {
            throw Error('email not macth please try again');
        }
        const newPass = Math.random().toString(36).slice(2, 8);
        const emailDestination = user.email;
        const titleMessage = 'temporary code from study partner';
        const bodyMessage = `<div>
        <h4>hii ${user.name} </h4>
        <p>your temporary password is: ${newPass}  please do not share this password to anybody.. 
        have a nice day !!</p>
        </div>`;
        // const bodyMessage =`your temporary password is: ${newPass}  please do not share this password to anybody`
        const updatePassword = await UserRepo.updateUser(email, null, { refresh_token: newPass });
        if (updatePassword.message) {
            throw Error('Faild to Update password');
        }
        const sendMail = await transferMail(emailDestination, titleMessage, '', bodyMessage);
        return sendMail

    }
    catch (err) {
        console.log(err);
        return err
    }
}

const resetPassword = async (reqBody) => {
    try {
        const { code, password, confirmPassword } = reqBody;

        if (!code || !password || !confirmPassword) {
            throw new Error('please fill all the fields');
        }

        else if (!passwordValid(password)) {
            throw new Error('password not valid');
        }

        else if (password !== confirmPassword) {
            throw new Error('passwords not match');
        }
        const hashPssword = bcrypt.hashSync(password, BCRYPT_ROUNDS);
        const answer = await AuthRepo.resetPassword(code, hashPssword);
        if (answer.message) {
            throw new Error(answer.message);
        }
        return answer;
    }
    catch (err) {
        console.log(err);
        return err
    }
}

module.exports = {
    logIn,
    auth,
    forgetPassword,
    resetPassword
}