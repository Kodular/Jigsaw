import {getFullProjectPath} from "../utils/fs.ts";
import {runCommand} from "../utils/shell.ts";
import {WebviewWindow} from "@tauri-apps/api/webviewWindow";
import {Project} from "../models/Project.ts";

export async function runPreviewService(project: Project, abortController: AbortController) {
    const projectFullPath = await getFullProjectPath(project.name);
    await runCommand("pnpm", ["install"], projectFullPath);

    const pnpmDevCmd = runCommand("npm", ["run", "dev"], projectFullPath, abortController.signal);

    const previewWindow = new WebviewWindow('preview-window', {
        url: 'http://localhost:2410',
        height: 600,
        width: 300,
        title: 'Jigsaw Preview',
        userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.105 Mobile Safari/537.36'
    });

    const unlisten = await previewWindow.onCloseRequested(() => {
        console.log("Aborting preview")
        abortController.abort();
    });

    previewWindow.once('tauri://created', () => {
        console.log("webview window successfully created");
    })

    previewWindow.once('tauri://error', () => {
        console.log("an error occurred during webview window creation");
        abortController.abort();
    })

    abortController.signal?.addEventListener('abort', () => {
        console.log('closing preview');
        unlisten();
        previewWindow.close();
    }, {
        once: true
    });

    await pnpmDevCmd;

    unlisten();
}
