const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const methodOverride = require('method-override');
const helmet = require('helmet');
const hpp = require('hpp');  
const redis = require('redis');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);

dotenv.config();
const redisClient = redis.createClient({
	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
	password: process.env.REDIS_PASSWORD,
});
const pageRouter = require('./routes/page');
const timeRouter = require('./routes/time');
const authRouter = require('./routes/auth');
const dateRouter = require('./routes/date');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const logger = require('./logger');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');
nunjucks.configure('views', {
	express: app,
	watch: true,
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

if(process.env.NODE_ENV === 'production'){
	app.use(morgan('combined'));
	app.use(helmet({ contentSecurityPolicy: false }));
	app.use(hpp());
}
else{
	app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extend:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));


const sessionOption = {
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET,
	cookie: {
	httpOnly: true,
	secure: false,
	},
	store: new RedisStore({ client: redisClient }),
};
if (process.env.NODE_ENV === 'production') {
	sessionOption.proxy = true;
// sessionOption.cookie.secure = true;
}

app.use(methodOverride('_method'));

app.use(session(sessionOption))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/time', timeRouter);
app.use('/auth', authRouter);
app.use('/date', dateRouter);

app.use((req, res, next) => {
 	const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
 	error.status = 404;
	logger.info('hello');
	logger.error(error.message);
 	next(error);
})


app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
	res.status(err.status || 500);
	res.render('error');
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 대기중');
});
