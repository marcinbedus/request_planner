import { Channel, ConsumeMessage } from "amqplib";
import axios, { AxiosError } from "axios";
import { Request } from "../typings/app";

class RequestHandler {
  public onRequest = async (msg: ConsumeMessage, channel: Channel) => {
    try {
      const requests = JSON.parse(
        msg.content.toString()
      ) as unknown as Request[];

      const responses = await this.performRequests(requests);

      channel.ack(msg);

      channel.sendToQueue("responses", Buffer.from(JSON.stringify(responses)));
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  private performRequests = (requests: Request[]) =>
    Promise.allSettled(
      requests.map((request) =>
        axios({
          url: request.url,
          method: request.method,
          data: request.body.length ? JSON.parse(request.body) : null,
          headers: request.body.length ? JSON.parse(request.headers) : null,
        })
          .then((response) => ({
            data: response.data,
            status: response.status,
            id: request.id,
          }))
          .catch((error: AxiosError) => ({
            data: {
              message: error.message,
            },
            status: error.response?.status,
            id: request.id,
          }))
      )
    );
}

export default new RequestHandler();
