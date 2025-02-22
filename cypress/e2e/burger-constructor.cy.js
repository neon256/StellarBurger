import { BASE_URL } from "../../src/utils/Api";

const SELECTORS = {
  INGREDIENT: '[id="ing"]',
  MODAL: '[id="modal"]',
  CLOSE_BUTTON: '[id="close"]',
  OVERLAY: '#overlay',
  CONSTRUCTOR: '[id="constructor"]',
  ORDER: 'Оформить заказ',
  ORDER_DETAILS: 'идентификатор заказа',
  INGREDIENT_DETAILS: 'Детали ингредиента',
  ADD_BUN: 'Добавьте булку',
  ADD_INGREDIENT: 'Добавьте ингредиент'
};
const testUrl = "http://localhost:3000"
describe("service is available", function () {

  beforeEach(() => {
    localStorage.setItem("refreshToken", "mockRefreshToken");
    localStorage.setItem("accessToken", "mockAccessToken");
    cy.intercept("GET", `api/auth/user`, { fixture: "user.json" }).as(
      "getUser"
    );
    cy.intercept("GET", `api/ingredients`, {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.visit(`${testUrl}/`);
  });
  it("открытие и закрытие модалки с помощью крестика ", () => {
    cy.get(SELECTORS.INGREDIENT).first().as("ingredientCard");
    cy.get("@ingredientCard").click();
    cy.contains(SELECTORS.INGREDIENT_DETAILS);
    cy.get(SELECTORS.MODAL).should("exist");
    cy.get(SELECTORS.CLOSE_BUTTON).click();
    cy.get(SELECTORS.MODAL).should("not.exist");
  });
  it("открытие и закрытие модалки с помощью обертки ", () => {
    cy.get(SELECTORS.INGREDIENT).first().as("ingredientCard");
    cy.get("@ingredientCard").click();
    cy.contains(SELECTORS.INGREDIENT_DETAILS);
    cy.get(SELECTORS.MODAL).should("exist");
    cy.get(SELECTORS.OVERLAY).click("topLeft");
    cy.get(SELECTORS.MODAL).should("not.exist");
  });
  it("проверка драг энд дроп булки", () => {
    cy.get(SELECTORS.INGREDIENT).first().as("ingredientCard");
    cy.get(SELECTORS.CONSTRUCTOR).as("constructor");
    cy.get("@ingredientCard").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").within(() => {
      cy.contains(SELECTORS.ADD_BUN).should("not.exist");
    });
  });
  it("проверка драг энд дроп ингредиента", () => {
    cy.get(SELECTORS.INGREDIENT).contains("Соус Spicy-X").as("ingredientCard");
    cy.get(SELECTORS.CONSTRUCTOR).as("constructor");
    cy.get("@ingredientCard").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").within(() => {
      cy.contains(SELECTORS.ADD_INGREDIENT).should("not.exist");
    });
  });
  it("Добавляем два ингредиента в конструктор и создаем заказ", () => {
    cy.get(SELECTORS.INGREDIENT).first().as("bun");
    cy.get(SELECTORS.INGREDIENT).contains("Соус Spicy-X").as("souce");
    cy.get(SELECTORS.CONSTRUCTOR).as("constructor");
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@souce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").within(() => {
      cy.contains(SELECTORS.ADD_INGREDIENT).should("not.exist");
      cy.contains(SELECTORS.ADD_BUN).should("not.exist");
    });
    cy.contains(SELECTORS.ORDER).as("order").should("exist");
    cy.get("@order").click();
    cy.get(SELECTORS.MODAL).should("exist");
    cy.contains(SELECTORS.ORDER_DETAILS).should("exist");
  });
});
