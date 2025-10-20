const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

describe("CreateUserNotificationPreferencesRestController", () => {
  let createUserNotificationPreferences;
  let processRequestStub;
  let req, res, next;

  beforeEach(() => {
    req = { requestId: "req-456" };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    next = sinon.stub();

    processRequestStub = sinon.stub();

    createUserNotificationPreferences = proxyquire(
      "../../../src/controllers-layer/rest-layer/main/userNotificationPreferences/create-usernotificationpreferences-api.js",
      {
        serviceCommon: {
          HexaLogTypes: {},
          hexaLogger: { insertInfo: sinon.stub(), insertError: sinon.stub() },
        },
        apiLayer: {
          CreateUserNotificationPreferencesManager: sinon.stub(),
        },
        "../../NotificationPreferencesServiceRestController": class {
          constructor(name, routeName, _req, _res, _next) {
            this._req = _req;
            this._res = _res;
            this._next = _next;
            this.processRequest = processRequestStub;
          }
        },
      },
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create instance and call processRequest", async () => {
    await createUserNotificationPreferences(req, res, next);

    expect(processRequestStub.calledOnce).to.be.true;
  });
});
