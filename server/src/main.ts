import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts";

const app: Express = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../client/dist")));
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction){
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", 
    "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
})

// GET mailboxes
app.get("/mailboxes",
    async(inRequest: Request, inResponse: Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
            inResponse.json(mailboxes)
        } catch(inError) {
            inResponse.send("error");
        }
    }
);

//GET a list of messages in a specific mailbox
app.get("/mailboxes/:mailbox",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
            const messages: IMAP.IMessage [] = await imapWorker.listMessages({
                mailbox: inRequest.params.mailbox
            });
            inResponse.json(messages);
        } catch (inError) {
            inResponse.send("error");
        }
    });

// Get a Message
app.get("/messages/:mailbox/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
            const messageBody: string = await imapWorker.getMessageBody({
                mailbox: inRequest.params.mailbox,
                id: parseInt(inRequest.params.id, 10)
            });
            inResponse.send(messageBody);
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

// Delete a Message
app.delete("/messages/:mailbox/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            await imapWorker.deleteMessage({
                mailbox: inRequest.params.mailbox,
                id: parseInt(inRequest.params.id, 10)
            });
            inResponse.send("ok");
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

// Send [POST] a message
app.post("/messages",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
            await smtpWorker.sendMessage(inRequest.body);
            inResponse.send("ok");
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

// GET list contacts
app.get("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const contactWorker: Contacts.Worker = new Contacts.Worker();
            const contacts: IContact[] = await contactWorker.listContacts();
            inResponse.json(contacts);
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

// Add Contacts
app.post("/contacts", 
    async(inRequest: Request, inResponse: Response) => {
        try {
            const contactWorker: Contacts.Worker = new Contacts.Worker();
            const contact: IContact = await contactWorker.addContact(inRequest.body);
            inResponse.json(contact);
            
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

// Delete Contact
app.delete("/contacts/:id",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            await contactsWorker.deleteContact(inRequest.params.id);
            inResponse.send("ok");
        } catch (inError) {
            inResponse.send("error")
        }
    }
);

// Start app listening.
app.listen(80, () => {
    console.log("MailBag server open for requests");
  });