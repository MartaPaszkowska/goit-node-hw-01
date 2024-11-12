const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getData() {
	try {
		const data = await fs.readFile(contactsPath);
		return JSON.parse(data.toString());
	} catch (error) {
		console.error("Błąd:", error.message);
	}
}

async function editionData(contacts) {
	try {
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	} catch (error) {
		console.error("Błąd:", error.message);
	}
}

async function listContacts() {
	try {
		const contacts = await getData();
		console.log("Lista kontaktów:", contacts);
	} catch (error) {
		console.error("Błąd podczas listowania kontaktów:", error.message);
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await getData();
		const contact = contacts.find((c) => c.id === contactId);
		if (!contact) {
			console.log("Nie znaleziono kontaktu o podanym ID");
		}
		console.log("Pobrany kontakt:", contact);
	} catch (error) {
		console.error("Błąd podczas pobierania kontaktu:", error.message);
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await getData();
		const updatedContacts = contacts.filter((c) => c.id !== contactId);
		editionData(updatedContacts);
		console.log("Usunięto kontakt");
	} catch (error) {
		console.error("Błąd podczas usuwania kontaktu:", error.message);
	}
}

async function addContact(name, email, phone) {
	try {
		const contacts = await getData();
		const newContact = {
			id: Date.now().toString(),
			name,
			email,
			phone,
		};
		contacts.push(newContact);
		editionData(contacts);
		console.log("Dodano nowy kontakt:", newContact);
	} catch (error) {
		console.error("Błąd podczas dodawania kontaktu:", error.message);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
