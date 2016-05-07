/**
 * Created by Jose on 05/05/2016.
 */
    var express=require('express');
    var sequelize=require('sequelize');
    var bodyparser=require('body-parser');
    var mysql=require('mysql');
    var morgan=require('morgan');
    var puerto = 3300;
    var app = express();

    var sequelize = new Sequelize('db_TravelMarket','root','', {
        host: 'localhost',
        dialect: 'mysql',
        pool:{
            max:20,
            min: 0
        }
    });

    /*
        modelos
     */
    var Usuario = sequelize.define('usuario', {
        id_usuario: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        correo: {type: Sequelize.STRING, allowNull: false},
        telefono: {type: Sequelize.INTEGER, allowNull: false},
        nick: {type: Sequelize.STRING, allowNull: false},
        contraseña: {type: Sequelize.STRING, allowNull: false}

    });
    var Departamento = sequelize.define('departamento',{
        id_departamento: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        descripcion: {type: Sequelize.STRING, allowNull: false}
    });
    var LugarTuristico = sequelize.define('lugarturistico',{
        id_lugarturistico: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequelize.STRING, allowNul: false},
        distancia: {type: Sequelize.INTEGER, allowNUll: false},
        descripcion: {type: Sequelize.STRING, allowNull: false},
        id_departamento: {type: Ssequelize.INTEGER, references:{
            model: Departamento,
            key: 'id_departamento'
        }}
    });

    Departamento.hasMany(LugarTuristico,{foreignKey: 'id_lugarturistico' });
    LugarTuristico.belongsTo(Departamento, {foreignKey: 'id_lugarturistico'})

    sequelize.sync({force : true});

    var conf=require('./config');

    app.use(bodyparser.urlencoded({
        extended: true
    }));
    app.use(bodyparser.json());
    app.use(morgan('dev'));
    app.use('/api/v1', require('./rutas')(app));
    app.set('departamento', Departamento);
    app.set('lugarturistico', LugarTuristico);
    app.listen(puerto,function(){
        console.log("Servidor iniciado en el puerto: " +puerto);
        console.log("Debug del servidor");
    });
