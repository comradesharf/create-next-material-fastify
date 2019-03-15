import { createServer } from "http";
import { parse } from "url";
import * as next from "next";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        await handle(req, res, parse(req.url, true));
    }).listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
