import path from 'path';
import Cmd from '../Cmd';
import { OUTPUT_DIR } from '../config';
import IRepository from '../IRepository';
import Repository from '../Repository';

export default class Server extends Repository implements IRepository {
  public static readonly NAME = 'server';

  constructor () {
    super(Server.NAME);
  }

  public run () {
    this.shellExecute();
    this.moveChangelog(OUTPUT_DIR + path.sep + 'CHANGELOG.md');
  }

  private shellExecute () {
    Cmd.cd(this.dir);
    Cmd.mv(this.dir, OUTPUT_DIR);

    // Mkdir
    Cmd.mkdir(OUTPUT_DIR + path.sep + 'modules');
    Cmd.mkdir(OUTPUT_DIR + path.sep + 'changelog');

    // Remove unused folder/files
    Cmd.rm(OUTPUT_DIR + path.sep + '.git');
    Cmd.rm(OUTPUT_DIR + path.sep + 'package.json');
    Cmd.rm(OUTPUT_DIR + path.sep + 'phpunit.xml');
    Cmd.rm(OUTPUT_DIR + path.sep + '.styleci.yml');
    Cmd.rm(OUTPUT_DIR + path.sep + 'tests');
  }
}
