import {javascriptGenerator} from "blockly/javascript";
import {BaseDirectory, createDir, exists, writeTextFile} from '@tauri-apps/api/fs';
import {dirname, join} from "@tauri-apps/api/path";
import Blockly from "blockly";

const JIGSAW_PROJECTS_DIR = './JigsawProjects'
const PROJECT_NAME = 'Todolist'

export async function generateAppCode(workspace: Blockly.Workspace) {
  const code = javascriptGenerator.workspaceToCode(workspace);

  const projectPath = await join(JIGSAW_PROJECTS_DIR, PROJECT_NAME);

  // Check if the project dir exists
  const r = await exists(projectPath, {dir: BaseDirectory.Home});

  if (!r) {
    console.log('Project does not exist, creating');
    await createDir(projectPath, {recursive: true, dir: BaseDirectory.Home});
  }

  console.log('Writing project files');

  await writeProjectFiles(projectPath, code);

  return {[projectPath]: r};
}

async function writeProjectFiles(projectPath: string, code: string) {
  // Based off https://github.com/ionic-team/starters/tree/main/vue-vite/base
  const files = {
    // language=Vue
    'src/App.vue': `
      <script setup>
        import {IonApp, IonButton, IonInput, IonText} from '@ionic/vue';

        ${code}
    `,
    'src/main.js': '',
    'index.html': `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8"/>
        <title>Ionic App</title>

        <base href="/"/>

        <meta name="color-scheme" content="light dark"/>
        <meta
                name="viewport"
                content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no"/>
        <meta name="msapplication-tap-highlight" content="no"/>

        <link rel="shortcut icon" type="image/png" href="/favicon.png"/>

        <!-- add to homescreen for ios -->
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-title" content="Ionic App"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    </head>
    <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
    </body>
    </html>
    `,
    'package.json': {
      name: PROJECT_NAME,
      version: '0.0.1',
      private: true,
      type: "module",
      scripts: {
        "start": "vite",
        "build": "vite build"
      },
      dependencies: {
        "@ionic/vue": "^7.0.0",
        "@ionic/vue-router": "^7.0.0",
        "ionicons": "^7.0.0",
        "vue": "^3.3.0",
        "vue-router": "^4.2.0"
      },
      devDependencies: {
        "@vitejs/plugin-vue": "^4.0.0",
        "vite": "^5.0.0",
      }
    }
  }

  for (const [file, content] of Object.entries(files)) {
    // overwrite the file using tauri apis
    const fileContent = typeof content === 'string' ? content : JSON.stringify(content);
    let filePath = await join(projectPath, file);
    let parentPath = await dirname(filePath);

    console.log(filePath, parentPath);

    await createDir(parentPath, {dir: BaseDirectory.Home, recursive: true});
    await writeTextFile(
      filePath,
      fileContent,
      {dir: BaseDirectory.Home}
    );
  }
}
