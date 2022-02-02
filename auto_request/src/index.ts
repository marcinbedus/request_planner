import app from "./config/app";
import CronRunner from "./services/CronRunner";

const PORT = 3003;

app.listen(PORT, () => {
  CronRunner.startWatchingForNewRequests();
  console.log(`auto_request running on port ${PORT}`);
});
