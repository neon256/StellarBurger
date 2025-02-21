import { BASE_URL } from "../../src/utils/Api";

describe("service is available", function () {
  beforeEach(() => {
    localStorage.setItem("refreshToken", "mockRefreshToken");
    localStorage.setItem("accessToken", "mockAccessToken");
    cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json" }).as(
      "getUser"
    );
    cy.intercept("GET", `${BASE_URL}/ingredients`, {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.visit("http://localhost:3000");
  });
  it("открытие и закрытие модалки с помощью крестика ", () => {
    cy.get('[id="ing"]').first().as("ingredientCard");
    cy.get("@ingredientCard").click();
    cy.contains("Детали ингредиента");
    cy.get('[id="modal"]').should("exist");
    cy.get('[id="close"]').click();
    cy.get('[id="modal"]').should("not.exist");
  });
  it("открытие и закрытие модалки с помощью обертки ", () => {
    cy.get('[id="ing"]').first().as("ingredientCard");
    cy.get("@ingredientCard").click();
    cy.contains("Детали ингредиента");
    cy.get('[id="modal"]').should("exist");
    cy.get("#overlay").click("topLeft");
    cy.get('[id="modal"]').should("not.exist");
  });
  it("проверка драг энд дроп булки", () => {
    cy.get('[id="ing"]').first().as("ingredientCard");
    cy.get('[id="constructor"]').as("constructor");
    cy.get("@ingredientCard").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").within(() => {
      cy.contains("Добавьте булку").should("not.exist");
    });
  });
  it("проверка драг энд дроп ингредиента", () => {
    cy.get('[id="ing"]').contains("Соус Spicy-X").as("ingredientCard");
    cy.get('[id="constructor"]').as("constructor");
    cy.get("@ingredientCard").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").within(() => {
      cy.contains("Добавьте ингредиент").should("not.exist");
    });
  });
  it("Добавляем два ингредиента в конструктор и создаем заказ", () => {
    cy.get('[id="ing"]').first().as("bun");
    cy.get('[id="ing"]').contains("Соус Spicy-X").as("souce");
    cy.get('[id="constructor"]').as("constructor");
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@souce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@constructor").within(() => {
      cy.contains("Добавьте ингредиент").should("not.exist");
      cy.contains("Добавьте булку").should("not.exist");
    });
    cy.contains("Оформить заказ").as("order").should("exist");
    cy.get("@order").click();
    cy.get('[id="modal"]').should("exist");
    cy.contains("идентификатор заказа").should("exist");
  });
});
