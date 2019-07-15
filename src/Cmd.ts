import fs from 'fs';
import path from 'path';
import shell from 'shelljs';

export default class Cmd {
  public static exec (command: string) {
    console.log('exec:', command);
    shell.exec(command);
  }

  public static mv (pathDir: string, output: string, options = '-f') {
    shell.mv(options, Cmd.getFiles(pathDir), output);
  }

  public static cd (pathDir: string) {
    console.log('cd:', pathDir);
    shell.cd(pathDir);
  }

  public static mkdir (pathDir: string) {
    if (!fs.existsSync(pathDir)) {
      console.log('mkdir:', pathDir);
      shell.mkdir(pathDir);
    }
  }

  public static rm (pathDir: string, options = '-rf') {
    console.log('rm:', pathDir);
    shell.rm(options, pathDir);
  }

  public static cp (pathDir: string, output: string, options = '-rf') {
    console.log('cp:', pathDir, output);
    shell.cp(options, Cmd.getFiles(pathDir), output);
  }

  private static getFiles (pathDir: string): string[]|string {
    if (fs.lstatSync(pathDir).isDirectory()) {
      return fs.readdirSync(pathDir).map((f) => pathDir + path.sep + f);
    }

    return pathDir;
  }
}
