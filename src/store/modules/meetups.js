import axios from "axios";
import axiosInstance from "@/services/axios";
import Vue from "vue";
import { applyFilters } from "../../helpers";

export default {
  namespaced: true,

  state: {
    items: [],
    item: {}
  },
  getters: {
    //   state.meetups.meetups,
    //   state.meetups.meetup,
  },
  actions: {
    fetchMeetups({ state, commit }, options = {}) {
      commit("setItems", { resource: "meetups", items: [] }, { root: true });

      const url = applyFilters("/api/v1/meetups", options.filter);

      return axios.get(url).then(res => {
        const meetups = res.data;
        commit(
          "setItems",
          { resource: "meetups", items: meetups },
          { root: true }
        );
        return state.items;
      });
    },
    fetchMeetupById({ state, commit }, meetupId) {
      return axios.get(`/api/v1/meetups/${meetupId}`).then(res => {
        const meetup = res.data;
        commit(
          "setItem",
          { resource: "meetups", item: meetup },
          { root: true }
        );
        return state.item;
      });
    },

    createMeetup({ rootState }, meetupToCreate) {
      meetupToCreate.meetupCreator = rootState.auth.user;
      meetupToCreate.processedLocation = meetupToCreate.location
        .toLowerCase()
        .replace(/[\s,]+/g, "")
        .trim();

      return axiosInstance
        .post("/api/v1/meetups", meetupToCreate)
        .then(res => res.data);
    },
    updateMeetup({ state, commit }, meetupData) {
      meetupData.processedLocation = meetupData.location
        .toLowerCase()
        .replace(/[\s,]+/g, "")
        .trim();

      return axiosInstance
        .patch(`/api/v1/meetups/${meetupData._id}`, meetupData)
        .then(res => {
          const updatedMeetup = res.data;
          console.log(updatedMeetup);
          commit("mergeMeetup", updatedMeetup);
          return state.item;
        });
    },
    joinMeetup({ state, rootState, commit, dispatch }, meetupId) {
      const user = rootState.auth.user;

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/join`).then(() => {
        dispatch(`auth/addMeetupFromAuthUser`, meetupId, { root: true });

        const joinedPeople = state.item.joinedPeople;
        commit("addUsersToMeetup", [...joinedPeople, user]);
        return true;
      });
    },
    leaveMeetup({ state, rootState, commit, dispatch }, meetupId) {
      const user = rootState.auth.user;

      return axiosInstance
        .post(`/api/v1/meetups/${meetupId}/leave`)
        .then(() => {
          dispatch(`auth/removeMeetupFromAuthUser`, meetupId, { root: true });

          const joinedPeople = state.item.joinedPeople;
          const index = joinedPeople.findIndex(jUser => jUser._id === user._id);
          joinedPeople.splice(index, 1);
          commit("addUsersToMeetup", joinedPeople);
        });
    }
  },
  mutations: {
    addUsersToMeetup(state, joinedPeople) {
      Vue.set(state.item, "joinedPeople", joinedPeople);
    },
    mergeMeetup(state, updatedMeetup) {
      state.item = { ...state.item, ...updatedMeetup };
    }
  }
};
