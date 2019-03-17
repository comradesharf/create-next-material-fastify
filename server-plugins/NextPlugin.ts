import { FastifyInstance } from "fastify";
import * as http from "http";
import * as Next from "next";
import { isProduction } from "@lib/env";

declare module "fastify" {
    interface FastifyInstance<
        HttpServer = http.Server,
        HttpRequest = http.IncomingMessage,
        HttpResponse = http.ServerResponse
    > {
        next: Next.Server;
    }
}

export default async function NextPlugin(
    fastify: FastifyInstance,
    _opts: {},
    next: (err?: Error) => void,
) {
    try {
        const dev = !isProduction();
        const app = Next({ dev });
        await app.prepare();

        fastify.decorate("next", app);

        if (dev) {
            fastify.get("/_next/*", async (req, reply) => {
                await app.handleRequest(req.req, reply.res);
                reply.sent = true;
            });
        }

        fastify.get("/*", async (req, reply) => {
            await app.handleRequest(req.req, reply.res);
            reply.sent = true;
        });

        fastify.setNotFoundHandler(async (req, rep) => {
            await app.handleRequest(req.req, rep.res);
            rep.sent = true;
        });

        fastify.log.info("next registered");

        next();
    } catch (err) {
        next(err);
    }
}
