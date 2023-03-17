import { HttpClientResponse } from "./Libs/flux-http-api/src/Client/HttpClientResponse.mjs";
import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT } from "./Libs/flux-color-scheme/src/ColorScheme/COLOR_SCHEME.mjs";
import { PAGE_CHOICE_SUBJECT, PAGE_COMPLETED, PAGE_CREATE, PAGE_IDENTIFICATION_NUMBER, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_LEGAL, PAGE_PERSONAL_DATA, PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_RESUME, PAGE_START, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "./Page/PAGE.mjs";
import { SETTINGS_INDEXEDDB_IMPLEMENTATION_DATABASE_NAME, SETTINGS_INDEXEDDB_IMPLEMENTATION_STORE_NAME } from "./Settings/SETTINGS_IMPLEMENTATION.mjs";

/** @typedef {import("./Back/backFunction.mjs").backFunction} backFunction */
/** @typedef {import("./ChoiceSubject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("./ChoiceSubject/ChoiceSubjectElement.mjs").ChoiceSubjectElement} ChoiceSubjectElement */
/** @typedef {import("./Completed/CompletedElement.mjs").CompletedElement} CompletedElement */
/** @typedef {import("./Libs/flux-css-api/src/FluxCssApi.mjs").FluxCssApi} FluxCssApi */
/** @typedef {import("./Libs/flux-color-scheme/src/FluxColorScheme.mjs").FluxColorScheme} FluxColorScheme */
/** @typedef {import("./Libs/flux-http-api/src/FluxHttpApi.mjs").FluxHttpApi} FluxHttpApi */
/** @typedef {import("./Libs/flux-loading-api/src/FluxLoadingApi.mjs").FluxLoadingApi} FluxLoadingApi */
/** @typedef {import("./Libs/flux-localization-api/src/FluxLocalizationApi.mjs").FluxLocalizationApi} FluxLocalizationApi */
/** @typedef {import("./Libs/flux-pwa-api/src/FluxPwaApi.mjs").FluxPwaApi} FluxPwaApi */
/** @typedef {import("./Libs/flux-settings-api/src/FluxSettingsApi.mjs").FluxSettingsApi} FluxSettingsApi */
/** @typedef {import("./FormInvalid/FormInvalidElement.mjs").FormInvalidElement} FormInvalidElement */
/** @typedef {import("./Libs/flux-loading-api/src/Loading/FullscreenLoadingElement.mjs").FullscreenLoadingElement} FullscreenLoadingElement */
/** @typedef {import("./Get/GetResult.mjs").GetResult} GetResult */
/** @typedef {import("./IdentificationNumber/IdentificationNumber.mjs").IdentificationNumber} IdentificationNumber */
/** @typedef {import("./IdentificationNumber/IdentificationNumberElement.mjs").IdentificationNumberElement} IdentificationNumberElement */
/** @typedef {import("./IntendedDegreeProgram/IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */
/** @typedef {import("./IntendedDegreeProgram/IntendedDegreeProgramElement.mjs").IntendedDegreeProgramElement} IntendedDegreeProgramElement */
/** @typedef {import("./IntendedDegreeProgram2/IntendedDegreeProgram2.mjs").IntendedDegreeProgram2} IntendedDegreeProgram2 */
/** @typedef {import("./IntendedDegreeProgram2/IntendedDegreeProgram2Element.mjs").IntendedDegreeProgram2Element} IntendedDegreeProgram2Element */
/** @typedef {import("./Label/Port/LabelService.mjs").LabelService} LabelService */
/** @typedef {import("./Layout/Layout.mjs").Layout} Layout */
/** @typedef {import("./Legal/Legal.mjs").Legal} Legal */
/** @typedef {import("./Legal/LegalElement.mjs").LegalElement} LegalElement */
/** @typedef {import("./Main/MainElement.mjs").MainElement} MainElement */
/** @typedef {import("./Password/Port/PasswordService.mjs").PasswordService} PasswordService */
/** @typedef {import("./PersonalData/PersonalData.mjs").PersonalData} PersonalData */
/** @typedef {import("./PersonalData/PersonalDataElement.mjs").PersonalDataElement} PersonalDataElement */
/** @typedef {import("./Photo/Port/PhotoService.mjs").PhotoService} PhotoService */
/** @typedef {import("./Portrait/Portrait.mjs").Portrait} Portrait */
/** @typedef {import("./Portrait/PortraitElement.mjs").PortraitElement} PortraitElement */
/** @typedef {import("./PreviousStudies/PreviousStudies.mjs").PreviousStudies} PreviousStudies */
/** @typedef {import("./PreviousStudies/PreviousStudiesElement.mjs").PreviousStudiesElement} PreviousStudiesElement */
/** @typedef {import("./Post/postFunction.mjs").postFunction} postFunction */
/** @typedef {import("./Request/Port/RequestService.mjs").RequestService} RequestService */
/** @typedef {import("./Libs/flux-localization-api/src/SelectLanguage/SelectLanguageElement.mjs").SelectLanguageElement} SelectLanguageElement */
/** @typedef {import("./Start/Start.mjs").Start} Start */
/** @typedef {import("./Start/StartElement.mjs").StartElement} StartElement */
/** @typedef {import("./UniversityEntranceQualification/UniversityEntranceQualification.mjs").UniversityEntranceQualification} UniversityEntranceQualification */
/** @typedef {import("./UniversityEntranceQualification/UniversityEntranceQualificationElement.mjs").UniversityEntranceQualificationElement} UniversityEntranceQualificationElement */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

export class FluxStudisSelfserviceFrontend {
    /**
     * @type {FluxColorScheme | null}
     */
    #flux_color_scheme = null;
    /**
     * @type {FluxCssApi | null}
     */
    #flux_css_api = null;
    /**
     * @type {FluxHttpApi | null}
     */
    #flux_http_api = null;
    /**
     * @type {FluxLoadingApi | null}
     */
    #flux_loading_api = null;
    /**
     * @type {FluxLocalizationApi | null}
     */
    #flux_localization_api = null;
    /**
     * @type {FluxPwaApi | null}
     */
    #flux_pwa_api = null;
    /**
     * @type {FluxSettingsApi | null}
     */
    #flux_settings_api = null;
    /**
     * @type {LabelService | null}
     */
    #label_service = null;
    /**
     * @type {Layout | null}
     */
    #layout = null;
    /**
     * @type {MainElement | null}
     */
    #main_element = null;
    /**
     * @type {PasswordService | null}
     */
    #password_service = null;
    /**
     * @type {PhotoService | null}
     */
    #photo_service = null;
    /**
     * @type {GetResult | null}
     */
    #previous_get_result = null;
    /**
     * @type {RequestService | null}
     */
    #request_service = null;

    /**
     * @returns {FluxStudisSelfserviceFrontend}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @returns {Promise<void>}
     */
    async init() {
        const flux_color_scheme = await this.#getFluxColorScheme();
        const flux_css_api = await this.#getFluxCssApi();
        await this.#getFluxLoadingApi();
        const flux_localization_api = await this.#getFluxLocalizationApi();
        await this.#getFluxPwaApi();

        await flux_css_api.importCss(
            `${__dirname}/Layout/style.css`
        );
        flux_css_api.importCssToRoot(
            document,
            `${__dirname}/Layout/style.css`
        );

        await flux_localization_api.addModule(
            `${__dirname}/Localization`
        );

        await flux_color_scheme.renderColorScheme();

        await (await this.#getFluxLocalizationApi()).selectDefaultLanguage();
        await this.#afterSelectLanguage();
    }

    /**
     * @param {boolean} previous_get_result
     * @returns {Promise<void>}
     */
    async showFrontend(previous_get_result = false) {
        document.body.appendChild(this.#main_element = (await import("./Main/MainElement.mjs")).MainElement.new(
            await this.#getFluxColorScheme(),
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            this,
            await this.#getLayout()
        ));

        await this.#next(
            previous_get_result
        );
    }

    /**
     * @returns {Promise<SelectLanguageElement>}
     */
    async getSelectLanguageElement() {
        return (await this.#getFluxLocalizationApi()).getSelectLanguageElement(
            async () => {
                await this.#afterSelectLanguage(
                    true
                );
            }
        );
    }

    /**
     * @param {boolean} ui
     * @returns {Promise<void>}
     */
    async #afterSelectLanguage(ui = false) {
        await (await this.#getFluxPwaApi()).initPwa(
            `${__dirname}/Pwa/manifest.json`
        );

        if (!ui) {
            return;
        }

        this.#main_element.remove();
        this.#main_element = null;

        this.showFrontend(
            true
        );
    }

    /**
     * @param {ChoiceSubject} choice_subject
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<ChoiceSubjectElement>}
     */
    async #getChoiceSubjectElement(choice_subject, post_function, back_function = null) {
        return (await import("./ChoiceSubject/ChoiceSubjectElement.mjs")).ChoiceSubjectElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            choice_subject,
            async chosen_subject => post_function(
                {
                    page: PAGE_CHOICE_SUBJECT,
                    data: chosen_subject
                }
            ),
            back_function
        );
    }

    /**
     * @param {backFunction | null} back_function
     * @returns {Promise<CompletedElement>}
     */
    async #getCompletedElement(back_function = null) {
        return (await import("./Completed/CompletedElement.mjs")).CompletedElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            back_function
        );
    }

    /**
     * @returns {Promise<FluxColorScheme>}
     */
    async #getFluxColorScheme() {
        if (this.#flux_color_scheme === null) {
            this.#flux_color_scheme ??= (await import("./Libs/flux-color-scheme/src/FluxColorScheme.mjs")).FluxColorScheme.new(
                [
                    {
                        color_scheme: COLOR_SCHEME_LIGHT,
                        name: "light"
                    },
                    {
                        color_scheme: COLOR_SCHEME_DARK,
                        name: "dark"
                    }
                ],
                await this.#getFluxCssApi(),
                await this.#getFluxLocalizationApi(),
                await this.#getFluxSettingsApi(),
                {
                    [COLOR_SCHEME_LIGHT]: "light",
                    [COLOR_SCHEME_DARK]: "dark"
                },
                [
                    "container-border-color",
                    "form-background-color",
                    "form-buttons-background-color",
                    "input-border-color",
                    "left-background-color",
                    "left-border-color"
                ]
            );

            await this.#flux_color_scheme.init();
        }

        return this.#flux_color_scheme;
    }

    /**
     * @returns {Promise<FluxCssApi>}
     */
    async #getFluxCssApi() {
        this.#flux_css_api ??= (await import("./Libs/flux-css-api/src/FluxCssApi.mjs")).FluxCssApi.new(
            await this.#getFluxHttpApi()
        );

        return this.#flux_css_api;
    }

    /**
     * @returns {Promise<FluxHttpApi>}
     */
    async #getFluxHttpApi() {
        this.#flux_http_api ??= (await import("./Libs/flux-http-api/src/FluxHttpApi.mjs")).FluxHttpApi.new();

        return this.#flux_http_api;
    }

    /**
     * @returns {Promise<FluxLoadingApi>}
     */
    async #getFluxLoadingApi() {
        if (this.#flux_loading_api === null) {
            this.#flux_loading_api ??= (await import("./Libs/flux-loading-api/src/FluxLoadingApi.mjs")).FluxLoadingApi.new(
                await this.#getFluxCssApi()
            );

            await this.#flux_loading_api.init();
        }

        return this.#flux_loading_api;
    }

    /**
     * @returns {Promise<FluxLocalizationApi>}
     */
    async #getFluxLocalizationApi() {
        if (this.#flux_localization_api === null) {
            this.#flux_localization_api ??= (await import("./Libs/flux-localization-api/src/FluxLocalizationApi.mjs")).FluxLocalizationApi.new(
                await this.#getFluxCssApi(),
                await this.#getFluxHttpApi(),
                await this.#getFluxSettingsApi()
            );

            await this.#flux_localization_api.init();
        }

        return this.#flux_localization_api;
    }

    /**
     * @returns {Promise<FluxPwaApi>}
     */
    async #getFluxPwaApi() {
        if (this.#flux_pwa_api === null) {
            this.#flux_pwa_api ??= (await import("./Libs/flux-pwa-api/src/FluxPwaApi.mjs")).FluxPwaApi.new(
                await this.#getFluxCssApi(),
                await this.#getFluxHttpApi(),
                await this.#getFluxLoadingApi(),
                await this.#getFluxLocalizationApi(),
                await this.#getFluxSettingsApi()
            );

            await this.#flux_pwa_api.init();
        }

        return this.#flux_pwa_api;
    }

    /**
     * @returns {Promise<FluxSettingsApi>}
     */
    async #getFluxSettingsApi() {
        this.#flux_settings_api ??= (await import("./Libs/flux-settings-api/src/FluxSettingsApi.mjs")).FluxSettingsApi.new(
            await (await import("./Libs/flux-settings-api/src/StorageImplementation/Browser/getBrowserStorageImplementation.mjs")).getBrowserStorageImplementation(
                SETTINGS_INDEXEDDB_IMPLEMENTATION_DATABASE_NAME,
                SETTINGS_INDEXEDDB_IMPLEMENTATION_STORE_NAME
            )
        );

        return this.#flux_settings_api;
    }

    /**
     * @param {string} message
     * @returns {Promise<FormInvalidElement>}
     */
    async #getFormInvalidElement(message) {
        return (await import("./FormInvalid/FormInvalidElement.mjs")).FormInvalidElement.new(
            await this.#getFluxCssApi(),
            message
        );
    }

    /**
     * @param {IdentificationNumber} identification_number
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<IdentificationNumberElement>}
     */
    async #getIdentificationNumberElement(identification_number, post_function, back_function = null) {
        return (await import("./IdentificationNumber/IdentificationNumberElement.mjs")).IdentificationNumberElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            identification_number,
            async confirmed_identification_number => post_function(
                {
                    page: PAGE_IDENTIFICATION_NUMBER,
                    data: confirmed_identification_number
                }
            ),
            back_function
        );
    }

    /**
     * @param {IntendedDegreeProgram} intended_degree_program
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<IntendedDegreeProgramElement>}
     */
    async #getIntendedDegreeProgramElement(intended_degree_program, post_function, back_function = null) {
        return (await import("./IntendedDegreeProgram/IntendedDegreeProgramElement.mjs")).IntendedDegreeProgramElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            intended_degree_program,
            async chosen_intended_degree_program => post_function(
                {
                    page: PAGE_INTENDED_DEGREE_PROGRAM,
                    data: chosen_intended_degree_program
                }
            ),
            back_function
        );
    }

    /**
     * @param {IntendedDegreeProgram2} intended_degree_program_2
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<IntendedDegreeProgram2Element>}
     */
    async #getIntendedDegreeProgram2Element(intended_degree_program_2, post_function, back_function = null) {
        return (await import("./IntendedDegreeProgram2/IntendedDegreeProgram2Element.mjs")).IntendedDegreeProgram2Element.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            intended_degree_program_2,
            async chosen_intended_degree_program_2 => post_function(
                {
                    page: PAGE_INTENDED_DEGREE_PROGRAM_2,
                    data: chosen_intended_degree_program_2
                }
            ),
            back_function
        );
    }

    /**
     * @returns {Promise<LabelService>}
     */
    async #getLabelService() {
        this.#label_service ??= (await import("./Label/Port/LabelService.mjs")).LabelService.new(
            await this.#getFluxLocalizationApi()
        );

        return this.#label_service;
    }

    /**
     * @returns {Promise<Layout>}
     */
    async #getLayout() {
        this.#layout ??= await (await this.#getRequestService()).layout();

        return this.#layout;
    }

    /**
     * @param {Legal} legal
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<LegalElement>}
     */
    async #getLegalElement(legal, post_function, back_function = null) {
        return (await import("./Legal/LegalElement.mjs")).LegalElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            legal,
            async accepted_legal => post_function(
                {
                    page: PAGE_LEGAL,
                    data: accepted_legal
                }
            ),
            back_function
        );
    }

    /**
     * @returns {Promise<FullscreenLoadingElement>}
     */
    async #getLoadingElement() {
        const loading_element = await (await this.#getFluxLoadingApi()).getFullscreenLoadingElement();
        document.body.appendChild(loading_element);
        return loading_element;
    }

    /**
     * @param {GetResult} get_result
     * @param {postFunction} post_function
     * @param {backFunction} back_function
     * @returns {Promise<HTMLElement>}
     */
    async #getPage(get_result, post_function, back_function) {
        try {
            const _back_function = get_result["can-back"] ? back_function : null;

            switch (get_result.page) {
                case PAGE_CHOICE_SUBJECT:
                    return await this.#getChoiceSubjectElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_COMPLETED:
                    return await this.#getCompletedElement(
                        _back_function
                    );

                case PAGE_CREATE:
                case PAGE_RESUME:
                case PAGE_START:
                    return await this.#getStartElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_IDENTIFICATION_NUMBER:
                    return await this.#getIdentificationNumberElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_INTENDED_DEGREE_PROGRAM:
                    return await this.#getIntendedDegreeProgramElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_INTENDED_DEGREE_PROGRAM_2:
                    return await this.#getIntendedDegreeProgram2Element(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_LEGAL:
                    return await this.#getLegalElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_PERSONAL_DATA:
                    return await this.#getPersonalDataElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_PORTRAIT:
                    return await this.#getPortraitElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_PREVIOUS_STUDIES:
                    return await this.#getPreviousStudiesElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                case PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION:
                    return await this.#getUniversityEntranceQualificationElement(
                        get_result.data,
                        post_function,
                        _back_function
                    );

                default:
                    return this.#getFormInvalidElement(
                        `Unsupported page ${get_result.page}`
                    );
            }
        } catch (error) {
            console.error(error);

            return this.#getFormInvalidElement(
                await (await this.#getFluxLocalizationApi()).translate(
                    "Page error!"
                )
            );
        }
    }

    /**
     * @returns {Promise<PasswordService>}
     */
    async #getPasswordService() {
        this.#password_service ??= (await import("./Password/Port/PasswordService.mjs")).PasswordService.new();

        return this.#password_service;
    }

    /**
     * @param {PersonalData} personal_data
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<PersonalDataElement>}
     */
    async #getPersonalDataElement(personal_data, post_function, back_function = null) {
        return (await import("./PersonalData/PersonalDataElement.mjs")).PersonalDataElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            personal_data,
            async filled_personal_data => post_function(
                {
                    page: PAGE_PERSONAL_DATA,
                    data: filled_personal_data
                }
            ),
            back_function
        );
    }

    /**
     * @returns {Promise<PhotoService>}
     */
    async #getPhotoService() {
        this.#photo_service ??= (await import("./Photo/Port/PhotoService.mjs")).PhotoService.new(
            await this.#getFluxLocalizationApi()
        );

        return this.#photo_service;
    }

    /**
     * @param {Portrait} portrait
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<PortraitElement>}
     */
    async #getPortraitElement(portrait, post_function, back_function = null) {
        return (await import("./Portrait/PortraitElement.mjs")).PortraitElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            async () => this.#getLoadingElement(),
            await this.#getLabelService(),
            await this.#getPhotoService(),
            portrait,
            async chosen_portrait => post_function(
                {
                    page: PAGE_PORTRAIT,
                    data: chosen_portrait
                }
            ),
            back_function
        );
    }

    /**
     * @param {PreviousStudies} previous_studies
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<PreviousStudiesElement>}
     */
    async #getPreviousStudiesElement(previous_studies, post_function, back_function = null) {
        return (await import("./PreviousStudies/PreviousStudiesElement.mjs")).PreviousStudiesElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            previous_studies,
            async chosen_previous_studies => post_function(
                {
                    page: PAGE_PREVIOUS_STUDIES,
                    data: chosen_previous_studies
                }
            ),
            back_function
        );
    }

    /**
     * @returns {Promise<RequestService>}
     */
    async #getRequestService() {
        this.#request_service ??= (await import("./Request/Port/RequestService.mjs")).RequestService.new(
            await this.#getFluxHttpApi()
        );

        return this.#request_service;
    }

    /**
     * @param {Start} start
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<StartElement>}
     */
    async #getStartElement(start, post_function, back_function = null) {
        return (await import("./Start/StartElement.mjs")).StartElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            await this.#getPasswordService(),
            start,
            async create => post_function(
                {
                    page: PAGE_CREATE,
                    data: create
                }
            ),
            async resume => post_function(
                {
                    page: PAGE_RESUME,
                    data: resume
                }
            ),
            back_function
        );
    }

    /**
     * @param {UniversityEntranceQualification} university_entrance_qualification
     * @param {postFunction} post_function
     * @param {backFunction | null} back_function
     * @returns {Promise<UniversityEntranceQualificationElement>}
     */
    async #getUniversityEntranceQualificationElement(university_entrance_qualification, post_function, back_function = null) {
        return (await import("./UniversityEntranceQualification/UniversityEntranceQualificationElement.mjs")).UniversityEntranceQualificationElement.new(
            await this.#getFluxCssApi(),
            await this.#getFluxLocalizationApi(),
            await this.#getLabelService(),
            university_entrance_qualification,
            async chosen_university_entrance_qualification => post_function(
                {
                    page: PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION,
                    data: chosen_university_entrance_qualification
                }
            ),
            back_function
        );
    }

    /**
     * @param {boolean} previous_get_result
     * @returns {Promise<void>}
     */
    async #next(previous_get_result = false) {
        scroll(0, 0);

        const get_loading_element = await this.#getLoadingElement();

        try {
            if (!previous_get_result || this.#previous_get_result === null) {
                this.#previous_get_result = await (await this.#getRequestService()).get();
            }
        } catch (error) {
            console.error(error);

            this.#previous_get_result = null;

            await this.#main_element.replaceContent(
                await this.#getFormInvalidElement(
                    await this.#flux_localization_api.translate(
                        error instanceof HttpClientResponse ? "Server error!" : "Network error!"
                    )
                )
            );

            return;
        } finally {
            get_loading_element.remove();
        }

        await this.#main_element.replaceContent(
            await this.#getPage(
                this.#previous_get_result,
                async post => {
                    const post_loading_element = await this.#getLoadingElement();

                    let post_result;
                    try {
                        post_result = await (await this.#getRequestService()).post(
                            post
                        );
                    } catch (error) {
                        console.error(error);

                        return {
                            ok: false,
                            "error-messages": [
                                Object.fromEntries(await Promise.all(Object.entries((await this.#flux_localization_api.getLanguages()).all).map(async ([
                                    language
                                ]) => [
                                        language,
                                        await this.#flux_localization_api.translate(
                                            error instanceof HttpClientResponse ? "Server error!" : "Network error!",
                                            null,
                                            null,
                                            language
                                        )
                                    ]
                                )))
                            ]
                        };
                    } finally {
                        post_loading_element.remove();
                    }

                    if (!post_result.ok) {
                        return post_result;
                    }

                    this.#next();

                    return post_result;
                },
                async () => {
                    this.#previous_get_result = null;

                    const back_loading_element = await this.#getLoadingElement();

                    try {
                        await (await this.#getRequestService()).back();
                    } catch (error) {
                        console.error(error);

                        await this.#main_element.replaceContent(
                            await this.#getFormInvalidElement(
                                await this.#flux_localization_api.translate(
                                    error instanceof HttpClientResponse ? "Server error!" : "Network error!"
                                )
                            )
                        );

                        return;
                    } finally {
                        back_loading_element.remove();
                    }

                    this.#next();
                }
            ),
            this.#previous_get_result["menu"],
            async id => {
                this.#previous_get_result = null;

                const logout_loading_element = await this.#getLoadingElement();

                try {
                    await (await this.#getRequestService()).menu(
                        id
                    );
                } catch (error) {
                    console.error(error);

                    await this.#main_element.replaceContent(
                        await this.#getFormInvalidElement(
                            await this.#flux_localization_api.translate(
                                error instanceof HttpClientResponse ? "Server error!" : "Network error!"
                            )
                        )
                    );

                    return;
                } finally {
                    logout_loading_element.remove();
                }

                this.#next();
            },
            this.#previous_get_result["user-name"],
            this.#previous_get_result["can-logout"] ? async () => {
                this.#previous_get_result = null;

                const logout_loading_element = await this.#getLoadingElement();

                try {
                    await (await this.#getRequestService()).logout();
                } catch (error) {
                    console.error(error);

                    await this.#main_element.replaceContent(
                        await this.#getFormInvalidElement(
                            await this.#flux_localization_api.translate(
                                error instanceof HttpClientResponse ? "Server error!" : "Network error!"
                            )
                        )
                    );

                    return;
                } finally {
                    logout_loading_element.remove();
                }

                this.#next();
            } : null
        );
    }
}