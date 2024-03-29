import { flux_import_css } from "../Libs/flux-style-sheet-manager/src/FluxImportCss.mjs";
import { FormElement } from "../Form/FormElement.mjs";
import { LOCALIZATION_MODULE } from "../Localization/LOCALIZATION_MODULE.mjs";
import { MandatoryElement } from "../Mandatory/MandatoryElement.mjs";
import { PAGE_INTENDED_DEGREE_PROGRAM } from "../Page/PAGE.mjs";
import { TitleElement } from "../Title/TitleElement.mjs";
import { LOCALIZATION_KEY_COMBINATION_OF_SUBJECTS, LOCALIZATION_KEY_DEGREE_PROGRAM, LOCALIZATION_KEY_INTENDED_DEGREE_PROGRAM, LOCALIZATION_KEY_MANDATORY_SUBJECTS, LOCALIZATION_KEY_PLEASE_CHECK_YOUR_DATA, LOCALIZATION_KEY_PLEASE_CHOOSE_YOUR_INTENDED_DEGREE_PROGRAM, LOCALIZATION_KEY_PLEASE_SAVE_YOUR_SELECTION_IN_CASE_YOU_NEED_TO_CHOOSE_ADDITIONAL_MANDATORY_SUBJECTS_FOR_YOUR_COURSE_THEY_WILL_BE_SHOWN_ON_THE_NEXT_PAGE, LOCALIZATION_KEY_SUBJECT } from "../Localization/LOCALIZATION_KEY.mjs";

/** @typedef {import("../Back/backFunction.mjs").backFunction} backFunction */
/** @typedef {import("./chosenIntendedDegreeProgramFunction.mjs").chosenIntendedDegreeProgramFunction} chosenIntendedDegreeProgramFunction */
/** @typedef {import("../Libs/flux-localization-api/src/FluxLocalizationApi.mjs").FluxLocalizationApi} FluxLocalizationApi */
/** @typedef {import("./IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */
/** @typedef {import("../Label/LabelService.mjs").LabelService} LabelService */
/** @typedef {import("../Subject/SubjectWithCombinations.mjs").SubjectWithCombinations} SubjectWithCombinations */

const css = await flux_import_css.import(
    `${import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))}/IntendedDegreeProgramElement.css`
);

export class IntendedDegreeProgramElement extends HTMLElement {
    /**
     * @type {backFunction | null}
     */
    #back_function;
    /**
     * @type {chosenIntendedDegreeProgramFunction}
     */
    #chosen_intended_degree_program_function;
    /**
     * @type {FluxLocalizationApi}
     */
    #flux_localization_api;
    /**
     * @type {FormElement}
     */
    #form_element;
    /**
     * @type {IntendedDegreeProgram}
     */
    #intended_degree_program;
    /**
     * @type {LabelService}
     */
    #label_service;
    /**
     * @type {HTMLDivElement}
     */
    #mandatory_element;
    /**
     * @type {ShadowRoot}
     */
    #shadow;
    /**
     * @type {SubjectWithCombinations | null}
     */
    #subject = null;

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {LabelService} label_service
     * @param {IntendedDegreeProgram} intended_degree_program
     * @param {chosenIntendedDegreeProgramFunction} chosen_intended_degree_program_function
     * @param {backFunction | null} back_function
     * @returns {IntendedDegreeProgramElement}
     */
    static new(flux_localization_api, label_service, intended_degree_program, chosen_intended_degree_program_function, back_function = null) {
        return new this(
            flux_localization_api,
            label_service,
            intended_degree_program,
            chosen_intended_degree_program_function,
            back_function
        );
    }

    /**
     * @param {FluxLocalizationApi} flux_localization_api
     * @param {LabelService} label_service
     * @param {IntendedDegreeProgram} intended_degree_program
     * @param {chosenIntendedDegreeProgramFunction} chosen_intended_degree_program_function
     * @param {backFunction | null} back_function
     * @private
     */
    constructor(flux_localization_api, label_service, intended_degree_program, chosen_intended_degree_program_function, back_function) {
        super();

        this.#flux_localization_api = flux_localization_api;
        this.#label_service = label_service;
        this.#intended_degree_program = intended_degree_program;
        this.#chosen_intended_degree_program_function = chosen_intended_degree_program_function;
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
    async #chosenIntendedDegreeProgram() {
        if (!await this.#form_element.validate()) {
            return;
        }

        const post_result = await this.#chosen_intended_degree_program_function(
            {
                subject: this.#form_element.inputs.subject.value,
                combination: this.#form_element.inputs.combination.value
            }
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
                LOCALIZATION_KEY_INTENDED_DEGREE_PROGRAM
            )
        ));

        this.#form_element = FormElement.new(
            this.#flux_localization_api
        );

        this.#form_element.addTitle(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_DEGREE_PROGRAM
            )
        );

        this.#form_element.addSubtitle(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_PLEASE_CHOOSE_YOUR_INTENDED_DEGREE_PROGRAM
            )
        );

        const subject_element = this.#form_element.addInput(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_SUBJECT
            ),
            "select",
            "subject"
        );
        subject_element.required = true;

        for (const subject of this.#intended_degree_program.subjects) {
            const option_element = document.createElement("option");
            option_element.text = await this.#label_service.getSubjectLabel(
                subject
            );
            option_element.value = subject.id;
            subject_element.append(option_element);
        }

        subject_element.addEventListener("input", () => {
            this.#renderCombinations();
        });

        const combination_element = this.#form_element.addInput(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_COMBINATION_OF_SUBJECTS
            ),
            "select",
            "combination"
        );
        combination_element.required = true;

        combination_element.addEventListener("input", () => {
            this.#renderMandatory();
        });

        this.#mandatory_element = this.#form_element.addInput(
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_MANDATORY_SUBJECTS
            ),
            "readonly"
        );

        await this.#form_element.addButtons(
            () => {
                this.#chosenIntendedDegreeProgram();
            },
            this.#back_function,
            await this.#flux_localization_api.translate(
                LOCALIZATION_MODULE,
                LOCALIZATION_KEY_PLEASE_SAVE_YOUR_SELECTION_IN_CASE_YOU_NEED_TO_CHOOSE_ADDITIONAL_MANDATORY_SUBJECTS_FOR_YOUR_COURSE_THEY_WILL_BE_SHOWN_ON_THE_NEXT_PAGE
            )
        );

        this.#shadow.append(this.#form_element);

        this.#shadow.append(MandatoryElement.new(
            this.#flux_localization_api
        ));

        if (this.#intended_degree_program.values !== null) {
            subject_element.value = this.#intended_degree_program.values.subject;
            await this.#renderCombinations();

            combination_element.value = this.#intended_degree_program.values.combination;
            await this.#renderMandatory();
        } else {
            await this.#renderMandatory();
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async #renderCombinations() {
        this.#form_element.clearSelectOptions(
            this.#form_element.inputs.combination
        );

        this.#subject = this.#intended_degree_program.subjects.find(subject => subject.id === this.#form_element.inputs.subject.value) ?? null;

        await this.#renderMandatory();

        if (this.#subject === null) {
            return;
        }

        for (const combination of this.#subject.combinations) {
            const option_element = document.createElement("option");
            option_element.text = await this.#label_service.getCombinationLabel(
                combination
            );
            option_element.value = combination.id;
            this.#form_element.inputs.combination.append(option_element);
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async #renderMandatory() {
        this.#mandatory_element.innerText = await this.#label_service.getMultipleMandatoryLabel(
            this.#subject?.combinations?.find(combination => combination.id === this.#form_element.inputs.combination.value) ?? null
        );
    }
}

export const INTENDED_DEGREE_PROGRAM_ELEMENT_TAG_NAME = `flux-studis-selfservice-${PAGE_INTENDED_DEGREE_PROGRAM}`;

customElements.define(INTENDED_DEGREE_PROGRAM_ELEMENT_TAG_NAME, IntendedDegreeProgramElement);
