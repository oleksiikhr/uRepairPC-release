import Cmd from './Cmd';
import { INPUT_DIR, ORG_NAME, OUTPUT_DIR } from './config';

export default class Github {
  public static readonly URL = 'https://github.com';

  public static publish (): void {
    const msg = new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    Cmd.cd(OUTPUT_DIR);
    Cmd.exec('git init');
    Cmd.exec(`git remote add origin ${Github.URL}/${ORG_NAME}/${ORG_NAME}.git`);
    Cmd.exec('git add .');
    Cmd.exec(`git commit -m ${msg}`);
    Cmd.exec('git push -uf origin master:preview');
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
