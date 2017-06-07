import * as gApi from "googleapis";
import * as gAuth from "google-auth-library";
import { handleCallback, callApi } from "./gdrive";

callApi(searchFiles);

function searchFiles(drive) {
    const files = drive.files.list({
        // q: "title='marple'"
    }, (err, res) => {
        handleCallback(err, "Searching files failed", res, "Upload file result");
    });
}
