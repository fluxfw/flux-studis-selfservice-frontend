/** @typedef {import("../../../Libs/flux-hash-api/src/Adapter/Api/HashApi.mjs").HashApi} HashApi */
/** @typedef {import("../../../Adapter/Start/Start.mjs").Start} Start */

export class PasswordService {
    /**
     * @type {HashApi}
     */
    #hash_api;

    /**
     * @param {HashApi} hash_api
     * @returns {PasswordService}
     */
    static new(hash_api) {
        return new this(
            hash_api
        );
    }

    /**
     * @param {HashApi} hash_api
     * @private
     */
    constructor(hash_api) {
        this.#hash_api = hash_api;
    }

    /**
     * @param {string} password
     * @param {Start} start
     * @returns {Promise<string>}
     */
    async hashPassword(password, start) {
        return (await import("../Command/HashPasswordCommand.mjs")).HashPasswordCommand.new(
            this.#hash_api
        )
            .hashPassword(
                password,
                start
            );
    }
}
