import * as gApi from "googleapis";
import * as gAuth from "google-auth-library";
import { handleCallback, callApi } from "./gdrive";

callApi(uploadFile);

function uploadFile(drive) {
    drive.files.create({
        parents: [{ id: "0B0Cu1R5HusBlajVaUG1ia2l1Q1k" }],
        resource: {
            name: "BAAFlarble",
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
