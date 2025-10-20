const kafka = require("common/kafka.client.js");
const {
  exportJobReSalesReportDashboardView,
} = require("aggregates/SalesReportDashboardView.aggregate");
const { checkAndCreateTopic } = require("common/kafka.utils.js");
const consumer = kafka.consumer({
  groupId: `SalesReportDashboardView-exportJob`,
});

const TOPIC_NAME = "elastic-index-ecomm_exportjob-updated";
const runUpdateListener = async () => {
  await checkAndCreateTopic(TOPIC_NAME);
  await consumer.connect();
  await consumer.subscribe({
    topic: TOPIC_NAME,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received message on ${topic}: ${message.value.toString()}`,
        );

        const data = JSON.parse(message.value.toString());
        await exportJobReSalesReportDashboardView(data.id);
      } catch (error) {
        console.error(TOPIC_NAME, ": ", error);
        //**errorLog
      }
    },
  });
};

module.exports = runUpdateListener;
