import { flux_import_css } from "../Libs/flux-style-sheet-manager/src/FluxImportCss.mjs";
import { FormElement } from "../Form/FormElement.mjs";
import { LOCALIZATION_MODULE } from "../Localization/LOCALIZATION_MODULE.mjs";
import { MandatoryElement } from "../Mandatory/MandatoryElement.mjs";
import { PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../Page/PAGE.mjs";
import { TitleElement } from "../Title/TitleElement.mjs";
import { LOCALIZATION_KEY_CERTIFICATE, LOCALIZATION_KEY_LEGAL_PLACE_OF_RESIDENCE_WHEN_THE_CERTIFICATE_WAS_AWARDED, LOCALIZATION_KEY_PLEASE_CHECK_YOUR_DATA, LOCALIZATION_KEY_PLEASE_ENTER_YOUR_EDUCATIONAL_QUALIFICATIONS_THAT_QUALIFY_YOU_TO_APPLY_FOR_ADMISSION_TO_A_DEGREE_PROGRAM, LOCALIZATION_KEY_THE_CANTON_IN_WHICH_THE_SCHOOL_IS_LOCATED_WHERE_YOU_WERE_AWARDED_YOUR_MATURA, LOCALIZATION_KEY_THE_CANTON_OF_YOUR_POLITICAL_COMMUNE_WHERE_YOU_WERE_REGISTERED_AT_THE_TIME_YOU_WERE_AWARDED_YOUR_CERTIFICATE, LOCALIZATION_KEY_THE_COUNTRY_WHERE_YOU_WERE_REGISTERED_AT_THE_TIME_YOU_WERE_AWARDED_YOUR_CERTIFICATE, LOCALIZATION_KEY_TYPE_OF_CERTIFICATE, LOCALIZATION_KEY_UNIVERSITY_ENTRANCE_QUALIFICATION, LOCALIZATION_KEY_UPPER_SECONDARY_SCHOOL, LOCALIZATION_KEY_UPPER_SECONDARY_SCHOOL_LEAVING_CERTIFICATE, LOCALIZATION_KEY_YEAR_OF_ISSUE } from "../Localization/LOCALIZATION_KEY.mjs";
import { UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_CANTON, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_COUNTRY, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_PLACE, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_TYPE, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_ISSUE_YEAR, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_MATURA_CANTON, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_UPPER_SECONDARY_SCHOOL } from "./UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE.mjs";

/** @typedef {import("../Back/backFunction.mjs").backFunction} backFunction */
/** @typedef {import("./chosenUniversityEntranceQualificationFunction.mjs").chosenUniversityEntranceQualificationFunction} chosenUniversityEntranceQualificationFunction */
/** @typedef {import("../Libs/flux-localization-api/src/FluxLocalizationApi.mjs").FluxLocalizationApi} FluxLocalizationApi */
/** @typedef {import("../Label/LabelService.mjs").LabelService} LabelService */
/** @typedef {import("./UniversityEntranceQualification.mjs").UniversityEntranceQualification} UniversityEntranceQualification */
/** @typedef {import("./UniversityEntranceQualificationSelectOption.mjs").UniversityEntranceQualificationSelectOption} UniversityEntranceQualificationSelectOption */

const css = await flux_import_css.import(
    `${import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))}/UniversityEntranceQualificationElement.css`
);

export class UniversityEntranceQualificationElement extends HTMLElement {
    /**
     * @type {backFunction | null}
     */
    #back_function;
    /**
     * @type {chosenUniversityEntranceQualificationFunction}
     */
    #chosen_university_entrance_qualification_function;
    /**
     * @type {FluxLocalizationApi}
     */
    #flux_localization_api;
    /**
     * @type {FormElement}
     */
    #form_element;
    /**
     * @type {LabelService}
     */
    #label_service;
    /**
     * @type {[HTMLSelectElement, UniversityEntranceQualificationSelectOption[]][]}
     */
    #selects;
    /**
     * @type {ShadowRoot}
     */
    #shadow;
    /**
     * @type {UniversityEntranceQualification}
     */
    #university_entrance_qualification;

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {LabelService} label_service
     * @param {UniversityEntranceQualification} university_entrance_qualification
     * @param {chosenUniversityEntranceQualificationFunction} chosen_university_entrance_qualification_function
     * @param {backFunction | null} back_function
     * @returns {UniversityEntranceQualificationElement}
     */
    static new(flux_localization_api, label_service, university_entrance_qualification, chosen_university_entrance_qualification_function, back_function = null) {
        return new this(
            flux_localization_api,
            label_service,
            university_entrance_qualification,
            chosen_university_entrance_qualification_function,
            back_function
        );
    }

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {LabelService} label_service
     * @param {UniversityEntranceQualification} university_entrance_qualification
     * @param {chosenUniversityEntranceQualificationFunction} chosen_university_entrance_qualification_function
     * @param {backFunction | null} back_function
     * @private
     */
    constructor(flux_localization_api, label_service, university_entrance_qualification, chosen_university_entrance_qualification_function, back_function) {
        super();

        this.#flux_localization_api = flux_localization_api;
        this.#label_service = label_service;
        this.#university_entrance_qualification = university_entrance_qualification;
        this.#chosen_university_entrance_qualification_function = chosen_university_entrance_qualification_function;
        this.#back_function = back_function;
        this.#selects = [];

        this.#shadow = this.attachShadow({
            mode: "closed"
        });

        this.#shadow.adoptedStyleSheets.push(css);

        this.#render();
    }

    /**
     * @returns {Promise<void>}
     */
    async #chosenUniversityEntranceQualification() {
        if (!await this.#form_element.validate()) {
            return;
        }

        const post_result = await this.#chosen_university_entrance_qualification_function(
            Object.fromEntries([
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE,
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_CANTON,
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_COUNTRY,
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_PLACE,
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_TYPE,
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_ISSUE_YEAR,
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_MATURA_CANTON,
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_UPPER_SECONDARY_SCHOOL
            ].map(select_type => [
                select_type,
                this.#form_element.inputs[select_type]?.value ?? null
            ]).filter(([
                ,
                value
            ]) => value !== null))
        );

        if (post_result.ok) {
            return;
        }

        if (post_result["error-messages"] !== null) {
            for (const error_message of post_result["error-messages"]) {
                this.#form_element.addInvalidMessage(
                    await this.#label_service.getErrorMessageLabel(
                        error_message
                    )
                );
            }
        } else {
            this.#form_element.addInvalidMessage(
                await this.#flux_localization_api.translate(
                    LOCALIZATION_MODULE,
                    LOCALIZATION_KEY_PLEASE_CHECK_YOUR_DATA
                )
            );
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async #render() {
        this.#shadow.append(TitleElement.new(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_UNIVERSITY_ENTRANCE_QUALIFICATION
            )
        ));

        this.#form_element = FormElement.new(
            this.#flux_localization_api
        );

        this.#form_element.addTitle(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_UPPER_SECONDARY_SCHOOL_LEAVING_CERTIFICATE
            )
        );

        this.#form_element.addSubtitle(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_PLEASE_ENTER_YOUR_EDUCATIONAL_QUALIFICATIONS_THAT_QUALIFY_YOU_TO_APPLY_FOR_ADMISSION_TO_A_DEGREE_PROGRAM
            )
        );

        await this.#nextSelect(
            this.#university_entrance_qualification["select-index"]
        );

        await this.#form_element.addButtons(
            () => {
                this.#chosenUniversityEntranceQualification();
            },
            this.#back_function
        );

        this.#shadow.append(this.#form_element);

        this.#shadow.append(MandatoryElement.new(
            this.#flux_localization_api
        ));

        if (this.#university_entrance_qualification.values !== null) {
            await this.#initValues();
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async #initValues() {
        const [
            select_element
        ] = this.#selects[this.#selects.length - 1];

        if (select_element.value !== "") {
            return;
        }

        const value = this.#university_entrance_qualification.values[select_element.name] ?? null;

        if (value === null) {
            return;
        }

        select_element.value = value;

        await this.#selected(
            select_element
        );

        await this.#initValues();
    }

    /**
     * @param {number} select_index
     * @returns {Promise<void>}
     */
    async #nextSelect(select_index) {
        const [
            select_to_data_index,
            select_options
        ] = this.#university_entrance_qualification.selects[select_index];

        const [
            select_type,
            data_index
        ] = this.#university_entrance_qualification["select-to-data"][select_to_data_index];

        const data = this.#university_entrance_qualification.data[data_index];

        let label_key, get_option_label;
        switch (select_type) {
            case UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE:
                label_key = LOCALIZATION_KEY_CERTIFICATE;
                get_option_label = "getCertificateLabel";
                break;

            case UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_CANTON:
                label_key = LOCALIZATION_KEY_THE_CANTON_OF_YOUR_POLITICAL_COMMUNE_WHERE_YOU_WERE_REGISTERED_AT_THE_TIME_YOU_WERE_AWARDED_YOUR_CERTIFICATE;
                get_option_label = "getCantonLabel";
                break;

            case UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_COUNTRY:
                label_key = LOCALIZATION_KEY_THE_COUNTRY_WHERE_YOU_WERE_REGISTERED_AT_THE_TIME_YOU_WERE_AWARDED_YOUR_CERTIFICATE;
                get_option_label = "getCountryLabel";
                break;

            case UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_PLACE:
                label_key = LOCALIZATION_KEY_LEGAL_PLACE_OF_RESIDENCE_WHEN_THE_CERTIFICATE_WAS_AWARDED;
                get_option_label = "getPlaceLabel";
                break;

            case UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_TYPE:
                label_key = LOCALIZATION_KEY_TYPE_OF_CERTIFICATE;
                get_option_label = "getCertificateTypeLabel";
                break;

            case UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_ISSUE_YEAR:
                label_key = LOCALIZATION_KEY_YEAR_OF_ISSUE;
                get_option_label = "getIssueYearLabel";
                break;

            case UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_MATURA_CANTON:
                label_key = LOCALIZATION_KEY_THE_CANTON_IN_WHICH_THE_SCHOOL_IS_LOCATED_WHERE_YOU_WERE_AWARDED_YOUR_MATURA;
                get_option_label = "getCantonLabel";
                break;

            case UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_UPPER_SECONDARY_SCHOOL:
                label_key = LOCALIZATION_KEY_UPPER_SECONDARY_SCHOOL;
                get_option_label = "getSchoolLabel";
                break;

            default:
                return;
        }

        const select_element = this.#form_element.addInput(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                label_key
            ),
            "select",
            select_type
        );
        select_element.required = true;

        for (const select_option of select_options) {
            const option_id = typeof select_option === "string" ? select_option : select_option[0];

            const option_element = document.createElement("option");
            option_element.text = await this.#label_service[get_option_label](
                data[option_id]
            );
            option_element.value = option_id;
            select_element.append(option_element);
        }

        select_element.addEventListener("input", () => {
            this.#selected(
                select_element
            );
        });

        this.#selects.push([
            select_element,
            select_options
        ]);
    }

    /**
     * @param {HTMLSelectElement} select_element
     * @returns {Promise<void>}
     */
    async #selected(select_element) {
        const select_index = this.#selects.findIndex(([
            _select_element
        ]) => _select_element === select_element);

        if (select_index === -1) {
            return;
        }

        if (this.#selects.length > (select_index + 1)) {
            for (const [
                _select_element
            ] of this.#selects.slice(select_index + 1)) {
                _select_element.parentElement.remove();
            }

            this.#selects = this.#selects.slice(0, select_index + 1);
        }

        const [
            ,
            select_options
        ] = this.#selects[select_index];

        const select_option = select_options.find(_select_option => (typeof _select_option === "string" ? _select_option : _select_option[0]) === select_element.value) ?? null;

        if (select_option === null || typeof select_option === "string") {
            return;
        }

        await this.#nextSelect(
            select_option[1]
        );
    }
}

export const UNIVERSITY_ENTRANCE_QUALIFICATION_ELEMENT_TAG_NAME = `flux-studis-selfservice-${PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION}`;

customElements.define(UNIVERSITY_ENTRANCE_QUALIFICATION_ELEMENT_TAG_NAME, UniversityEntranceQualificationElement);
