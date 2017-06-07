import * as gApi from "googleapis";
import * as gAuth from "google-auth-library";
import { handleCallback, callApi } from "./gdrive";
import { createReadStream } from "fs";

callApi(uploadFile);


function uploadFile(drive) {
    const moodOMeterFolderId = "0B0Cu1R5HusBldjUtUkNsVmNpamc";
    drive.files.create({
        resource: {
            parents: [ moodOMeterFolderId ],
            name: "MoodOMeter1.json"
        },
        media: {
            mimeType: "application/json",
            body: createReadStream(process.cwd() + "/data/moodometer.json")
        }
    }, (err, res) => {
        handleCallback(err, "Uploading file failed");
    });
}
