import * as gApi from "googleapis";
import * as gAuth from "google-auth-library";
import { handleCallback, callApi } from "./gdrive";

callApi(uploadFolder);

function uploadFolder(drive) {
    drive.files.create({
        resource: {
            title: "MoodOMeter",
            mimeType: "application/vnd.google-apps.folder",
        },
        media: {
            title: "MoodOMeter",
            name: "stuffles"
        },
        fields: "id"
    }), (err, res) => {
        handleCallback(err, "Folder upload failed", res, "Upload folder result");
    }
}
