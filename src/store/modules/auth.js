import axios from "axios";
import jwt from "jsonwebtoken";
import axiosInstance from "../../services/axios";
import { rejectError } from "@/helpers";
import Vue from "vue";

function checkTokenValidity(token) {
  if (token) {
    const decodedToken = jwt.decode(token);
    return decodedToken && decodedToken.exp * 1000 > new Date().getTime();
  }
  return false;
}

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthResolved: false
  },
  getters: {
    authUser(state) {
      return state.user || null;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    isMeetupOwner: state => meetupCreatorId => {
      if (!state.user) return false;

      return state.user._id === meetupCreatorId;
    },
    isMember: state => meetupId => {
      return (
        state.user &&
        state.user["joinedMeetups"] &&
        state.user["joinedMeetups"].includes(meetupId)
      );
    }
  },
  actions: {
    loginWithEmailAndPassword({ commit }, userData) {
      return axios
        .post("/api/v1/users/login", userData)
        .then(res => {
          // debugger;
          const user = res.data;
          localStorage.setItem("meetup-jwt", user.token);
          commit("setAuthUser", user);
        })
        .catch(err => {
          rejectError(err);
        });
    },
    registerUser(context, userData) {
      return axios
        .post("/api/v1/users/register", userData)
        .catch(err => rejectError(err));
    },
    logout({ commit }) {
      // For session Authentication passport
      // return axios
      //   .post("/api/v1/users/logout")
      //   .then(() => {
      //     commit("setAuthUser", null);
      //     return true;
      //   })
      //   .catch(err => {
      //     return err;
      //   });
      return new Promise(resolve => {
        localStorage.removeItem("meetup-jwt");
        commit("setAuthUser", null);
        resolve(true);
      });
    },
    getAuthUser({ commit, getters }) {
      const authUser = getters["authUser"];
      const token = localStorage.getItem("meetup-jwt");
      const isTokenValid = checkTokenValidity(token);
      // debugger;
      if (authUser && isTokenValid) {
        return Promise.resolve(authUser);
      }

      const config = {
        headers: {
          "Cache-Control": "no-cache"
        }
      };

      return axiosInstance
        .get("/api/v1/users/me", config)
        .then(res => {
          const user = res.data;
          localStorage.setItem("meetup-jwt", user.token);
          commit("setAuthUser", user);
          commit("setAuthState", true);
          return user;
        })
        .catch(err => {
          commit("setAuthUser", null);
          commit("setAuthState", true);
          return err;
        });
    },
    addMeetupFromAuthUser({ commit, state }, meetupId) {
      const userMeetups = [...state.user["joinedMeetups"], meetupId]; // [ '1', '2',      '6']
      commit("setMeetupsToAuthUser", userMeetups);
    },
    removeMeetupFromAuthUser({ commit, state }, meetupId) {
      const userMeetupsIds = [...state.user["joinedMeetups"]];
      const index = userMeetupsIds.findIndex(
        userMeetupId => userMeetupId === meetupId
      );

      userMeetupsIds.splice(index, 1);
      commit("setMeetupsToAuthUser", userMeetupsIds);
    }
  },
  mutations: {
    setAuthUser(state, user) {
      return (state.user = user);
    },
    setAuthState(state, authState) {
      return (state.isAuthResolved = authState);
    },
    setMeetupsToAuthUser(state, meetups) {
      return Vue.set(state.user, "joinedMeetups", meetups);
    }
  }
};
