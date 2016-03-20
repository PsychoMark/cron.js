cron.js
==========

A port of [Nick Campbell's][ncb000gt] [node-cron](https://github.com/ncb000gt/node-cron) back to [James Padolsey's][jamespadolsey] [cron.js'](http://github.com/padolsey/cron.js) roots to provide the same functionality in browser-based applications. Removed the require calls and the functionality to spawn a new process.

Only tested on Chrome for Windows and Android. Includes TypeScript typings and plays nice with module loaders (tested with RequireJS). If you're manually including the script, be sure to reference the required library [Moment Timezone](http://momentjs.com/timezone/) as well.



Usage (basic cron usage):
==========

```javascript
new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
```


Available Cron patterns:
==========

    Asterisk. E.g. *
    Ranges. E.g. 1-3,5
    Steps. E.g. */2

[Read up on cron patterns here](http://crontab.org). Note the examples in the
link have five fields, and 1 minute as the finest granularity, but this library
has six fields, with 1 second as the finest granularity.

Cron Ranges
==========

When specifying your cron values you'll need to make sure that your values fall within the ranges. For instance, some cron's use a 0-7 range for the day of week where both 0 and 7 represent Sunday. We do not.

 * Seconds: 0-59
 * Minutes: 0-59
 * Hours: 0-23
 * Day of Month: 1-31
 * Months: 0-11
 * Day of Week: 0-6

Another cron example
==========

```javascript
var job = new CronJob('00 30 11 * * 1-5', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  timeZone /* Time zone of this job. */
);
```

Another example with Date
==========

```javascript
var job = new CronJob(new Date(), function() {
  /* runs once at the specified date. */
  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  timeZone /* Time zone of this job. */
);
```

For good measure
==========

```javascript
var job = new CronJob({
  cronTime: '00 30 11 * * 1-5',
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();
```


How to check if a cron pattern is valid:
==========

```javascript
try {
    new CronJob('invalid cron pattern', function() {
        console.log('this should not be printed');
    })
} catch(ex) {
    console.log("cron pattern not valid");
}
```


API
==========

Parameter Based

`CronJob`

  * `constructor(cronTime, onTick, onComplete, start, timezone, context, runOnInit)` - Of note, the first parameter here can be a JSON object that has the below names and associated types (see examples above).
    * `cronTime` - [REQUIRED] - The time to fire off your job. This can be in the form of cron syntax or a JS [Date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) object.
    * `onTick` - [REQUIRED] - The function to fire at the specified time.
    * `onComplete` - [OPTIONAL] - A function that will fire when the job is complete, when it is stopped.
    * `start` - [OPTIONAL] - Specifies whether to start the job just before exiting the constructor. By default this is set to false. If left at default you will need to call `job.start()` in order to start the job (assuming `job` is the variable you set the cronjob to). This does not immediately fire your `onTick` function, it just gives you more control over the behavior of your jobs.
    * `timeZone` - [OPTIONAL] - Specify the timezone for the execution. This will modify the actual time relative to your timezone.
    * `context` - [OPTIONAL] - The context within which to execute the onTick method. This defaults to the cronjob itself allowing you to call `this.stop()`. However, if you change this you'll have access to the functions and values within your context object.
    * `runOnInit` - [OPTIONAL] - This will immediately fire your `onTick` function as soon as the requisit initialization has happened. This option is set to `false` by default for backwards compatability.
  * `start` - Runs your job.
  * `stop` - Stops your job.

`CronTime`

  * `constructor(time)`
    * `time` - [REQUIRED] - The time to fire off your job. This can be in the form of cron syntax or a JS [Date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) object.


Usage:

    new CronJob('* * * * * *', function(){
        console.log('You will see this message every second');
    });

Available Cron patterns:

    Asterisk. E.g. *
    Ranges. E.g. 1-3,5
    Steps. E.g. */2

[Read up on cron patterns here](http://help.sap.com/saphelp_xmii120/helpdata/en/44/89a17188cc6fb5e10000000a155369/content.htm).

Another example:

    new CronJob('00 30 11 * * 2-6', function(){
        // Runs every weekday (Monday through Friday)
        // at 11:30:00 AM. It does not run on Saturday
        // or Sunday.
    });