const { AuthenticationError } = require("apollo-server");

const Session = require("../../models/Session");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getSessions() {
      try {
        const sessions = await Session.find();
        return sessions;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getSession(_, { sessionId }) {
      try {
        const session = await Session.findById(sessionId);
        if (session) {
          return session;
        } else {
          throw new Error("Session not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createSession(_, {}, context) {
      const user = checkAuth(context);
      console.log(user);

      try {
        if (user.role === "admin") {
          const newSession = new Session({
            date: new Date().toISOString(),
            attendees: []
          });

          const session = await newSession.save();

          return session;
        } else {
          throw new AuthenticationError(
            "You are not authorized to create a new session"
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteSession(_, { sessionId }, context) {
      const user = checkAuth(context);
      try {
        const session = await Session.findById(sessionId);
        if (user.role === "admin") {
          await session.delete();
          return "Session deleted successfully";
        } else {
          throw new AuthenticationError(
            "You are not authorized to delete a session"
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async joinSession(_, { sessionId }, context) {
      const user = checkAuth(context);
      try {
        if (user) {
          const session = await Session.findById(sessionId);
          if (session) {
            session.attendees.push(user.username);
            await session.save();
            return `You have successfully joined the session happening on ${session.date}`;
          } else {
            throw new Error("Session not found");
          }
        } else {
          throw new Error("You must be logged in to join a session");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
