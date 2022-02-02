import app from "./config/app";

const { PORT } = process.env;

app.listen(PORT, async () => {
  console.log(`requests running on port ${PORT}`);
});
