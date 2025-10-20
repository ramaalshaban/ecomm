const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//A payment storage object to store the payment methods of the platform customers
const Sys_paymentMethod = sequelize.define(
  "sys_paymentMethod",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    paymentMethodId: {
      // A string value to represent the id of the payment method on the payment platform.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    userId: {
      //  An ID value to represent the user who owns the payment method
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    customerId: {
      // A string value to represent the customer id which is generated on the payment gateway.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    cardHolderName: {
      // A string value to represent the name of the card holder. It can be different than the registered customer.
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardHolderZip: {
      // A string value to represent the zip code of the card holder. It is used for address verification in specific countries.
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform: {
      // A String value to represent payment platform which teh paymentMethod belongs. It is stripe as default. It will be used to distinguesh the payment gateways in the future.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "stripe",
    },
    cardInfo: {
      // A Json value to store the card details of the payment method.
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
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
        fields: ["userId"],
      },
      {
        unique: false,
        fields: ["customerId"],
      },
      {
        unique: false,
        fields: ["platform"],
      },
      {
        unique: false,
        fields: ["cardInfo"],
      },

      {
        unique: true,
        fields: ["paymentMethodId"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Sys_paymentMethod;
