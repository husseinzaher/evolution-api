const  axios = require("axios");


export async function whatsappEvents(session, socket) {

    // the process function lets you process all events that just occurred
    // efficiently in a batch
    socket.ev.process(
        // events is a map for event name => event data
        async (events) => {
            // something about the connection changed
            // maybe it closed, or we received all offline message or connection opened
            if (events['connection.update']) {
                const update = events['connection.update'];
                await callWebHook(session, 'connection.update', update);
            }

            if (events['labels.association']) {
                await callWebHook(session, 'labels.association', events['labels.association']);
            }

            if (events['labels.edit']) {
                await callWebHook(session, 'labels.edit', events['labels.edit']);
            }

            if (events.call) {
                await callWebHook(session, 'call', events.call);
            }

            // history received
            if (events['messaging-history.set']) {
                await callWebHook(session, 'messaging-history.set', events['messaging-history.set']);
                const {chats, contacts, messages, isLatest} =
                    events['messaging-history.set'];
                console.log(
                    `recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest})`,
                );
            }

            // received a new message
            if (events['messages.upsert']) {
                await callWebHook(session, 'messages.upsert', events['messages.upsert']);
            }

            // messages updated like status delivered, message deleted etc.
            if (events['messages.update']) {
                await callWebHook(session, 'messages.update', events['messages.update']);
            }

            if (events['message-receipt.update']) {
                await callWebHook(session, 'message-receipt.update', events['message-receipt.update']);
            }

            if (events['messages.reaction']) {
                await callWebHook(session, 'messages.reaction', events['messages.reaction']);
                console.log(events['messages.reaction']);
            }

            if (events['presence.update']) {
                await callWebHook(session, 'presence.update', events['presence.update']);
                console.log(events['presence.update']);
            }

            if (events['chats.update']) {
                await callWebHook(session, 'chats.update', events['chats.update']);
                console.log(events['chats.update']);
            }

            if (events['contacts.update']) {
                await callWebHook(session, 'contacts.update', events['contacts.update']);
            }

            if (events['chats.delete']) {
                await callWebHook(session, 'chats.delete', events['chats.delete']);
                console.log('chats deleted ', events['chats.delete']);
            }
        },
    );
    return socket;

}

async function callWebHook(
    session,
    event,
    data
) {
    const webhook = `https://api.apploxa.com/hook/whatsapp/callback?session=${session}&event=${event}`;
    if (webhook) {
        await axios
            .post(webhook, data)
            .then(() => {

            })
            .catch((e) => {
                console.log('Error calling Webhook.', e);
            });
    }
}
