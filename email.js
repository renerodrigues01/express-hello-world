import formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: 'e7a3be9d34622834fc6d8fdd45936043-bdb2c8b4-d315e8e4',
});
mg.messages
	.create(sandbox71d3bcb70563489bb967479d4fe7574a.mailgun.org, {
		from: "Mailgun Sandbox <postmaster@sandbox71d3bcb70563489bb967479d4fe7574a.mailgun.org>",
		to: ["renerodrigues01@protonmail.com"],
		subject: "Hello",
		text: "Testing some Mailgun awesomness!",
	})
	.then(msg => console.log(msg)) // logs response data
	.catch(err => console.log(err)); // logs any error`;


// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.