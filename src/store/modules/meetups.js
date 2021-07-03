import axios from "axios";

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
    fetchMeetups({ state, commit }) {
      return axios.get("/api/v1/meetups").then(res => {
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
    }
  },
  mutators: {}
};
