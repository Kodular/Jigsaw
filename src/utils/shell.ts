import {Command} from "@tauri-apps/api/shell";
import {platform} from '@tauri-apps/api/os';

export async function runCommand(program: string, args: string[], cwd: string, logsFn: (line: string) => void) {
  const platformName = await platform();

  let command;
  if (platformName === 'win32') {
    command = new Command('cmd', ['/C', `${program} ${args.join(' ')}`], {cwd});
  } else {
    command = new Command(program, args, {cwd});
  }
  command.on('close', data => tee([logsFn, console.log], `command finished with code ${data.code} and signal ${data.signal}`));
  command.on('error', error => tee([logsFn, console.error], `command error: "${error}"`));
  command.stdout.on('data', line => tee([logsFn, console.log], `command stdout: "${line}"`));
  command.stderr.on('data', line => tee([logsFn, console.log], `command stderr: "${line}"`));

  const child = await command.spawn();
  console.log('pid:', child.pid);
  // TODO: wait for the command to finish
}

function tee(fns: any[], line: string) {
  for (const fn of fns) {
    fn(line);
  }
}
