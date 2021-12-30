import http from "../http-common";

class DataService {
     baseURL = "https://www.bistrainer.com/v1/index.cfm?action=testapi.users";
  getAllUsers() {
    fetch(this.baseURL)
      .then(response => response.json())
      .then(response => {
          debugger;
        this.setState({
            users: response
        })
      })
      .catch(err => { console.log(err); 
      });
  }

  //   componentDidMount() {
//     // get all entities - GET
//     fetch("https://fairestdb.p.rapidapi.com/friend/friendModel", {
//       "method": "GET",
//       "headers": {
//         "x-rapidapi-host": "fairestdb.p.rapidapi.com",
//         "x-rapidapi-key": API_KEY
//       }
//     })
//     .then(response => response.json())
//     .then(response => {
//       this.setState({
//         friends: response
//       })
//     })
//     .catch(err => { console.log(err); 
//     });
//   }

  getAllCourses() {
    fetch(this.baseURL)
    .then(response => response.json())
    .then(response => {
        debugger;
      this.setState({
        classes: response
      })
    })
    .catch(err => { console.log(err); 
    });
  }

//   get(id) {
//     return http.get(`/user/${id}`);
//   }

//   create(data) {
//     return http.post("/users", data);
//   }

//   update(id, data) {
//     return http.put(`/users/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/users/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/users`);
//   }


}

export default new DataService();