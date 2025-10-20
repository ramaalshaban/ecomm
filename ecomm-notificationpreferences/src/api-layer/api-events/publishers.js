const { ServicePublisher } = require("serviceCommon");

// UserNotificationPreferences Event Publisher Classes

// Publisher class for createUserNotificationPreferences api
const { UsernotificationpreferencesCreatedTopic } = require("./topics");
class UsernotificationpreferencesCreatedPublisher extends ServicePublisher {
  constructor(usernotificationpreferences, session, requestId) {
    super(
      UsernotificationpreferencesCreatedTopic,
      usernotificationpreferences,
      session,
      requestId,
    );
  }

  static async Publish(usernotificationpreferences, session, requestId) {
    const _publisher = new UsernotificationpreferencesCreatedPublisher(
      usernotificationpreferences,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getUserNotificationPreferences api
const { UsernotificationpreferencesRetrivedTopic } = require("./topics");
class UsernotificationpreferencesRetrivedPublisher extends ServicePublisher {
  constructor(usernotificationpreferences, session, requestId) {
    super(
      UsernotificationpreferencesRetrivedTopic,
      usernotificationpreferences,
      session,
      requestId,
    );
  }

  static async Publish(usernotificationpreferences, session, requestId) {
    const _publisher = new UsernotificationpreferencesRetrivedPublisher(
      usernotificationpreferences,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateUserNotificationPreferences api
const { UsernotificationpreferencesUpdatedTopic } = require("./topics");
class UsernotificationpreferencesUpdatedPublisher extends ServicePublisher {
  constructor(usernotificationpreferences, session, requestId) {
    super(
      UsernotificationpreferencesUpdatedTopic,
      usernotificationpreferences,
      session,
      requestId,
    );
  }

  static async Publish(usernotificationpreferences, session, requestId) {
    const _publisher = new UsernotificationpreferencesUpdatedPublisher(
      usernotificationpreferences,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteUserNotificationPreferences api
const { UsernotificationpreferencesDeletedTopic } = require("./topics");
class UsernotificationpreferencesDeletedPublisher extends ServicePublisher {
  constructor(usernotificationpreferences, session, requestId) {
    super(
      UsernotificationpreferencesDeletedTopic,
      usernotificationpreferences,
      session,
      requestId,
    );
  }

  static async Publish(usernotificationpreferences, session, requestId) {
    const _publisher = new UsernotificationpreferencesDeletedPublisher(
      usernotificationpreferences,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listUserNotificationPreferences api
const { UsernotificationpreferencesListedTopic } = require("./topics");
class UsernotificationpreferencesListedPublisher extends ServicePublisher {
  constructor(usernotificationpreferences, session, requestId) {
    super(
      UsernotificationpreferencesListedTopic,
      usernotificationpreferences,
      session,
      requestId,
    );
  }

  static async Publish(usernotificationpreferences, session, requestId) {
    const _publisher = new UsernotificationpreferencesListedPublisher(
      usernotificationpreferences,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// AdminNotificationConfig Event Publisher Classes

// Publisher class for createAdminNotificationConfig api
const { AdminnotificationconfigCreatedTopic } = require("./topics");
class AdminnotificationconfigCreatedPublisher extends ServicePublisher {
  constructor(adminnotificationconfig, session, requestId) {
    super(
      AdminnotificationconfigCreatedTopic,
      adminnotificationconfig,
      session,
      requestId,
    );
  }

  static async Publish(adminnotificationconfig, session, requestId) {
    const _publisher = new AdminnotificationconfigCreatedPublisher(
      adminnotificationconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getAdminNotificationConfig api
const { AdminnotificationconfigRetrivedTopic } = require("./topics");
class AdminnotificationconfigRetrivedPublisher extends ServicePublisher {
  constructor(adminnotificationconfig, session, requestId) {
    super(
      AdminnotificationconfigRetrivedTopic,
      adminnotificationconfig,
      session,
      requestId,
    );
  }

  static async Publish(adminnotificationconfig, session, requestId) {
    const _publisher = new AdminnotificationconfigRetrivedPublisher(
      adminnotificationconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateAdminNotificationConfig api
const { AdminnotificationconfigUpdatedTopic } = require("./topics");
class AdminnotificationconfigUpdatedPublisher extends ServicePublisher {
  constructor(adminnotificationconfig, session, requestId) {
    super(
      AdminnotificationconfigUpdatedTopic,
      adminnotificationconfig,
      session,
      requestId,
    );
  }

  static async Publish(adminnotificationconfig, session, requestId) {
    const _publisher = new AdminnotificationconfigUpdatedPublisher(
      adminnotificationconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteAdminNotificationConfig api
const { AdminnotificationconfigDeletedTopic } = require("./topics");
class AdminnotificationconfigDeletedPublisher extends ServicePublisher {
  constructor(adminnotificationconfig, session, requestId) {
    super(
      AdminnotificationconfigDeletedTopic,
      adminnotificationconfig,
      session,
      requestId,
    );
  }

  static async Publish(adminnotificationconfig, session, requestId) {
    const _publisher = new AdminnotificationconfigDeletedPublisher(
      adminnotificationconfig,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listAdminNotificationConfigs api
const { AdminnotificationconfigsListedTopic } = require("./topics");
class AdminnotificationconfigsListedPublisher extends ServicePublisher {
  constructor(adminnotificationconfigs, session, requestId) {
    super(
      AdminnotificationconfigsListedTopic,
      adminnotificationconfigs,
      session,
      requestId,
    );
  }

  static async Publish(adminnotificationconfigs, session, requestId) {
    const _publisher = new AdminnotificationconfigsListedPublisher(
      adminnotificationconfigs,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  UsernotificationpreferencesCreatedPublisher,
  UsernotificationpreferencesRetrivedPublisher,
  UsernotificationpreferencesUpdatedPublisher,
  UsernotificationpreferencesDeletedPublisher,
  UsernotificationpreferencesListedPublisher,

  AdminnotificationconfigCreatedPublisher,
  AdminnotificationconfigRetrivedPublisher,
  AdminnotificationconfigUpdatedPublisher,
  AdminnotificationconfigDeletedPublisher,
  AdminnotificationconfigsListedPublisher,
};
