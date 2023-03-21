import { flux_css_api } from "../Libs/flux-css-api/src/FluxCssApi.mjs";
import { FormElement } from "../Form/FormElement.mjs";
import { PAGE_COMPLETED } from "../Page/PAGE.mjs";
import { SubtitleElement } from "../Subtitle/SubtitleElement.mjs";
import { TitleElement } from "../Title/TitleElement.mjs";

/** @typedef {import("../Back/backFunction.mjs").backFunction} backFunction */
/** @typedef {import("../Libs/flux-localization-api/src/FluxLocalizationApi.mjs").FluxLocalizationApi} FluxLocalizationApi */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

const css = await flux_css_api.import(
    `${__dirname}/CompletedElement.css`
);

export class CompletedElement extends HTMLElement {
    /**
     * @type {backFunction | null}
     */
    #back_function;
    /**
     * @type {FluxLocalizationApi}
     */
    #flux_localization_api;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {backFunction | null} back_function
     * @returns {CompletedElement}
     */
    static new(flux_localization_api, back_function = null) {
        return new this(
            flux_localization_api,
            back_function
        );
    }

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {backFunction | null} back_function
     * @private
     */
    constructor(flux_localization_api, back_function) {
        super();

        this.#flux_localization_api = flux_localization_api;
        this.#back_function = back_function;

        this.#shadow = this.attachShadow({ mode: "closed" });
        flux_css_api.adopt(
            this.#shadow,
            css
        );

        this.#render();
    }

    /**
     * @returns {Promise<void>}
     */
    async #render() {
        this.#shadow.appendChild(TitleElement.new(
            await this.#flux_localization_api.translate(
                "Registration completed"
            )
        ));

        this.#shadow.appendChild(SubtitleElement.new(
            await this.#flux_localization_api.translate(
                "Thank you for your registration"
            )
        ));

        this.#shadow.appendChild(await FormElement.new(
            this.#flux_localization_api
        )
            .addButtons(
                null,
                this.#back_function
            ));
    }
}

export const COMPLETED_ELEMENT_TAG_NAME = `flux-studis-selfservice-${PAGE_COMPLETED}`;

customElements.define(COMPLETED_ELEMENT_TAG_NAME, CompletedElement);
