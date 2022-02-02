import { Channel, ConsumeMessage } from "amqplib";
import { CronResponse } from "../typings/app";
import RequestService from "./RequestService";

class ResponseHandler {
  public onResponse = async (msg: ConsumeMessage, channel: Channel) => {
    try {
      const responses = JSON.parse(
        msg.content.toString()
      ) as unknown as PromiseSettledResult<CronResponse>[];

      await Promise.allSettled(
        responses.map(
          (response) =>
            response.status === "fulfilled" &&
            RequestService.addResponseToRequest(response.value)
        )
      );
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}

export default new ResponseHandler();
