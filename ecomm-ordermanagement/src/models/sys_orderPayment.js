const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//A payment storage object to store the payment life cyle of orders based on order object. It is autocreated based on the source object&#39;s checkout config
const Sys_orderPayment = sequelize.define(
  "sys_orderPayment",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    ownerId: {
      //  An ID value to represent owner user who created the order
      type: DataTypes.UUID,
      allowNull: true,
    },
    orderId: {
      // an ID value to represent the orderId which is the ID parameter of the source order object
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    paymentId: {
      // A String value to represent the paymentId which is generated on the Stripe gateway. This id may represent different objects due to the payment gateway and the chosen flow type
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    paymentStatus: {
      // A string value to represent the payment status which belongs to the lifecyle of a Stripe payment.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    statusLiteral: {
      // A string value to represent the logical payment status which belongs to the application lifecycle itself.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "started",
    },
    redirectUrl: {
      // A string value to represent return page of the frontend to show the result of the payment, this is used when the callback is made to server not the client.
      type: DataTypes.STRING,
      allowNull: true,
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
        fields: ["ownerId"],
      },
      {
        unique: false,
        fields: ["paymentId"],
      },
      {
        unique: false,
        fields: ["paymentStatus"],
      },
      {
        unique: false,
        fields: ["statusLiteral"],
      },
      {
        unique: false,
        fields: ["redirectUrl"],
      },

      {
        unique: true,
        fields: ["orderId"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Sys_orderPayment;
