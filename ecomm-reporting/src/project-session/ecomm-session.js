const { NotAuthenticatedError, ForbiddenError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const HexaAuth = require("./hexa-auth");

class EcommSession extends HexaAuth {
  constructor() {
    super();
    this.ROLES = {
      superAdmin: "superAdmin",

      admin: "admin",
      user: "user",
    };

    this.projectName = "ecomm";
    this.projectCodename = "ecomm";
    this.isJWT = true;
    this.isJWTAuthRSA = true;
    this.isRemoteAuth = false;
    this.useRemoteSession = false;
  }

  userHasRole(roleName) {
    const userRoleInSession = this.session?.roleId;
    if (!userRoleInSession) return false;
    return Array.isArray(userRoleInSession)
      ? userRoleInSession.includes(roleName)
      : userRoleInSession == roleName;
  }
}

module.exports = EcommSession;
