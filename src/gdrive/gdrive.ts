import { request, RequestOptions } from "https";
import { IncomingMessage } from "http";
import { writeFile, readFile } from "fs";
import * as gApi from "googleapis";
import * as gAuth from "google-auth-library";

export function callApi(apiCall: (drive) => void) {
    readSecrets((credentials) => {
        authorize(credentials, apiCall);
    });
}

export function readSecrets(callback: (credentials) => void) {
        readFile(process.cwd() + "/secret/client_secret.json", (err, res) => {
        handleCallback(err, "Loading client secret file failed", res, (res) => {
            const credentials = JSON.parse(res.toString()); 
            callback(credentials);
        });
    });
}

function authorize(credentials, callback) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new gAuth();
    const authClient = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    readFile(process.cwd() + "/secret/token.json", function (err, res) {
        handleCallback(err, "Retrieving token from file failed", res, (res) => {
            authClient.credentials = JSON.parse(res.toString());
            const drive = gApi.drive({ version: "v3", auth: authClient });
            callback(drive);
        });
    });
}

export function handleCallback<T>(err: any, errorPrefix: string)
export function handleCallback<T>(err: any, errorPrefix: string, res: T, onSuccess: string)
export function handleCallback<T>(err: any, errorPrefix: string, res: T, onSuccess: ResultHandler<T>)
export function handleCallback<T>(err: any, errorPrefix: string, res?: T, onSuccess?: string | ResultHandler<T>) {
    if (err) {
        console.log(errorPrefix + ":\n", err);
    } else {
        if (onSuccess) {
            if (typeof onSuccess == "string") {
                console.log(onSuccess + ":\n", res);
            } else {
                onSuccess(res);
            }
        }
    }
}

type ResultHandler<T> = (res: T) => void;
