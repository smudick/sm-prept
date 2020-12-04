import axios from 'axios';

const baseUrl = 'https://sm-prept.firebaseio.com/';

const getQuestions = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}.json`).then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const newQuestion = (questionObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}.json`, questionObj)
    .then((response) => {
      axios
        .patch(`${baseUrl}${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchRepsonse) => {
          resolve(patchRepsonse);
        }).catch((error) => reject(error));
    });
});

const editQuestion = (questionObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseUrl}${questionObj.firebaseKey}.json`, questionObj)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const deleteQuestion = (questionId) => axios.delete(`${baseUrl}${questionId}.json`);

export default {
  getQuestions,
  newQuestion,
  editQuestion,
  deleteQuestion,
};
