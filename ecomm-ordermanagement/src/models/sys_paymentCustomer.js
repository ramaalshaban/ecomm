const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//A payment storage object to store the customer values of the payment platform
const Sys_paymentCustomer = sequelize.define(
  "sys_paymentCustomer",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      //  An ID value to represent the user who is created as a stripe customer
      type: DataTypes.UUID,
      allowNull: true,
    },
    customerId: {
      // A string value to represent the customer id which is generated on the Stripe gateway. This id is used to represent the customer in the Stripe gateway
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    platform: {
      // A String value to represent payment platform which is used to make the payment. It is stripe as default. It will be used to distinguesh the payment gateways in the future.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "stripe",
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
        unique: false,
        fields: ["platform"],
      },

      {
        unique: true,
        fields: ["userId"],
        where: { isActive: true },
      },
      {
        unique: true,
        fields: ["customerId"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Sys_paymentCustomer;
