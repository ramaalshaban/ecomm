const jwt = require("jsonwebtoken");

const PublicObjectEvents = {};

const ProtectedObjectEvents = {};

const PrivateObjectEvents = {
  user: [
    "ecomm-auth-service-user-retrived",
    "ecomm-auth-service-user-updated",
    "ecomm-auth-service-user-registered",
    "ecomm-auth-service-user-deleted",
    "ecomm-auth-service-users-listed",
    "ecomm-auth-service-userrole-updated",
    "ecomm-auth-service-userpassword-updated",
    "ecomm-auth-service-briefuser-retrived",
  ],
};

const createAdminToken = async (session) => {
  // add all topics if superAdmin,saasAdmin,admin
  // add tenantLevel topics if tenantAdmin
  // add tenantId condition tenantAdmin
  // add tenantId condition if superAdmin and saasAdmin if subscription request in tenantLevel

  const topics = [];

  for (const key of Object.keys(PublicObjectEvents)) {
    topics.push(...PublicObjectEvents[key]);
  }
  for (const key of Object.keys(ProtectedObjectEvents)) {
    topics.push(...ProtectedObjectEvents[key]);
  }
  for (const key of Object.keys(PrivateObjectEvents)) {
    topics.push(...PrivateObjectEvents[key]);
  }

  const payload = {
    rights: [
      {
        topics: topics,
      },
    ],
  };

  const jwtKey = process.env.PROJECT_TOKEN_KEY ?? "realtime.token.key";
  return jwt.sign(payload, jwtKey);
};

const createUserToken = async (session) => {
  const topics = [];

  for (const key of Object.keys(PublicObjectEvents)) {
    topics.push(...PublicObjectEvents[key]);
  }

  for (const key of Object.keys(ProtectedObjectEvents)) {
    topics.push(...ProtectedObjectEvents[key]);
  }

  const payload = {
    rights: [
      {
        topics: topics,
      },
    ],
  };

  const privateTopics = [];
  for (const key of Object.keys(PrivateObjectEvents)) {
    privateTopics.push(...PrivateObjectEvents[key]);
  }

  payload.rights.push({
    topics: privateTopics,
    logic: {
      type: "eq",
      key: "_ownerId",
      value: session.userId,
    },
  });

  const jwtKey = process.env.PROJECT_TOKEN_KEY ?? "realtime.token.key";
  return jwt.sign(payload, jwtKey);
};

const createEventToken = async (session) => {
  if (!session) return null;
  const userRole = session.roleId;
  const adminRoles = ["superAdmin", "admin"];
  if (adminRoles.includes(userRole)) {
    return await createAdminToken(session);
  }
  return await createUserToken(session);
};

module.exports = createEventToken;
