import { javascriptGenerator } from "blockly/javascript";
import { exists, BaseDirectory, createDir, copyFile, readDir } from '@tauri-apps/api/fs';
import { homeDir, join } from "@tauri-apps/api/path";
import { metadata } from "tauri-plugin-fs-extra-api";

const JIGSAW_PROJECTS_DIR = './JigsawProjects'
const PROJECT_NAME = 'Todolist'
const TEMPLATE_DIR = 'jigsaw-template'

export async function generateAppCode(workspace) {
    var code = javascriptGenerator.workspaceToCode(workspace);
    let code_template = `<script setup>
import { IonApp, IonButton, IonInput, IonText } from '@ionic/vue';

${code}`

    const home = await homeDir()

    const templatePath = await join(JIGSAW_PROJECTS_DIR, TEMPLATE_DIR);
    const projectPath = await join(JIGSAW_PROJECTS_DIR, PROJECT_NAME);

    // Check if the template exists
    const t = await exists(templatePath, { dir: BaseDirectory.Home });

    if (!t) {
        console.log('Template does not exist, creating');
        await createDir(templatePath, { dir: BaseDirectory.Home });
    }

    // Check if the project dir exists
    const r = await exists(projectPath, { dir: BaseDirectory.Home });

    if (!r) {
        console.log('Project does not exist, creating');
        await createDir(projectPath, { dir: BaseDirectory.Home });
    }

    // Check if the project dir is empty
    const e = await readDir(projectPath, { dir: BaseDirectory.Home });

    if (e.length == 0) {
        console.log('Project is empty, copying template');
        await copyDir(templatePath, projectPath)
    }

    console.log('Project exists, skipping creation');

    return { [projectPath]: r };
}

async function copyDir(src, dest) {
    const entries = await readDir(src, { dir: BaseDirectory.Home, recursive: true });

    async function processEntries(entries) {
        for (const entry of entries) {
            const destPath = entry.path.replace(src, dest)
            if (entry.children) {
                await createDir(destPath, { dir: BaseDirectory.Home });
                await processEntries(entry.children);
            } else {
                console.log('copying', entry.path, destPath)
                await copyFile(entry.path, destPath);
            }
        }
    }

    await processEntries(entries);
}
