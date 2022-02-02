import { Request } from "@prisma/client";
import { Channel, connect } from "amqplib";
import * as Sentry from "@sentry/node";
import ResponseHandler from "./ResponseHandler";

class QueueHandler {
  private channel!: Channel;

  constructor() {
    this.setup()
      .then((channel) => {
        this.channel = channel;

        channel.consume("responses", (msg) => {
          if (!msg) return;

          ResponseHandler.onResponse(msg, channel).catch((e) =>
            Sentry.captureException(e)
          );
        });
      })
      .catch((e) => Sentry.captureException(e));
  }

  public sendRequestsToQueue = (requests: Request[]) => {
    this.channel.sendToQueue("requests", Buffer.from(JSON.stringify(requests)));
  };

  public setup = async () => {
    const connection = await connect(process.env.QUEUE_URL as string);

    const channel = await connection.createChannel();
    await channel.assertQueue("requests");
    await channel.assertQueue("responses");

    return channel;
  };
}

export default new QueueHandler();
