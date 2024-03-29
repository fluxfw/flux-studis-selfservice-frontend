import { flux_import_css } from "../Libs/flux-style-sheet-manager/src/FluxImportCss.mjs";
import { FormElement } from "../Form/FormElement.mjs";
import { LOCALIZATION_MODULE } from "../Localization/LOCALIZATION_MODULE.mjs";
import { MandatoryElement } from "../Mandatory/MandatoryElement.mjs";
import { PAGE_CHOICE_SUBJECT } from "../Page/PAGE.mjs";
import { TitleElement } from "../Title/TitleElement.mjs";
import { LOCALIZATION_KEY_CHOICE_OF_SUBJECT, LOCALIZATION_KEY_CHOOSE_YOUR_DEGREE_PROGRAM, LOCALIZATION_KEY_PLEASE_CHECK_YOUR_DATA, LOCALIZATION_KEY_QUALIFICATIONS_FOR_ADMISSION } from "../Localization/LOCALIZATION_KEY.mjs";

/** @typedef {import("../Back/backFunction.mjs").backFunction} backFunction */
/** @typedef {import("./ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("./chosenSubjectFunction.mjs").chosenSubjectFunction} chosenSubjectFunction */
/** @typedef {import("../DegreeProgram/DegreeProgram.mjs").DegreeProgram} DegreeProgram */
/** @typedef {import("../Libs/flux-localization-api/src/FluxLocalizationApi.mjs").FluxLocalizationApi} FluxLocalizationApi */
/** @typedef {import("../Label/LabelService.mjs").LabelService} LabelService */

const css = await flux_import_css.import(
    `${import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))}/ChoiceSubjectElement.css`
);

export class ChoiceSubjectElement extends HTMLElement {
    /**
     * @type {backFunction | null}
     */
    #back_function;
    /**
     * @type {ChoiceSubject}
     */
    #choice_subject;
    /**
     * @type {chosenSubjectFunction}
     */
    #chosen_subject_function;
    /**
     * @type {FluxLocalizationApi}
     */
    #flux_localization_api;
    /**
     * @type {FormElement}
     */
    #degree_program_form_element;
    /**
     * @type {LabelService}
     */
    #label_service;
    /**
     * @type {FormElement}
     */
    #qualifications_form_element;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {LabelService} label_service
     * @param {ChoiceSubject} choice_subject
     * @param {chosenSubjectFunction} chosen_subject_function
     * @param {backFunction | null} back_function
     * @returns {ChoiceSubjectElement}
     */
    static new(flux_localization_api, label_service, choice_subject, chosen_subject_function, back_function = null) {
        return new this(
            flux_localization_api,
            label_service,
            choice_subject,
            chosen_subject_function,
            back_function
        );
    }

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {LabelService} label_service
     * @param {ChoiceSubject} choice_subject
     * @param {chosenSubjectFunction} chosen_subject_function
     * @param {backFunction | null} back_function
     * @private
     */
    constructor(flux_localization_api, label_service, choice_subject, chosen_subject_function, back_function) {
        super();

        this.#flux_localization_api = flux_localization_api;
        this.#label_service = label_service;
        this.#choice_subject = choice_subject;
        this.#chosen_subject_function = chosen_subject_function;
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
    async #chosenSubject() {
        if (!await this.#degree_program_form_element.validate() || !await this.#qualifications_form_element.validate()) {
            return;
        }

        const post_result = await this.#chosen_subject_function(
            {
                "degree-program": this.#degree_program_form_element.getInputsByName(
                    "degree-program"
                ).find(input_element => input_element.checked).value,
                qualifications: Object.fromEntries(Object.values(this.#qualifications_form_element.getInputsByNameStartsWith(
                    "qualification-"
                )).map(input_element => [
                    input_element.value,
                    input_element.checked
                ]))
            }
        );

        if (post_result.ok) {
            return;
        }

        if (post_result["error-messages"] !== null) {
            for (const error_message of post_result["error-messages"]) {
                this.#qualifications_form_element.addInvalidMessage(
                    await this.#label_service.getErrorMessageLabel(
                        error_message
                    )
                );
            }
        } else {
            this.#qualifications_form_element.addInvalidMessage(
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
                LOCALIZATION_KEY_CHOICE_OF_SUBJECT
            )
        ));

        this.#degree_program_form_element = FormElement.new(
            this.#flux_localization_api
        );

        this.#degree_program_form_element.addTitle(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_CHOOSE_YOUR_DEGREE_PROGRAM
            )
        );

        for (const degree_program of this.#choice_subject["degree-programs"]) {
            const input_element = this.#degree_program_form_element.addInput(
                await this.#label_service.getDegreeProgramLabel(
                    degree_program
                ),
                "radio",
                "degree-program"
            );
            input_element.required = true;
            input_element.value = degree_program.id;
            input_element._degree_program = degree_program;
            input_element.addEventListener("input", () => {
                this.#renderQualifications(
                    degree_program
                );
            });
        }

        this.#shadow.append(this.#degree_program_form_element);

        this.#qualifications_form_element = FormElement.new(
            this.#flux_localization_api
        );

        this.#qualifications_form_element.addTitle(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_QUALIFICATIONS_FOR_ADMISSION
            )
        );

        await this.#qualifications_form_element.addButtons(
            () => {
                this.#chosenSubject();
            },
            this.#back_function
        );

        this.#shadow.append(this.#qualifications_form_element);

        this.#shadow.append(MandatoryElement.new(
            this.#flux_localization_api
        ));

        if (this.#choice_subject.values !== null) {
            for (const input_element of this.#degree_program_form_element.getInputsByName(
                "degree-program"
            )) {
                if (input_element.value === this.#choice_subject.values["degree-program"]) {
                    input_element.checked = true;
                    await this.#renderQualifications(
                        input_element._degree_program
                    );
                    break;
                }
            }

            for (const input_element of Object.values(this.#qualifications_form_element.getInputsByNameStartsWith(
                "qualification-"
            ))) {
                if (Object.hasOwn(this.#choice_subject.values.qualifications, input_element.value)) {
                    input_element.checked = this.#choice_subject.values.qualifications[input_element.value];
                }
            }
        }
    }

    /**
     * @param {DegreeProgram} degree_program
     * @returns {Promise<void>}
     */
    async #renderQualifications(degree_program) {
        this.#qualifications_form_element.clearInputs();

        for (const qualification of degree_program.qualifications) {
            const input_element = this.#qualifications_form_element.addInput(
                await this.#label_service.getQualificationLabel(
                    qualification
                ),
                "checkbox",
                `qualification-${qualification.id}`
            );
            input_element.required = qualification.required;
            input_element.value = qualification.id;
        }
    }
}

export const CHOICE_SUBJECT_ELEMENT_TAG_NAME = `flux-studis-selfservice-${PAGE_CHOICE_SUBJECT}`;

customElements.define(CHOICE_SUBJECT_ELEMENT_TAG_NAME, ChoiceSubjectElement);
