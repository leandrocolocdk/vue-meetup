module.exports = function(io) {
  io.on("connection", socket => {
    console.log("Connection has been established io");

    socket.on("meetup/subscribe", function(meetupId) {
      console.log("joining meetup", `meetup-${meetupId}`);
      socket.join(`meetup-${meetupId}`);
    });

    socket.on("meetup/unsubscribe", function(meetupId) {
      console.log("leaving meetup", `meetup-${meetupId}`);
      socket.leave(`meetup-${meetupId}`);
    });

    socket.on("meetup/postSaved", function(post) {
      console.log("emitting to meetup", `meetup-${post.meetupId}`);
      socket.to(`meetup-${post.meetup}`).emit("meetup/postPublished", post);
    });
  });
};
