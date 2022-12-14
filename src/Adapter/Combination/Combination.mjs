/** @typedef {import("../Label/Label.mjs").Label} Label */
/** @typedef {import("./Mandatory.mjs").Mandatory} Mandatory */
/** @typedef {import("./MultipleChoice.mjs").MultipleChoice} MultipleChoice */
/** @typedef {import("./SingleChoice.mjs").SingleChoice} SingleChoice */
/** @typedef {import("../Subject/Subject.mjs").Subject} Subject */

/**
 * @typedef {{id: string, label: Label, ects: number[], mandatory: Mandatory[] | null, "single-choice": SingleChoice[] | null, "multiple-choice": MultipleChoice[] | null}} Combination
 */
