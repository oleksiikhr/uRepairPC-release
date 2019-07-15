import fs from 'fs';
import path from 'path';
import Cmd from './Cmd';
import { INPUT_DIR, OUTPUT_DIR } from './config';
import Github from './Github';
import IRepository from './IRepository';

export default abstract class Repository implements IRepository {
  public github: Github;
  public dir: string;
  public outputModuleDir: string;

  constructor (repositoryName: string) {
    this.github = new Github(repositoryName);
    this.dir = INPUT_DIR + path.sep + repositoryName;
    this.outputModuleDir = OUTPUT_DIR + path.sep + 'modules' + path.sep + repositoryName;
  }

  public moveChangelog (fromPath = this.dir + path.sep + 'CHANGELOG.md'): void {
    const output = OUTPUT_DIR + path.sep + 'changelog' + path.sep + 'CHANGELOG_'
      + this.github.repositoryName.toUpperCase() + '.md';
    Cmd.mv(fromPath, output);
  }

  public createGitIgnore (filePath = this.outputModuleDir + path.sep + '.gitignore'): void {
    let ignore = '';
    Array('node_modules/', '.idea/', '.env')
      .forEach((i) => ignore += i + '\n');

    fs.writeFileSync(filePath, ignore, { encoding: 'utf8' });
  }

  public abstract run (): void;
}
