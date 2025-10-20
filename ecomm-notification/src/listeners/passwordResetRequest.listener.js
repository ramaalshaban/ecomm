const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `ecomm-notification-service-passwordResetRequest-group`,
});

const passwordResetRequestListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "auth.user.passwordResetRequested",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received message on ${topic}: ${message.value.toString()}`,
        );

        const notice = JSON.parse(message.value.toString());

        const mappedData = {
          types: ["email"],
          isStored: false,
          template: "passwordResetRequestTemplate",
          metadata: {
            ...notice,
            actionDeepLink: "",
            actionText: "",
          },
        };

        mappedData.to = notice["email"];
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error("auth.user.passwordResetRequested ", error);
      }
    },
  });
};

module.exports = passwordResetRequestListener;
