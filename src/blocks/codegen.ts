import {javascriptGenerator} from "blockly/javascript";
import {BaseDirectory, createDir, writeTextFile} from '@tauri-apps/api/fs';
import {dirname, join} from "@tauri-apps/api/path";
import Blockly from "blockly";

const JIGSAW_PROJECTS_DIR = './JigsawProjects'

export async function generateAppCode(projectName: string, workspace: Blockly.Workspace) {
  const code = javascriptGenerator.workspaceToCode(workspace);

  const projectPath = await join(JIGSAW_PROJECTS_DIR, projectName);

  console.log('Writing project files');

  await writeProjectFiles(projectName, projectPath, code);
}

async function writeProjectFiles(projectName: string, projectPath: string, code: string) {
  // Based off https://github.com/ionic-team/starters/tree/main/vue-vite/base
  const files = {
    // language=Vue
    'src/App.vue': `
      <script setup>
        import {IonApp, IonButton, IonInput, IonText} from '@ionic/vue';

        ${code}
    `,
    'src/main.js': `
import { createApp } from 'vue'
import App from './App.vue'
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

window.addEventListener('unhandledrejection', (err) => {
  throw new Error(err.reason);
});

const app = createApp(App);
app.use(IonicVue, { hardwareBackButton: true });
app.mount('#app');
    `,
    'index.html': `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8"/>
        <title>${projectName}</title>

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
      name: projectName,
      version: '0.0.0',
      private: true,
      type: "module",
      scripts: {
        "dev": "vite",
        "build": "vite build"
      },
      dependencies: {
        "@ionic/vue": "^7.0.0",
        "ionicons": "^7.0.0",
        "vue": "^3.4.21",
        "vue-router": "^4.3.0"
      },
      devDependencies: {
        "@vitejs/plugin-vue": "^5.0.4",
        "vite": "^5.1.5",
      }
    },
    'vite.config.js': `
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 2410
  },
  preview: {
    port: 2410,
    strictPort: true
  }
})
`
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
