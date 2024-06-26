import axios from "axios";
// import { getCurrentInstance } from "vue";

const options = {};
// options.baseURL = "http://localhost:3003";

//? Decide add token or not
// if (requiresAuth) {
//   options.headers.Authorization = 'JWT TOKEN'
// }
// const vueInstance = getCurrentInstance();
// const userApiService = vueInstance?.appContext.config.globalProperties;
const instance = axios.create(options);
// const todoAppBaseUrl = process.env.VUE_APP_TODO_APP_BASE_URL;

export default {
  async login(header, body) {
    try {
      const response = await instance({
        method: "POST",
        url: header.url + "/authentication/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: body.username,
          password: body.password,
        }),
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async register(header, body) {
    try {
      const response = await instance({
        method: "POST",
        url: header.url + "/authentication/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: body.username,
          password: body.password,
        }),
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async getAllProducts(header) {
    try {
      const response = await instance({
        method: "GET",
        url: header.url + "/products",
        headers: {
          authorization: header.authorization,
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async tenantProvision(header, body) {
    try {
      const response = await instance({
        method: "POST",
        url: header.url,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "token " + header.token,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        data: JSON.stringify({
          ref: "main",
          inputs: {
            "db-user": body.username,
            "db-password": body.password,
            "app-name": body.appName,
            "app-namespace": body.appNamespace,
          },
        }),
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async getTodosList(header) {
    try {
      const response = await fetch(`${header.url}/todo`, {
        method: "GET",
        headers: {
          authorization: header.authorization,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("There was an error!", error);
    }
    // try {
    //   const response = await instance({
    //     method: "GET",
    //     url: header.url + "/todo",
    //     headers: {
    //       Authorization: header.authorization,
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   return response;
    // } catch (error) {
    //   return error.response;
    // }
    // try {
    //   const response = await instance({
    //     method: "GET",
    //     url: header.url + "/todo",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   return response;
    // } catch (error) {
    //   return error.response;
    // }
  },
  async addTodo(header, body) {
    try {
      const response = await instance({
        method: "POST",
        url: header.url + "/todo",
        headers: {
          authorization: header.authorization,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: body.name,
        }),
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async removeTodo(header, params) {
    try {
      const response = await instance({
        method: "DELETE",
        url: header.url + "/todo/" + params.id,
        headers: {
          authorization: header.authorization,
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
};
