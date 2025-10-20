const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Stores notification configuration for administrators, specifying which system events should trigger notifications, preferred delivery channels, and enablement status.
const AdminNotificationConfig = sequelize.define(
  "adminNotificationConfig",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    adminId: {
      // Admin owner of this notification config (must be an admin role user).
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    triggerEvents: {
      // Array of event code strings (e.g. orderPlaced, paymentFailed) that trigger admin notification.
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    notifyBy: {
      // Array of preferred notification channels (e.g., email, inApp).
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    enabled: {
      // If false, no notifications will be sent; acts as a master enable/disable flag.
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
        fields: ["adminId"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = AdminNotificationConfig;
