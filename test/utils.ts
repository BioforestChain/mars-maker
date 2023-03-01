import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";

const blobsTempsRootPath = path.join(process.cwd(), "blobs_temps");

export class Utils {
    getSha256BlobInfo(filePath: string) {
        const sourcePath = path.join(process.cwd(), filePath);
        if (!fs.existsSync(blobsTempsRootPath)) {
            fs.mkdirSync(blobsTempsRootPath, { recursive: true });
        }
        const stat = fs.statSync(sourcePath);
        const hash = crypto.createHash("sha256").update(fs.readFileSync(sourcePath)).digest().toString("hex");
        fs.copyFileSync(sourcePath, path.join(blobsTempsRootPath, hash));
        return { hash, size: stat.size };
    }
}

export const utils = new Utils();
