import * as gApi from "googleapis";
import * as gAuth from "google-auth-library";
import { handleCallback, callApi } from "./gdrive";

callApi(uploadFile);

function uploadFile(drive) {
    drive.files.create({
        resource: {
            parents: [ "0B0Cu1R5HusBldjUtUkNsVmNpamc" ],
            name: "CAAFlarble",
            mimeType: "text/plain",
        },
        media: {
            mimeType: "text/plain",
            body: "Flarbler2!"
        }
    }, (err, res) => {
        handleCallback(err, "Uploading file failed");
    });
}
