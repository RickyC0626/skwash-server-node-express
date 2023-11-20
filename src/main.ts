import server from "./server";

const port = 8000;

server.listen(port, () => {
  console.log(`Skwash server listening on port ${port}`);
});
