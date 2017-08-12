/**
 * Created by user on 2017/8/10/010.
 */

import * as gulp from 'gulp';

// @see https://stackoverflow.com/questions/27161903/how-to-get-task-name-inside-task-in-gulp

gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function (task)
{
	this.currentTask = task;
	this.__runTask(task);
};

export default gulp;

export function thisTaskName(who): string
{
	return who.seq.slice(-1)[0];
}
