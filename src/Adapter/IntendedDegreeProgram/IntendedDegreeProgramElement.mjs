import { ELEMENT_TAG_NAME_PREFIX } from "../Element/ELEMENT_TAG_NAME_PREFIX.mjs";
import { FormElement } from "../Form/FormElement.mjs";
import { MandatoryElement } from "../Mandatory/MandatoryElement.mjs";
import { PAGE_INTENDED_DEGREE_PROGRAM } from "../Page/PAGE.mjs";
import { TitleElement } from "../Title/TitleElement.mjs";

/** @typedef {import("../Post/backFunction.mjs").backFunction} backFunction */
/** @typedef {import("./chosenIntendedDegreeProgramFunction.mjs").chosenIntendedDegreeProgramFunction} chosenIntendedDegreeProgramFunction */
/** @typedef {import("../../Libs/flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */
/** @typedef {import("./IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */
/** @typedef {import("../../Service/Label/Port/LabelService.mjs").LabelService} LabelService */
/** @typedef {import("../../Libs/flux-localization-api/src/Adapter/Api/LocalizationApi.mjs").LocalizationApi} LocalizationApi */
/** @typedef {import("../Subject/SubjectWithCombinations.mjs").SubjectWithCombinations} SubjectWithCombinations */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

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
     * @type {CssApi}
     */
    #css_api;
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
     * @type {LocalizationApi}
     */
    #localization_api;
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
     * @param {CssApi} css_api
     * @param {LabelService} label_service
     * @param {LocalizationApi} localization_api
     * @param {IntendedDegreeProgram} intended_degree_program
     * @param {chosenIntendedDegreeProgramFunction} chosen_intended_degree_program_function
     * @param {backFunction | null} back_function
     * @returns {IntendedDegreeProgramElement}
     */
    static new(css_api, label_service, localization_api, intended_degree_program, chosen_intended_degree_program_function, back_function = null) {
        return new this(
            css_api,
            label_service,
            localization_api,
            intended_degree_program,
            chosen_intended_degree_program_function,
            back_function
        );
    }

    /**
     * @param {CssApi} css_api
     * @param {LabelService} label_service
     * @param {LocalizationApi} localization_api
     * @param {IntendedDegreeProgram} intended_degree_program
     * @param {chosenIntendedDegreeProgramFunction} chosen_intended_degree_program_function
     * @param {backFunction | null} back_function
     * @private
     */
    constructor(css_api, label_service, localization_api, intended_degree_program, chosen_intended_degree_program_function, back_function) {
        super();

        this.#css_api = css_api;
        this.#label_service = label_service;
        this.#localization_api = localization_api;
        this.#intended_degree_program = intended_degree_program;
        this.#chosen_intended_degree_program_function = chosen_intended_degree_program_function;
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
                await this.#localization_api.translate(
                    "Please check your data!"
                )
            );
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async #render() {
        this.#shadow.appendChild(TitleElement.new(
            this.#css_api,
            await this.#localization_api.translate(
                "Intended degree program"
            )
        ));

        this.#form_element = FormElement.new(
            this.#css_api,
            this.#localization_api
        );

        this.#form_element.addTitle(
            await this.#localization_api.translate(
                "Degree program"
            )
        );

        this.#form_element.addSubtitle(
            await this.#localization_api.translate(
                "Please choose your intended degree program"
            )
        );

        const subject_element = this.#form_element.addInput(
            await this.#localization_api.translate(
                "Subject"
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
            subject_element.appendChild(option_element);
        }

        subject_element.addEventListener("input", () => {
            this.#renderCombinations();
        });

        const combination_element = this.#form_element.addInput(
            await this.#localization_api.translate(
                "Combination of subjects"
            ),
            "select",
            "combination"
        );
        combination_element.required = true;

        combination_element.addEventListener("input", () => {
            this.#renderMandatory();
        });

        this.#mandatory_element = this.#form_element.addInput(
            await this.#localization_api.translate(
                "Mandatory subjects"
            ),
            "readonly"
        );

        await this.#form_element.addButtons(
            () => {
                this.#chosenIntendedDegreeProgram();
            },
            this.#back_function,
            await this.#localization_api.translate(
                "Please save your selection. In case you need to choose additional mandatory subjects for your course, they will be shown on the next page"
            )
        );

        this.#shadow.appendChild(this.#form_element);

        this.#shadow.appendChild(MandatoryElement.new(
            this.#css_api,
            this.#localization_api
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
            this.#form_element.inputs.combination.appendChild(option_element);
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

export const INTENDED_DEGREE_PROGRAM_ELEMENT_TAG_NAME = `${ELEMENT_TAG_NAME_PREFIX}${PAGE_INTENDED_DEGREE_PROGRAM}`;

customElements.define(INTENDED_DEGREE_PROGRAM_ELEMENT_TAG_NAME, IntendedDegreeProgramElement);
