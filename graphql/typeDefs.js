const { gql } = require("apollo-server");

module.exports = gql`
  type Session {
    id: ID!
    date: String!
    attendees: [String]!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    role: String!
    blockers: [Blocker]!
  }
  type Blocker {
    id: ID!
    body: String!
    forSession: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getSessions: [Session]
    getSession(sessionId: ID!): Session
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createSession(sessionDate: String!): Session!
    deleteSession(sessionId: ID!): String!
    joinSession(sessionId: ID!): Session!
    leaveSession(sessionId: ID!): Session!
    createBlocker(sessionId: ID!, body: String): User!
  }
`;
