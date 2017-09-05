/**
 * Created by user on 2017/8/13/013.
 */

import * as path from 'path';

export const project_root = path.join(__dirname);

export const dist_root = path.join(project_root, 'dist');
export const temp_root = path.join(project_root, 'test/temp');

export const gw2taco_path = path.join(project_root, 'vendor/GW2TacO_030r');

export default module.exports;

export const RUNTIME_PREFIX = 'SC_';
export const RUNTIME_PREFIX_TEMP = 'ZZZ_SC_';
