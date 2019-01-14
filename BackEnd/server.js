const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');

const app = express();

const db = knex({
  	client: 'pg',
  	connection: {
    host : '127.0.0.1', // represents local host
    user : 'roeyvegerhof',
    password : '',
    database : 'smart-brain'
  }
});


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {

	res.send(database.users);
});

app.post('/signin', (req,res) => {

	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(loginData => {
			const isValid = bcrypt.compareSync(req.body.password, loginData[0].hash);
			if (isValid) {
				return db.select('*').from('users')
				.where('email', '=', req.body.email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('error getting user'))
			} else {
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
});

app.post('/register',(req,res) => {
	const {email, name, password} = req.body;
	const saltRounds = 10;

	const hash = bcrypt.hashSync(password, saltRounds);

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => res.json(user[0]));
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => { res.status(400).json('unable to register')})

});

app.get('/profile/:id', (req,res) => {
	const {id} = req.params;
	db.select('*').from('users').where({ id: id })
	.then(user => {
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(400).json('user not found');
		}
	})
	.catch(err => res.status(400).json('error'));

	// if (!found) {return res.status(404).json('not found');}
});

app.put('/image', (req,res) => {

	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('enteries', 1)
	.returning('enteries')
	.then(enteries => res.json(enteries[0]))
	.catch(err => res.status(400).json('unable to increment'))
});

app.listen(3000, () => {

	console.log('app is running on port 3000')
});
