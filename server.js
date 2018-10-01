import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import expressMessages from 'express-messages';
const { SESSION_SECRET } = process.env;

import routes from './controllers';
import signup from './controllers/signup';
import login from './controllers/login';
import logout from './controllers/logout';
import classes from './controllers/api/classes';
import students from './controllers/api/students';
import catalogue from './controllers/catalogue';

//Express native body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = expressMessages(req, res);
  next();
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use(routes);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/api/classes', classes);
app.use('/api/students', students);
app.use('/catalogue', catalogue);

app.listen(PORT, () => {
  console.log('class-app is listening on port', PORT);
});
