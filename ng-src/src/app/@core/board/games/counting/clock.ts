import { ITimer, IStopWatch } from './composition';
import * as moment from 'moment';


export class Clock {

    stop_watch_label = 'Your time';
    timer_label = 'Time to beat';

    constructor() {}


    private getStopWatch() {}

    private positionClock(questionType: string) {}

    addClock(timer: ITimer, stopWatch: IStopWatch, stage: zim.Stage | StageGL) {}
}
