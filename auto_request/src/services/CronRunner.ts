import axios from "axios";
import { scheduleJob } from "node-schedule";
import * as Sentry from "@sentry/node";

class CronRunner {
  startWatchingForNewRequests = () => {
    const watchRequests = async () => {
      try {
        await axios.get(`${process.env.REQUESTS_URL}/request/check`);
      } catch (e: any) {
        Sentry.captureException(e);
      }
    };

    scheduleJob("* * * * *", watchRequests);
  };
}

export default new CronRunner();
