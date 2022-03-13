import axios from 'axios'

// 默认接口头部公有的ip地址
// 因此使用本地回环地址127.0.0.1同时默认是80端口
// axios.defaults.baseURL = 'http://1.117.169.85:8081';
// axios.defaults.baseURL = 'http://172.23.210.122:8080/';
// axios.defaults.baseURL = 'http://api.cheeseburgerim.space';


export const createExam = (teacherUsername, title, tips, startTime, endTime, examClass, course, duration, totalScore, questionCnt, modules) => {
  let param = `?teacherUsername=${teacherUsername}&title=${title}&tips=${tips}&startTime=${startTime}&endTime=${endTime}&examClass=${examClass}&course=${course}&duration=${duration}&totalScore=${totalScore}&questionCnt=${questionCnt}`
  return axios.post("/exam/api/create" + param, modules)
}

export const getExamList = (teacherUsername) => {
  let fd = new FormData();
  fd.append("teacherUsername", teacherUsername);
  return axios.post("/exam/api/getExamsByTeacher", fd);
}

export const getInfo = (eid) => {
  let fd = new FormData();
  fd.append("eid", eid);
  return axios.post("/exam/api/getInfo", fd);
}

export const getQuestionList = (eid) => {
  let fd = new FormData();
  fd.append("eid", eid);
  return axios.post("/exam/api/getQuestions", fd);
}

export const editExam = (eid, teacherUsername, title, tips, startTime, endTime, examClass, course, duration, totalScore, questionCnt, modules) => {
  let param = `?eid=${eid}&teacherUsername=${teacherUsername}&title=${title}&tips=${tips}&startTime=${startTime}&endTime=${endTime}&examClass=${examClass}&course=${course}&duration=${duration}&totalScore=${totalScore}&questionCnt=${questionCnt}`
  return axios.post('/exam/api/edit' + param, modules);
}

export const getExamAnalyze = (eid,teacherUsername) => {
  let fd = new FormData();
  fd.append("eid", eid);
  fd.append("teacherUsername",teacherUsername);
  return axios.post("/exam/api/getExamAnalyze", fd);
}

