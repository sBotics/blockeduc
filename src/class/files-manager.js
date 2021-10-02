let sBoticsFilesManager = require('sbotics-files-manager');

const __sBoticsFilesManager = new sBoticsFilesManager({
    useDirectoryHome: true,
    nameFolderDefault: 'wEduc',
    saveAllFromDefaultDirectory: true,
});

export class FilesManager {
    FindSync(path) {
        try {
            return __sBoticsFilesManager.find(path);
        } catch (error) {
            return false;
        }
    }

    FindAsync(path) {
        return new Promise((resolve, reject) => {
            try {
                __sBoticsFilesManager.find(path, (err, resp) => {
                    if (err) reject(err);
                    else resp ? resolve(true) : reject(false);
                });
            } catch (error) {
                reject(false);
            }
        });
    }

    SaveSync(path, data, format = '') {
        try {
            return __sBoticsFilesManager.save(path, {data: data, format: format});
        } catch (error) {
            return false;
        }
    }

    SaveAsync(path, data, format = '') {
        return new Promise((resolve, reject) => {
            try {
                __sBoticsFilesManager.save(
                    path,
                    {data: data, format: format},
                    (err, resp) => {
                        if (err) reject(false);
                        else resolve(true);
                    },
                );
            } catch (error) {
                reject(false);
            }
        });
    }

    OpenSync(path) {
        try {
            return __sBoticsFilesManager.open(path);
        } catch (error) {
            return false;
        }
    }

    OpenAsync(path) {
        return new Promise((resolve, reject) => {
            try {
                __sBoticsFilesManager.open(path, (err, resp) => {
                    if (err) reject(false);
                    else resolve(resp);
                });
            } catch (error) {
                reject(false);
            }
        });
    }

    FileSizeSync(path) {
        try {
            return __sBoticsFilesManager.stat(path);
        } catch (error) {
            return false;
        }
    }

    CopySync(originalPath, newPath) {
        try {
            return __sBoticsFilesManager.copy(originalPath, {newPath: newPath});
        } catch (error) {
            return false;
        }
    }

    ExtractSync(path) {
        try {
            return __sBoticsFilesManager.extractZip(path);
        } catch (error) {
            return false;
        }
    }
}

