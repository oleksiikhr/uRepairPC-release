import path from 'path';
import Cmd from '../Cmd';
import IRepository from '../IRepository';
import Repository from '../Repository';

export default class Websocket extends Repository implements IRepository {
  public static readonly NAME = 'websocket';

  constructor () {
    super(Websocket.NAME);
  }

  public run () {
    this.shellExecute();
    this.moveChangelog();
    this.createGitIgnore();
  }

  private shellExecute () {
    // Install Dependencies
    Cmd.cd(this.dir);
    Cmd.exec('npm ci');
    Cmd.exec('npm run build');

    // Extract dist + .env + other important files
    Cmd.mkdir(this.outputModuleDir);
    Cmd.mv(this.dir + path.sep + 'dist', this.outputModuleDir);
    Cmd.mv(this.dir + path.sep + '.env.example', this.outputModuleDir);
    Cmd.mv(this.dir + path.sep + 'package.json', this.outputModuleDir);
    Cmd.mv(this.dir + path.sep + 'package-lock.json', this.outputModuleDir);
  }
}
