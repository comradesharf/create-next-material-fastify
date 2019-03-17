import * as Fastify from "fastify";
import { isProduction, serverPort } from "@lib/env";
import NextPlugin from "../server-plugins/NextPlugin";

function getServerConfig(): Fastify.ServerOptions {
    if (isProduction()) {
        return {
            logger: true,
        };
    } else {
        return {
            logger: {
                prettyPrint: {
                    colorize: true,
                },
            },
        };
    }
}

async function start() {
    try {
        const server = Fastify(await getServerConfig());
        server.register(NextPlugin);

        const port = serverPort();
        server.log.info("starting server at port", port);
        await server.listen(port, "0.0.0.0");
    } catch (err) {
        console.error("unable to start server", err);
        process.exit(2);
    }
}

start();
