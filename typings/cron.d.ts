declare module "cron"
{
    interface CronJobStatic
    {
        new(cronTime: string|Date, onTick: () => void, onComplete?: () => void, startNow?: boolean, timeZone?: string, context?: any, runOnInit?: boolean): CronJob;
    }

    interface CronJob
    {
        start(): void;
        stop(): void;
    }

    export var CronJob: CronJobStatic;


    interface CronTimeStatic
    {
        new(source: string|Date, zone?: string): CronTime;
    }

    interface CronTime {}
    export var CronTime: CronTimeStatic;
}