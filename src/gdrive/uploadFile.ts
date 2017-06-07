import * as gApi from "googleapis";
import * as gAuth from "google-auth-library";
import { handleCallback, callApi } from "./gdrive";
import { createReadStream } from "fs";

export function uploadJsonToGDrive(fileName, filePath) {
    callApi((drive) => {
        uploadJson(drive, fileName, filePath); 
    });
}

function uploadJson(drive, fileName, filePath) {
    const moodOMeterFolderId = "0B0Cu1R5HusBldjUtUkNsVmNpamc";
    drive.files.create({
        resource: {
            parents: [ moodOMeterFolderId ],
            name: fileName
        },
        media: {
            mimeType: "application/json",
            body: createReadStream(filePath + fileName)
        }
    }, (err, res) => {
        handleCallback(err, "Uploading file failed");
    });
}
