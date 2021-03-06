import axios from 'axios'

// 默认接口头部公有的ip地址
// 因此使用本地回环地址127.0.0.1同时默认是80端口
// axios.defaults.baseURL = 'http://1.117.169.85:8081';
// axios.defaults.baseURL = '/apis';
// axios.defaults.baseURL = 'http://api.cheeseburgerim.space';

export const search = (teacherUsername, examState) => {
  let fd = new FormData();
  fd.append("teacherUsername", teacherUsername);
  fd.append("examState", examState);
  return axios.post('/exam/api/search', fd);

}

export const screenshot = (eid, studentUsername) => {
  let fd = new FormData();
  fd.append("eid", eid);
  fd.append("studentUsername", studentUsername);
  return axios.post('/screenshot/api/get', fd);

}
export const getAnswerPaper = (studentUsername, eid) => {

  let fd = new FormData();
  fd.append("studentUsername", studentUsername);
  fd.append("eid", eid);
  return axios.post("/exam/api/getAnswerPaper", fd);
}

export const submitCorrect = (studentUsername, eid, teacherUsername, correctList) => {
  let param = `?studentUsername=${studentUsername}&eid=${eid}&teacherUsername=${teacherUsername}`;
  return axios.post("/exam/api/correct" + param, correctList);
}

export const cheat = (eid, teacherUsername, studentUsername) => {
  let fd = new FormData();
  fd.append("eid", eid);
  fd.append("teacherUsername", teacherUsername);
  fd.append("studentUsername", studentUsername);
  return axios.post("/exam/api/cheat", fd);
}
