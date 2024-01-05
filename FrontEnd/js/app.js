import { getWorks } from "./gallery";

// Suppression des travaux existant avec le DOM
document.querySelector("#portfolio").remove();

getWorks();
