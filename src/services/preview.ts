import {getFullProjectPath} from "../utils/fs.ts";
import {runCommand} from "../utils/shell.ts";
import {WebviewWindow} from "@tauri-apps/api/webviewWindow";

export async function runPreviewService(project: any, abortController: AbortController) {
  const projectFullPath = await getFullProjectPath(project?.name);
  await runCommand("pnpm", ["install"], projectFullPath);

  const pnpmDevCmd = runCommand("pnpm", ["dev"], projectFullPath, abortController.signal);

  const previewWindow = new WebviewWindow('preview-window', {
    url: 'http://localhost:2410',
    height: 600,
    width: 300,
    title: 'Jigsaw Preview',
    userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.105 Mobile Safari/537.36'
  });

  previewWindow.onCloseRequested(() => {
    console.log("Aborting preview")
    abortController.abort();
  });

  previewWindow.once('tauri://created', function () {
    console.log("webview window successfully created");
  })
  previewWindow.once('tauri://error', function () {
    console.log("an error occurred during webview window creation");
  })

  abortController.signal?.addEventListener('abort', () => {
    console.log('closing preview');
    previewWindow.close();
  });

  await pnpmDevCmd;
}
