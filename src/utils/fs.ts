import {homeDir, join} from "@tauri-apps/api/path";

export async function getFullProjectPath(projectName: string) {
  return await join(await homeDir(), 'JigsawProjects', projectName);
}
