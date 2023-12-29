import { join } from "path";

export default (req, res) =>
  res.sendFile(join(__dirname, "../../" + "public", "client", "index.html"));

// export default (req, res) =>
//   res.send("<H1>Hello World!</H1>")