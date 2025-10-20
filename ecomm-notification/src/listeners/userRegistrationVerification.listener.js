const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `ecomm-notification-service-userRegistrationVerification-group`,
});

const userRegistrationVerificationListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "auth.user.registered",
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
          template: "userRegistrationVerificationTemplate",
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
        console.error("auth.user.registered ", error);
      }
    },
  });
};

module.exports = userRegistrationVerificationListener;
