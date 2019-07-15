import Cmd from './Cmd';
import { INPUT_DIR, MOVE_DIR, OUTPUT_DIR } from './config';
import Github from './Github';
import Repositories from './Repositories';
import Server from './repositories/Server';
import Web from './repositories/Web';
import Websocket from './repositories/Websocket';

// Clear and create folders before run app
Cmd.rm(INPUT_DIR);
Cmd.rm(OUTPUT_DIR);
Cmd.mkdir(INPUT_DIR);
Cmd.mkdir(OUTPUT_DIR);

// Clone and extract files to output path
const repositories = new Repositories(
  new Server(), new Web(), new Websocket(),
);
repositories.execRun();

// Move scripts or/and other files to output directory
Cmd.cp(MOVE_DIR, OUTPUT_DIR);

// Push to the main repository
Github.publish();
