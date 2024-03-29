import { flux_import_css } from "../Libs/flux-style-sheet-manager/src/FluxImportCss.mjs";

const css = await flux_import_css.import(
    `${import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))}/TitleElement.css`
);

export class TitleElement extends HTMLElement {
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
     * @returns {TitleElement}
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

        this.#shadow = this.attachShadow({
            mode: "closed"
        });

        this.#shadow.adoptedStyleSheets.push(css);

        this.#render();
    }

    /**
     * @returns {void}
     */
    #render() {
        const title_element = document.createElement("span");
        title_element.innerText = this.#title;
        this.#shadow.append(title_element);
    }
}

export const TITLE_ELEMENT_TAG_NAME = "flux-studis-selfservice-title";

customElements.define(TITLE_ELEMENT_TAG_NAME, TitleElement);
