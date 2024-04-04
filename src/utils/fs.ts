import {homeDir, join} from "@tauri-apps/api/path";

const JIGSAW_PROJECTS_DIR_NAME = 'JigsawProjects';

const userHomeDir = await homeDir();

export async function getFullProjectPath(projectName: string) {
    return await join(userHomeDir, JIGSAW_PROJECTS_DIR_NAME, projectName);
}
