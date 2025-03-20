const express = require("express");
require('dotenv').config();
const path = require('path');
const database = require("./config/database");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
database.connect();

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");
const routeDoctor = require("./routes/doctor/index.route");
const systemConfig = require("./config/system");
const {authMiddleware} = require("./middlewares/admin/auth.middleware");

const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT;

const flash = require('express-flash');

app.set("view engine", "pug"); // Đặt Pug làm template engine
app.set("views", path.join(__dirname, "views")); // Cấu hình đường dẫn đến thư mục views


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// Flash
app.use(cookieParser('HHKALKS'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash
app.use(authMiddleware);
// parse application/json
app.use(bodyParser.json());

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.static(`${__dirname}/public`));


// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
routeAdmin.index(app);
routeClient.index(app);
routeDoctor.index(app);

app.listen(port, () => {
  console.log(`http://localhost:3000`);
});