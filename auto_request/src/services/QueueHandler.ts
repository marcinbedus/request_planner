import { Channel, connect, ConsumeMessage } from "amqplib";
import * as Sentry from "@sentry/node";
import RequestHandler from "./RequestHandler";

class QueueHandler {
  constructor() {
    this.setup()
      .then((channel) => {
        channel.consume("requests", (msg) => {
          if (!msg) return;

          RequestHandler.onRequest(msg, channel).catch((e) => {
            Sentry.captureException(e);
          });
        });
      })
      .catch((e) => {
        Sentry.captureException(e);
      });
  }

  private setup = async () => {
    const connection = await connect(process.env.QUEUE_URL as string);

    const channel = await connection.createChannel();
    await channel.assertQueue("requests");
    await channel.assertQueue("responses");

    return channel;
  };
}

export default new QueueHandler();
