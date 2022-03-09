import axios from 'axios'

// 默认接口头部公有的ip地址
// 因此使用本地回环地址127.0.0.1同时默认是80端口
// axios.defaults.baseURL = 'http://1.117.169.85:8081';
axios.defaults.baseURL = '/apis';
// axios.defaults.baseURL = 'http://api.cheeseburgerim.space';


export const submitQuestion = (teacherUsername, teacherName, title, answer, analysis, items, score, difficulty, qtype) => {
  let fd = new FormData();

  fd.append("teacherUsername", teacherUsername);
  fd.append("teacherName", teacherName);
  fd.append("title", title);
  fd.append("answer", answer);
  fd.append("analysis", analysis);
  fd.append("items", items);
  fd.append("score", score);
  fd.append("difficulty", difficulty);
  fd.append("qtype", qtype);

  return axios.post('/question/api/upload', fd);
}

export const getList = () => {
    return axios.post('/question/api/search');
}
