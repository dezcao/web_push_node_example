var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var push = require('web-push');
var { readFile, writeFile } = require('node:fs/promises');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

process.env.ROOT = __dirname;

// VAPID write
async function setVapid() {
  try {    
    const filePath = path.join(__dirname, 'VAPID.json');
    // const filePath = new URL(`${__dirname}/VAPID.json`);
    const contents = await readFile(filePath, { encoding: 'utf8' });
    if (contents) {
      const existKeys = JSON.parse(contents);
      console.log('this is key json ', existKeys);
      process.env.VAPID_PUBLICKEY = existKeys.publicKey;
      process.env.VAPID_PRIVATEKEY = existKeys.privateKey;
    } else {
      let vapidKeys = push.generateVAPIDKeys();
      push.setGCMAPIKey(vapidKeys);
      push.setVapidDetails(
        'mailto:example@yourdomain.org',
        vapidKeys.publicKey,
        vapidKeys.privateKey
      );
      // const data = new Uint8Array(Buffer.from('Hello Node.js'));
      await writeFile('VAPID.json', JSON.stringify(vapidKeys));
    }
  } catch (error) {
    console.error(error);
  }
  
}
setVapid(); // 서버가 시작할때 키를 만든다. 있으면 안만든다.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// service-worker 참조할곳
// https://serviceworke.rs/push-payload_service-worker_doc.html