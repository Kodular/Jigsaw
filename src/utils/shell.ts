import {Command} from "@tauri-apps/plugin-shell";
import {platform} from '@tauri-apps/plugin-os';

export async function runCommand(program: string, args: string[], cwd: string, abortSignal?: AbortSignal) {
  return new Promise(async (resolve, reject) => {
    const platformName = await platform();

    let command;
    if (platformName === 'windows') {
      command = Command.create('cmd', ['/C', `${program} ${args.join(' ')}`], {cwd});
    } else {
      command = Command.create(program, args, {cwd});
    }

    command.on('close', data => resolve(data));
    command.on('error', error => reject(error));
    command.stdout.on('data', line => console.info(`stdout: ${line.trim()}`));
    command.stderr.on('data', line => console.error(`stderr: ${line.trim()}`));

    const child = await command.spawn();
    console.log('pid:', child.pid);

    abortSignal?.addEventListener('abort', () => {
      console.log('aborting command', child.pid);
      child.kill();
    });
  });
}
