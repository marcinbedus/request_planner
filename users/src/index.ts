import "reflect-metadata";

import app from "./config/app";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`users running on port ${PORT}`);
});
