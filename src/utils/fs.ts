import {BaseDirectory, copyFile, createDir, FileEntry, readDir} from "@tauri-apps/api/fs";
import {homeDir, join} from "@tauri-apps/api/path";

export async function copyDir(src: string, dest: string) {
  const entries = await readDir(src, {dir: BaseDirectory.Home, recursive: true});

  async function processEntries(entries: FileEntry[]) {
    for (const entry of entries) {
      const destPath = entry.path.replace(src, dest)
      if (entry.children) {
        await createDir(destPath, {dir: BaseDirectory.Home});
        await processEntries(entry.children);
      } else {
        console.log('copying', entry.path, destPath)
        await copyFile(entry.path, destPath);
      }
    }
  }

  await processEntries(entries);
}

export async function getFullProjectPath(projectName: string) {
  return await join(await homeDir(), 'JigsawProjects', projectName);
}
