import { AutoRouter, cors } from "itty-router"

const { preflight, corsify } = cors()

export const router = AutoRouter({
    before: [preflight],
    finally: [corsify]
});
