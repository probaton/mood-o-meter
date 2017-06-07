import { readFile } from "fs";
import * as gAuth from "google-auth-library";

readFile(process.cwd() + "/secret/client_secret.json", function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    const contentString = content.toString();
    const credentials = JSON.parse(contentString);

    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new gAuth();

    const authUrl = new auth.OAuth2(clientId, clientSecret, redirectUrl).generateAuthUrl({
        access_type: 'offline',
        scope: "https://www.googleapis.com/auth/drive.file"
    });
    console.log("Navigate to the link below to generate an API token for this app\n" + authUrl);
});

