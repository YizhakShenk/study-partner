// const urlServer ='http://localhost:3005'
// export{
//     urlServer
// }

const urlServer = process.env.REACT_APP_URL_SERVER || 'http://localhost:3005';

export {
    urlServer
};
