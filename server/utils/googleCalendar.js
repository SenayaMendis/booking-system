const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const credentialsPath = path.join(__dirname, 'credentials.json');
const tokenPath = path.join(__dirname, 'token.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const authorize = () => {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

    if (fs.existsSync(tokenPath)) {
        const token = JSON.parse(fs.readFileSync(tokenPath));
        oAuth2Client.setCredentials(token);
    } else {
        return getAccessToken(oAuth2Client);
    }

    return oAuth2Client;
};

const getAccessToken = (oAuth2Client) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFileSync(tokenPath, JSON.stringify(token));
            console.log('Token stored to', tokenPath);
        });
    });
};

const addEvent = async (event) => {
    const auth = authorize();
    const calendar = google.calendar({ version: 'v3', auth });

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        console.log('Event created: %s', response.data.htmlLink);
    } catch (error) {
        console.error('Error creating event: ', error);
    }
};

module.exports = { addEvent, authorize };