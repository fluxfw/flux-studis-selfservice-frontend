import { flux_import_css } from "../Libs/flux-style-sheet-manager/src/FluxImportCss.mjs";
import { FormButtonElement } from "../FormButton/FormButtonElement.mjs";
import { LOCALIZATION_MODULE } from "../Localization/LOCALIZATION_MODULE.mjs";
import { MENU_ID_APPLICATION_LOGIN } from "../Menu/MENU_ID.mjs";
import { LOCALIZATION_KEY_APPLICATION_LOGIN, LOCALIZATION_KEY_LOGOUT, LOCALIZATION_KEY_PRINT_PAGE, LOCALIZATION_KEY_STUDIS_SELFSERVICE } from "../Localization/LOCALIZATION_KEY.mjs";

/** @typedef {import("../Libs/flux-color-scheme/src/FluxColorScheme.mjs").FluxColorScheme} FluxColorScheme */
/** @typedef {import("../Libs/flux-localization-api/src/FluxLocalizationApi.mjs").FluxLocalizationApi} FluxLocalizationApi */
/** @typedef {import("../FluxStudisSelfserviceFrontend.mjs").FluxStudisSelfserviceFrontend} FluxStudisSelfserviceFrontend */
/** @typedef {import("../Layout/Layout.mjs").Layout} Layout */
/** @typedef {import("../Logout/logoutFunction.mjs").logoutFunction} logoutFunction */
/** @typedef {import("../Menu/Menu.mjs").Menu} Menu */
/** @typedef {import("../Menu/menuFunction.mjs").menuFunction} menuFunction */

const css = await flux_import_css.import(
    `${import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))}/MainElement.css`
);

export class MainElement extends HTMLElement {
    /**
     * @type {HTMLElement}
     */
    #content_element;
    /**
     * @type {FluxColorScheme}
     */
    #flux_color_scheme;
    /**
     * @type {FluxLocalizationApi}
     */
    #flux_localization_api;
    /**
     * @type {FluxStudisSelfserviceFrontend}
     */
    #flux_studis_selfservice_frontend;
    /**
     * @type {HTMLDivElement}
     */
    #header_element;
    /**
     * @type {Layout}
     */
    #layout;
    /**
     * @type {HTMLDivElement}
     */
    #menu_element;
    /**
     * @type {ShadowRoot}
     */
    #shadow;
    /**
     * @type {HTMLDivElement | null}
     */
    #user_element = null;

    /**
     * @param {FluxColorScheme} flux_color_scheme
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {FluxStudisSelfserviceFrontend} flux_studis_selfservice_frontend
     * @param {Layout} layout
     * @returns {MainElement}
     */
    static new(flux_color_scheme, flux_localization_api, flux_studis_selfservice_frontend, layout) {
        return new this(
            flux_color_scheme,
            flux_localization_api,
            flux_studis_selfservice_frontend,
            layout
        );
    }

    /**
     * @param {FluxColorScheme} flux_color_scheme
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {FluxStudisSelfserviceFrontend} flux_studis_selfservice_frontend
     * @param {Layout} layout
     * @private
     */
    constructor(flux_color_scheme, flux_localization_api, flux_studis_selfservice_frontend, layout) {
        super();

        this.#flux_color_scheme = flux_color_scheme;
        this.#flux_localization_api = flux_localization_api;
        this.#flux_studis_selfservice_frontend = flux_studis_selfservice_frontend;
        this.#layout = layout;

        this.#shadow = this.attachShadow({
            mode: "closed"
        });

        this.#shadow.adoptedStyleSheets.push(css);

        this.#render();
    }

    /**
     * @param {HTMLElement} content_element
     * @param {Menu | null} menu
     * @param {menuFunction | null} menu_function
     * @param {string | null} user_name
     * @param {logoutFunction | null} logout_function
     * @returns {Promise<void>}
     */
    async replaceContent(content_element, menu = null, menu_function = null, user_name = null, logout_function = null) {
        this.#content_element.innerHTML = "";
        this.#content_element.append(content_element);

        this.#menu_element.innerHTML = "";
        if (menu !== null) {
            for (const id of menu.ids) {
                let label_key;
                switch (id) {
                    case MENU_ID_APPLICATION_LOGIN:
                        label_key = LOCALIZATION_KEY_APPLICATION_LOGIN;
                        break;

                    default:
                        continue;
                }

                const menu_element = document.createElement("div");
                menu_element.classList.add("menu");

                if (id === menu.id) {
                    menu_element.dataset.active = true;
                }

                menu_element.innerText = await this.#flux_localization_api.translate(
                    LOCALIZATION_MODULE,
                    label_key
                );
                if (menu_function !== null) {
                    menu_element.addEventListener("click", () => {
                        if (menu_element.dataset.active) {
                            return;
                        }

                        for (const _menu_element of this.#shadow.querySelectorAll(".menu[data-active]")) {
                            delete _menu_element.dataset.active;
                        }

                        menu_element.dataset.active = true;

                        menu_function(
                            id
                        );
                    });
                    this.#menu_element.append(menu_element);
                }
            }
        }

        if (this.#user_element !== null) {
            this.#user_element.remove();
            this.#user_element = null;
        }

        if (user_name !== null || logout_function !== null) {
            this.#user_element = document.createElement("div");
            this.#user_element.classList.add("user");

            if (user_name !== null) {
                const user_name_element = document.createElement("div");
                user_name_element.classList.add("user_name");
                user_name_element.innerText = user_name;
                this.#user_element.append(user_name_element);
            }

            if (logout_function !== null) {
                const logout_button_element = FormButtonElement.new(
                    await this.#flux_localization_api.translate(
                        LOCALIZATION_MODULE,
                        LOCALIZATION_KEY_LOGOUT
                    )
                );
                logout_button_element.button.addEventListener("click", () => {
                    logout_function();
                });
                this.#user_element.append(logout_button_element);
            }

            this.#header_element.append(this.#user_element);
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async #render() {
        const container_element = document.createElement("div");
        container_element.classList.add("container");

        const left_element = document.createElement("div");
        left_element.classList.add("left");

        const title_element = document.createElement("div");
        title_element.classList.add("title");
        title_element.innerText = await this.#flux_localization_api.translate(
            LOCALIZATION_MODULE,
            LOCALIZATION_KEY_STUDIS_SELFSERVICE
        );
        left_element.append(title_element);

        this.#menu_element = document.createElement("div");
        left_element.append(this.#menu_element);

        const select_color_scheme_element = await this.#flux_color_scheme.getSelectColorSchemeElement();
        select_color_scheme_element.classList.add("select_color_scheme");
        left_element.append(select_color_scheme_element);

        const logo_link_element = document.createElement("a");
        logo_link_element.classList.add("logo");
        logo_link_element.href = this.#layout["logo-link"];
        logo_link_element.rel = "noopener noreferrer";
        logo_link_element.target = "__blank";
        if (this.#layout["logo-link"] !== "") {
            logo_link_element.title = this.#layout["logo-title"];
        }

        left_element.append(logo_link_element);

        container_element.append(left_element);

        const right_element = document.createElement("div");
        right_element.classList.add("right");

        this.#header_element = document.createElement("div");
        this.#header_element.classList.add("header");

        const select_language_element = await this.#flux_studis_selfservice_frontend.getSelectLanguageElement();
        select_language_element.classList.add("select_language");
        this.#header_element.append(select_language_element);

        const print_button_element = FormButtonElement.new(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_PRINT_PAGE
            )
        );
        print_button_element.button.addEventListener("click", () => {
            this.#print();
        });
        this.#header_element.append(print_button_element);

        right_element.append(this.#header_element);

        const header2_element = document.createElement("div");
        header2_element.classList.add("header2");

        const arrow_element = document.createElement("div");
        arrow_element.classList.add("arrow");
        arrow_element.innerText = await this.#flux_localization_api.translate(
            LOCALIZATION_MODULE,
            LOCALIZATION_KEY_APPLICATION_LOGIN
        );
        header2_element.append(arrow_element);

        right_element.append(header2_element);

        this.#content_element = document.createElement("div");
        this.#content_element.classList.add("content");
        right_element.append(this.#content_element);

        container_element.append(right_element);

        this.#shadow.append(container_element);
    }

    /**
     * @returns {void}
     */
    #print() {
        print();
    }
}

export const MAIN_ELEMENT_TAG_NAME = "flux-studis-selfservice-main";

customElements.define(MAIN_ELEMENT_TAG_NAME, MainElement);
