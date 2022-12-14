/** @typedef {import("../AreaCode/AreaCode.mjs").AreaCode} AreaCode */
/** @typedef {import("../Country/Country.mjs").Country} Country */
/** @typedef {import("./FilledPersonalData.mjs").FilledPersonalData} FilledPersonalData */
/** @typedef {import("../Language/Language.mjs").Language} Language */
/** @typedef {import("../Place/PlaceWithPostalCode.mjs").PlaceWithPostalCode} PlaceWithPostalCode */
/** @typedef {import("../Salutation/Salutation.mjs").Salutation} Salutation */

/**
 * @typedef {{salutations: Salutation[], "registration-number-format": string, "registration-number-example": string, countries: Country[], "extra-address-line-example": string, "min-house-number": number, "max-house-number": number, "min-postal-code": number, "max-postal-code": number, places: PlaceWithPostalCode[], "area-codes": AreaCode[], "required-phone": boolean, "required-phone-home": boolean, "required-phone-mobile": boolean, "required-phone-business": boolean, "required-email": boolean, languages: Language[], "min-birth-date": string, "max-birth-date": string, "old-age-survivar-insurance-number-format": string, "old-age-survivar-insurance-number-example": string, values: FilledPersonalData | null}} PersonalData
 */
