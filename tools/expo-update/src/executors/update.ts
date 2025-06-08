import { ExecutorContext, names } from '@nx/devkit';
import { ChildProcess, fork } from 'child_process';
import { resolve as pathResolve } from 'path';

import { resolveEas } from '@nx/expo/src/utils/resolve-eas';

import { ExpoEasUpdateOptions } from '@nx/expo/src/executors/update/schema';

export interface ReactNativeUpdateOutput {
  success: boolean;
}

let childProcess: ChildProcess;

export default async function* buildExecutor(
  options: ExpoEasUpdateOptions,
  context: ExecutorContext
): AsyncGenerator<ReactNativeUpdateOutput> {
  const projectRoot =
    context.projectsConfigurations.projects[context.projectName].root;

  try {
    // await installAndUpdatePackageJson(context, {
    //   packages: ['expo-updates'],
    // });
    await runCliUpdate(context.root, projectRoot, options);
    yield { success: true };
  } finally {
    if (childProcess) {
      childProcess.kill();
    }
  }
}

function runCliUpdate(
  workspaceRoot: string,
  projectRoot: string,
  options: ExpoEasUpdateOptions
) {
  return new Promise((resolve, reject) => {
    childProcess = fork(
      resolveEas(workspaceRoot),
      ['update', ...createUpdateOptions(options)],
      { cwd: pathResolve(workspaceRoot, projectRoot), env: process.env }
    );

    // Ensure the child process is killed when the parent exits
    process.on('exit', () => childProcess.kill());
    process.on('SIGTERM', () => childProcess.kill());

    childProcess.on('error', (err) => {
      reject(err);
    });
    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

function createUpdateOptions(options: ExpoEasUpdateOptions) {
  return Object.keys(options).reduce((acc, k) => {
    const v = options[k];
    if (typeof v === 'boolean') {
      if (k === 'interactive') {
        if (v === false) {
          acc.push('--non-interactive');
        }
      } else if (v === true) {
        // when true, does not need to pass the value true, just need to pass the flag in kebob case
        acc.push(`--${names(k).fileName}`);
      }
    } else {
      acc.push(`--${names(k).fileName}`, v);
    }
    return acc;
  }, []);
}

// const runExecutor: PromiseExecutor<UpdateExecutorSchema> = async (options) => {
//   console.log('Executor ran for Update', options);
//   return {
//     success: true,
//   };
// };

// export default runExecutor;
