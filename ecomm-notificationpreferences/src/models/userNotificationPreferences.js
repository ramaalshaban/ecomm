const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Stores notification preferences for a user, indicating which event types (order, shipping, promo, payment, system) they wish to receive notifications for.
const UserNotificationPreferences = sequelize.define(
  "userNotificationPreferences",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      // User owner of these notification preferences.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    orderUpdates: {
      // Receive notifications for order status changes.
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    shippingUpdates: {
      // Receive notifications for shipping/tracking events.
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    promoOptIn: {
      // Opt-in for receiving promotional or marketing notifications/emails.
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paymentEvents: {
      // Receive notifications for payment events (e.g. payment received, failed).
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    systemEvents: {
      // (Admin Only) Receive system/platform-level notifications. Ignored for regular users.
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isActive: {
      // isActive property will be set to false when deleted
      // so that the document will be archived
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = UserNotificationPreferences;
