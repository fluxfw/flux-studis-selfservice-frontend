import { HttpClientRequest } from "../../../Libs/flux-http-api/src/Client/HttpClientRequest.mjs";
import { METHOD_POST } from "../../../Libs/flux-http-api/src/Method/METHOD.mjs";

/** @typedef {import("../../../Libs/flux-http-api/src/FluxHttpApi.mjs").FluxHttpApi} FluxHttpApi */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

export class BackCommand {
    /**
     * @type {FluxHttpApi}
     */
    #flux_http_api;

    /**
     * @param {FluxHttpApi} flux_http_api
     * @returns {BackCommand}
     */
    static new(flux_http_api) {
        return new this(
            flux_http_api
        );
    }

    /**
     * @param {FluxHttpApi} flux_http_api
     * @private
     */
    constructor(flux_http_api) {
        this.#flux_http_api = flux_http_api;
    }

    /**
     * @returns {Promise<void>}
     */
    async back() {
        await this.#flux_http_api.request(
            HttpClientRequest.new(
                new URL(`${__dirname}/../../api/back`),
                null,
                METHOD_POST,
                null,
                true,
                false
            )
        );
    }
}