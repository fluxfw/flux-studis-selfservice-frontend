import { flux_css_api } from "../../../flux-css-api/src/FluxCssApi.mjs";

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

const css = await flux_css_api.import(
    `${__dirname}/FormTitleElement.css`
);

export class FormTitleElement extends HTMLElement {
    /**
     * @type {ShadowRoot}
     */
    #shadow;
    /**
     * @type {string}
     */
    #title;

    /**
     * @param {string} title
     * @returns {FormTitleElement}
     */
    static new(title) {
        return new this(
            title
        );
    }

    /**
     * @param {string} title
     * @private
     */
    constructor(title) {
        super();

        this.#title = title;

        this.#shadow = this.attachShadow({ mode: "closed" });
        flux_css_api.adopt(
            this.#shadow,
            css
        );

        this.#render();
    }

    /**
     * @param {HTMLElement} element
     * @returns {void}
     */
    addElement(element) {
        this.#shadow.appendChild(element);
    }

    /**
     * @returns {void}
     */
    #render() {
        const title_element = document.createElement("span");
        title_element.innerText = this.#title;
        this.#shadow.appendChild(title_element);
    }
}

export const FORM_TITLE_ELEMENT_TAG_NAME = "flux-studis-selfservice-form-title";

customElements.define(FORM_TITLE_ELEMENT_TAG_NAME, FormTitleElement);
