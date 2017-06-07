import { readFile, writeFile } from "fs";
import * as gAuth from "google-auth-library";
import { readSecrets, handleCallback } from "./gdrive";

const tokenPath = process.cwd() + "/secret/driveApiCode";

readSecrets((credentials) => {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new gAuth();
    var authClient = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    readFile(tokenPath, (err, code) => {
        authClient.getToken(code, (err, token) => {
            handleCallback(err, "Retrieving token failed", token, (token) => {
                writeFile(tokenPath, JSON.stringify(token));
                console.log('Token stored to ' + tokenPath);
            });
        });
    });
});