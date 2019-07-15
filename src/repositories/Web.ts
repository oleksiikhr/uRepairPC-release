import path from 'path';
import Cmd from '../Cmd';
import { OUTPUT_DIR } from '../config';
import IRepository from '../IRepository';
import Repository from '../Repository';

export default class Web extends Repository implements IRepository {
  public static readonly NAME = 'web';

  constructor () {
    super(Web.NAME);
  }

  public run () {
    this.shellExecute();
    this.moveChangelog();
  }

  private shellExecute () {
    Cmd.cd(this.dir);
    Cmd.exec('npm ci');
    Cmd.exec('npm run build');

    // Move dist
    Cmd.mv(this.dir + path.sep + 'dist', OUTPUT_DIR + path.sep + 'public');
  }
}
