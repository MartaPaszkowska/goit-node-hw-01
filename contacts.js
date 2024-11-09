const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data.toString());
		console.log("Lista kontaktów:", contacts);
	} catch (error) {
		console.error("Błąd podczas listowania kontaktów:", error.message);
	}
}

async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data.toString());
		const contact = contacts.find((c) => c.id === contactId);
		if (!contact) {
			console.log("Nie znaleziono kontaktu o podanym ID");
		}
		return contact;
	} catch (error) {
		console.error("Błąd podczas pobierania kontaktu:", error.message);
	}
}

async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data.toString());
		const updatedContacts = contacts.filter((c) => c.id !== contactId);
		await fs.writeFile(
			contactsPath,
			JSON.stringify(updatedContacts, null, 2)
		);
		console.log("Usunięto kontakt");
	} catch (error) {
		console.error("Błąd podczas usuwania kontaktu:", error.message);
	}
}

async function addContact(name, email, phone) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data.toString());
		const newContact = {
			id: Date.now().toString(),
			name,
			email,
			phone,
		};
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
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
