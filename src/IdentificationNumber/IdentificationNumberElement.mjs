import { flux_import_css } from "../Libs/flux-style-sheet-manager/src/FluxImportCss.mjs";
import { FormElement } from "../Form/FormElement.mjs";
import { LOCALIZATION_MODULE } from "../Localization/LOCALIZATION_MODULE.mjs";
import { PAGE_IDENTIFICATION_NUMBER } from "../Page/PAGE.mjs";
import { SubtitleElement } from "../Subtitle/SubtitleElement.mjs";
import { TitleElement } from "../Title/TitleElement.mjs";
import { LOCALIZATION_KEY_PLEASE_CHECK_YOUR_DATA, LOCALIZATION_KEY_PLEASE_KEEP_YOUR_IDENTIFICATION_NUMBER_SAFE_SO_THAT_YOU_CAN_ACCESS_YOUR_DATA_AT_A_LATER_STAGE, LOCALIZATION_KEY_YOUR_DATA_WILL_BE_SAVED_UNDER_THE_FOLLOWING_NUMBER, LOCALIZATION_KEY_YOUR_PERSONAL_IDENTIFICATION_NUMBER } from "../Localization/LOCALIZATION_KEY.mjs";

/** @typedef {import("../Back/backFunction.mjs").backFunction} backFunction */
/** @typedef {import("./confirmedIdentificationNumberFunction.mjs").confirmedIdentificationNumberFunction} confirmedIdentificationNumberFunction */
/** @typedef {import("../Libs/flux-localization-api/src/FluxLocalizationApi.mjs").FluxLocalizationApi} FluxLocalizationApi */
/** @typedef {import("./IdentificationNumber.mjs").IdentificationNumber} IdentificationNumber */
/** @typedef {import("../Label/LabelService.mjs").LabelService} LabelService */

const css = await flux_import_css.import(
    `${import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))}/IdentificationNumberElement.css`
);

export class IdentificationNumberElement extends HTMLElement {
    /**
     * @type {backFunction | null}
     */
    #back_function;
    /**
     * @type {confirmedIdentificationNumberFunction}
     */
    #confirmed_identification_number_function;
    /**
     * @type {FluxLocalizationApi}
     */
    #flux_localization_api;
    /**
     * @type {FormElement}
     */
    #form_element;
    /**
     * @type {IdentificationNumber}
     */
    #identification_number;
    /**
     * @type {LabelService}
     */
    #label_service;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {LabelService} label_service
     * @param {IdentificationNumber} identification_number
     * @param {confirmedIdentificationNumberFunction} confirmed_identification_number_function
     * @param {backFunction | null} back_function
     * @returns {IdentificationNumberElement}
     */
    static new(flux_localization_api, label_service, identification_number, confirmed_identification_number_function, back_function = null) {
        return new this(
            flux_localization_api,
            label_service,
            identification_number,
            confirmed_identification_number_function,
            back_function
        );
    }

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {LabelService} label_service
     * @param {IdentificationNumber} identification_number
     * @param {confirmedIdentificationNumberFunction} confirmed_identification_number_function
     * @param {backFunction | null} back_function
     * @private
     */
    constructor(flux_localization_api, label_service, identification_number, confirmed_identification_number_function, back_function) {
        super();

        this.#flux_localization_api = flux_localization_api;
        this.#label_service = label_service;
        this.#identification_number = identification_number;
        this.#confirmed_identification_number_function = confirmed_identification_number_function;
        this.#back_function = back_function;

        this.#shadow = this.attachShadow({
            mode: "closed"
        });

        this.#shadow.adoptedStyleSheets.push(css);

        this.#render();
    }

    /**
     * @returns {Promise<void>}
     */
    async #confirmedIdentificationNumber() {
        if (!await this.#form_element.validate()) {
            return;
        }

        const post_result = await this.#confirmed_identification_number_function(
            {}
        );

        if (post_result.ok) {
            return;
        }

        if (post_result["error-messages"] !== null) {
            for (const error_message of post_result["error-messages"]) {
                this.#shadow.prepend(this.#form_element.addInvalidMessage(
                    await this.#label_service.getErrorMessageLabel(
                        error_message
                    )
                ));
            }
        } else {
            this.#shadow.prepend(this.#form_element.addInvalidMessage(
                await this.#flux_localization_api.translate(
                    LOCALIZATION_MODULE,
                    LOCALIZATION_KEY_PLEASE_CHECK_YOUR_DATA
                )
            ));
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async #render() {
        this.#shadow.append(TitleElement.new(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_YOUR_PERSONAL_IDENTIFICATION_NUMBER
            )
        ));

        this.#shadow.append(SubtitleElement.new(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_YOUR_DATA_WILL_BE_SAVED_UNDER_THE_FOLLOWING_NUMBER
            )
        ));

        this.#form_element = FormElement.new(
            this.#flux_localization_api
        );

        const identification_number_element = SubtitleElement.new(
            this.#identification_number["identification-number"]
        );
        identification_number_element.classList.add("identification-number");
        this.#shadow.append(identification_number_element);

        this.#shadow.append(SubtitleElement.new(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_PLEASE_KEEP_YOUR_IDENTIFICATION_NUMBER_SAFE_SO_THAT_YOU_CAN_ACCESS_YOUR_DATA_AT_A_LATER_STAGE
            )
        ));

        this.#shadow.append(await this.#form_element.addButtons(
            () => {
                this.#confirmedIdentificationNumber();
            },
            this.#back_function
        ));
    }
}

export const IDENTIFICATION_NUMBER_ELEMENT_TAG_NAME = `flux-studis-selfservice-${PAGE_IDENTIFICATION_NUMBER}`;

customElements.define(IDENTIFICATION_NUMBER_ELEMENT_TAG_NAME, IdentificationNumberElement);
