const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { UserNotificationPreferences } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("userNotificationPreferences");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "userId",
    "orderUpdates",
    "shippingUpdates",
    "promoOptIn",
    "paymentEvents",
  ];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createUserNotificationPreferences = async (data) => {
  try {
    validateData(data);

    const current_userNotificationPreferences = data.id
      ? await UserNotificationPreferences.findByPk(data.id)
      : null;
    let newuserNotificationPreferences = null;

    if (current_userNotificationPreferences) {
      delete data.id;
      data.isActive = true;
      await current_userNotificationPreferences.update(data);
      newuserNotificationPreferences = current_userNotificationPreferences;
    }

    if (!newuserNotificationPreferences) {
      newuserNotificationPreferences =
        await UserNotificationPreferences.create(data);
    }

    const _data = newuserNotificationPreferences.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingUserNotificationPreferences",
      err,
    );
  }
};

module.exports = createUserNotificationPreferences;
