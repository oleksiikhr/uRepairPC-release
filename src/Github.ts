import Cmd from './Cmd';
import { INPUT_DIR, ORG_NAME, OUTPUT_DIR } from './config';

export default class Github {
  public static readonly URL = 'https://github.com';
  public static readonly BRANCH = 'preview';

  public static publish (): void {
    const msg = new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    Cmd.cd(OUTPUT_DIR);
    Cmd.exec('git init');
    Cmd.exec('git add .');
    Cmd.exec(`git commit -m ${msg}`);
    Cmd.exec(`git push --force git@github.com:${ORG_NAME}/${ORG_NAME}.git master:${Github.BRANCH}`);
  }

  public repositoryName: string;

  constructor (repositoryName: string) {
    this.repositoryName = repositoryName;
  }

  public clone (): void {
    Cmd.cd(INPUT_DIR);
    Cmd.exec(`git clone ${Github.URL}/${ORG_NAME}/${this.repositoryName}.git`);
  }
}
