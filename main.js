import { generateReturnsArray } from "./src/investmentGoals";

const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form");
// const calculateButton = document.getElementById("calculate-results");

function renderProgression(evt) {
    evt.preventDefault();

    if (document.querySelector(".error")) {
        return;
    }
    // const startingAmount = Number(form["startingAmount"].value);
    const startingAmount = Number(
        document.getElementById("starting-amount").value.replace(",", ".")
    );
    const additionalContribution = Number(
        document
            .getElementById("additional-contribution")
            .value.replace(",", ".")
    );

    const timeAmount = Number(document.getElementById("time-amount").value);
    const timeAmountPeriod =
        document.getElementById("time-amount-period").value;
    const returnRate = Number(
        document.getElementById("return-rate").value.replace(",", ".")
    );
    const taxRate = Number(
        document.getElementById("tax-rate").value.replace(",", ".")
    );
    const returnRatePeriod = document.getElementById("evaluation-period").value;

    const returnsArray = generateReturnsArray(
        startingAmount,
        timeAmount,
        timeAmountPeriod,
        additionalContribution,
        returnRate,
        returnRatePeriod
    );

    console.log(returnsArray);
}

function clearForm() {
    // Limpa os valores dos campos do formulário
    form["starting-amount"].value = "";
    form["additional-contribution"].value = "";
    form["time-amount"].value = "";
    form["return-rate"].value = "";
    form["tax-rate"].value = "";

    const errorInputs = document.querySelectorAll(".error");

    for (const errorInput of errorInputs) {
        errorInput.classList.remove("error");

        const errorMessage =
            errorInput.parentElement.querySelector("p.text-red-500");
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

function validateInput(evt) {
    if (evt.target.value === "") {
        return;
    }
    const { parentElement } = evt.target;
    const grandParentElement = evt.target.parentElement.parentElement;
    const inputValue = evt.target.value.replace(",", ".");

    if (
        (!parentElement.classList.contains("error") && isNaN(inputValue)) ||
        Number(inputValue) <= 0
    ) {
        const errorTextElement = document.createElement("p");
        errorTextElement.classList.add("text-red-500");
        errorTextElement.innerText =
            "Insira um valor numérico e maior que zero.";

        parentElement.classList.add("error");
        grandParentElement.appendChild(errorTextElement);
    } else if (
        parentElement.classList.contains("error") &&
        !isNaN(inputValue) &&
        Number(inputValue) > 0
    ) {
        parentElement.classList.remove("error");
        grandParentElement.querySelector("p").remove();
    }
}

for (const formElement of form) {
    if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
        formElement.addEventListener("blur", validateInput);
    }
}

form.addEventListener("submit", renderProgression);
clearFormButton.addEventListener("click", clearForm);
