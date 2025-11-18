import { PORT } from "./keys/keys.js";
import app from "./app.js";

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);