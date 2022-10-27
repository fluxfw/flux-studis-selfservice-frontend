import { ELEMENT_TAG_NAME_PREFIX } from "../Element/ELEMENT_TAG_NAME_PREFIX.mjs";
import { FormElement } from "../Form/FormElement.mjs";
import { MandatoryElement } from "../Mandatory/MandatoryElement.mjs";
import { PAGE_PORTRAIT } from "../Page/PAGE.mjs";
import { TitleElement } from "../Title/TitleElement.mjs";

/** @typedef {import("../Post/backFunction.mjs").backFunction} backFunction */
/** @typedef {import("./chosenPortraitFunction.mjs").chosenPortraitFunction} chosenPortraitFunction */
/** @typedef {import("../../Libs/flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */
/** @typedef {import("./getLoadingElement.mjs").getLoadingElement} getLoadingElement */
/** @typedef {import("../../Libs/flux-localization-api/src/Adapter/Api/LocalizationApi.mjs").LocalizationApi} LocalizationApi */
/** @typedef {import("../Photo/Photo.mjs").Photo} Photo */
/** @typedef {import("../Photo/PhotoCrop.mjs").PhotoCrop} PhotoCrop */
/** @typedef {import("../../Service/Photo/Port/PhotoService.mjs").PhotoService} PhotoService */
/** @typedef {import("./Portrait.mjs").Portrait} Portrait */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

export class PortraitElement extends HTMLElement {
    /**
     * @type {backFunction | null}
     */
    #back_function;
    /**
     * @type {chosenPortraitFunction}
     */
    #chosen_portrait_function;
    /**
     * @type {PhotoCrop | null}
     */
    #crop = null;
    /**
     * @type {CssApi}
     */
    #css_api;
    /**
     * @type {FormElement}
     */
    #form_element;
    /**
     * @type {getLoadingElement}
     */
    #get_loading_element;
    /**
     * @type {HTMLImageElement}
     */
    #image_element;
    /**
     * @type {LocalizationApi}
     */
    #localization_api;
    /**
     * @type {Photo | null}
     */
    #photo = null;
    /**
     * @type {PhotoService}
     */
    #photo_service;
    /**
     * @type {Portrait}
     */
    #portrait;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @param {CssApi} css_api
     * @param {getLoadingElement} get_loading_element
     * @param {LocalizationApi} localization_api
     * @param {PhotoService} photo_service
     * @param {Portrait} portrait
     * @param {chosenPortraitFunction} chosen_portrait
     * @param {backFunction | null} back_function
     * @returns {PortraitElement}
     */
    static new(css_api, get_loading_element, localization_api, photo_service, portrait, chosen_portrait, back_function = null) {
        return new this(
            css_api,
            get_loading_element,
            localization_api,
            photo_service,
            portrait,
            chosen_portrait,
            back_function
        );
    }

    /**
     * @param {CssApi} css_api
     * @param {getLoadingElement} get_loading_element
     * @param {LocalizationApi} localization_api
     * @param {PhotoService} photo_service
     * @param {Portrait} portrait
     * @param {chosenPortraitFunction} chosen_portrait
     * @param {backFunction | null} back_function
     * @private
     */
    constructor(css_api, get_loading_element, localization_api, photo_service, portrait, chosen_portrait, back_function) {
        super();

        this.#css_api = css_api;
        this.#get_loading_element = get_loading_element;
        this.#localization_api = localization_api;
        this.#photo_service = photo_service;
        this.#portrait = portrait;
        this.#chosen_portrait_function = chosen_portrait;
        this.#back_function = back_function;

        this.#shadow = this.attachShadow({ mode: "closed" });
        this.#css_api.importCssToRoot(
            this.#shadow,
            `${__dirname}/${this.constructor.name}.css`
        );

        this.#render();
    }

    /**
     * @returns {Promise<void>}
     */
    async #chosenPortrait() {
        if (!this.#form_element.validate()) {
            return;
        }

        await this.#setPhoto(
            true
        );

        const post_result = await this.#chosen_portrait_function(
            {
                photo: this.#photo
            }
        );

        if (post_result.ok) {
            return;
        }

        if (post_result["network-error"]) {
            this.#form_element.addInvalidMessage(
                this.#localization_api.translate(
                    "Network error!"
                )
            );
            return;
        }

        if (post_result["server-error"]) {
            this.#form_element.addInvalidMessage(
                this.#localization_api.translate(
                    "Server error!"
                )
            );
            return;
        }

        this.#form_element.addInvalidMessage(
            this.#localization_api.translate(
                "Please check your data!"
            )
        );
    }

    /**
     * @returns {void}
     */
    #removePhoto() {
        this.#photo = null;
        this.#form_element.inputs.photo.value = "";
        this.#image_element.src = "";
    }

    /**
     * @returns {void}
     */
    #render() {
        this.#shadow.appendChild(TitleElement.new(
            this.#css_api,
            this.#localization_api.translate(
                "Portrait"
            )
        ));

        this.#form_element = FormElement.new(
            this.#css_api,
            this.#localization_api
        );

        this.#form_element.addTitle(
            this.#localization_api.translate(
                "Portrait"
            )
        );

        const input_element = this.#form_element.addInput(
            this.#localization_api.translate(
                "Photo"
            ),
            "file",
            "photo",
            false,
            true
        );
        input_element.accept = "image/*";
        input_element.addEventListener("input", () => {
            this.#setPhoto();
        });
        input_element.required = this.#portrait["required-photo"];

        this.#image_element = new Image();
        this.#image_element.style.display = "block";
        this.#image_element.style.margin = "5px auto";
        this.#image_element.style.maxWidth = "100%";
        this.#image_element.style.width = "1000px";
        input_element.parentElement.parentElement.parentElement.appendChild(this.#image_element);

        this.#form_element.addSubtitle(
            "TODO crop"
        );

        this.#form_element.addSubtitle(
            this.#localization_api.translate(
                "Photo criteria {criteria}",
                null,
                {
                    criteria: this.#portrait.criteria
                }
            )
        );

        this.#form_element.addButtons(
            () => {
                this.#chosenPortrait();
            },
            this.#back_function
        );

        this.#shadow.appendChild(this.#form_element);

        this.#shadow.appendChild(MandatoryElement.new(
            this.#css_api,
            this.#localization_api
        ));

        if (this.#portrait.values !== null) {
            if (this.#portrait.values.photo !== null) {
                this.#photo_service.toInputElement(
                    this.#portrait.values.photo,
                    input_element
                );
                input_element.dispatchEvent(new Event("input"));
            }
        }
    }

    /**
     * @param {boolean} final
     * @returns {Promise<void>}
     */
    async #setPhoto(final = false) {
        const loading_element = this.#get_loading_element();

        try {
            const photo = await this.#photo_service.fromInputElement(
                this.#form_element.inputs.photo
            );

            if (photo === null) {
                this.#removePhoto();
                return;
            }

            this.#photo = await this.#photo_service.optimize(
                photo.photo,
                photo.type,
                this.#crop,
                !final ? 1000 : null,
                !final ? 1000 : null,
                null,
                null,
                !final ? 1 : null
            );

            this.#crop = null;

            if (final) {
                return;
            }

            this.#image_element.src = this.#photo_service.toDataUrl(
                this.#photo
            );

            this.#photo_service.toInputElement(
                this.#photo,
                this.#form_element.inputs.photo
            );
        } catch (error) {
            console.error(error);

            this.#removePhoto();
            this.#form_element.inputs.photo.dispatchEvent(new Event("input"));

            this.#form_element.setCustomValidationMessage(
                this.#form_element.inputs.photo,
                this.#localization_api.translate(
                    "The photo could not been loaded!"
                )
            );
        } finally {
            loading_element.remove();
        }
    }
}

export const PORTRAIT_ELEMENT_TAG_NAME = `${ELEMENT_TAG_NAME_PREFIX}${PAGE_PORTRAIT}`;

customElements.define(PORTRAIT_ELEMENT_TAG_NAME, PortraitElement);