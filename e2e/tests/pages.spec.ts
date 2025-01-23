import { expect } from "@playwright/test";
import { test } from "../fixtures/app-fixtures";

test("Landing Page- has title", async ({ page }) => {
	await page.goto("http://localhost:3001/");

	await expect(
		page.getByRole("heading", { name: "Welcome to Bun React CSR App" })
	).toBeVisible();
});

test("All Contacts Page- has title", async ({ page }) => {
	await page.goto("http://localhost:3001/contacts");

	await expect(
		page.getByRole("heading", { name: "All Contacts" })
	).toBeVisible();
});

test("Contact Details Page- has title", async ({ page }) => {
	await page.goto("http://localhost:3001/contacts/97");

	await expect(
		page.getByRole("heading", { name: "Contact Details for: 97" })
	).toBeVisible();
});
