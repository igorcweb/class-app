const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const expressMessages = require('express-messages');
const { SESSION_SECRET } = process.env;

const routes = require('./controllers');
const signup = require('./controllers/signup');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const classes = require('./controllers/api/classes');
const students = require('./controllers/api/students');
const catalogue = require('./controllers/catalogue');
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
