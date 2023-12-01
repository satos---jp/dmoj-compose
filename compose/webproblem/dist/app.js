const crypto = require("node:crypto");
const fastify = require('fastify')();

fastify.register(require('@fastify/cookie'));
fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/session'), {
	secret: Math.random().toString(2),
	cookie: {secure: false},
});

fastify.register(require("@fastify/view"), {
  engine: {
    ejs: require("ejs"),
  },
});

fastify.register(require('@fastify/mysql'), {
	promise: true,
	connectionString: 'mysql://webp:wgehr3d42x4c54654cx4565j75c6x4545ch465c45x@db'
})

const sessions = new Map();

async function get_hall_of_fame(nid){
	const connection = await fastify.mysql.getConnection();
	const [data] = await connection.query(
		`select id, name, msg from dmoj.hall_of_fame`, []
	);
	connection.release();
	return `<table>
		<tr>
			<th>Name</th>
			<th>Message</th>
		</tr>
	${data.map(({id, name, msg}) => {
		return `<tr>
			<td>${name}</td>
			<td>${id === nid ? msg : "*".repeat(msg.length)}</td>
		</tr>
		`;
	}).join("\n")}
	</table>
	`;
}

fastify.get('/webproblem/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {id: NaN, username: "Not Logged in", result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	const hof = await get_hall_of_fame(session.id);
	return res.view("index.ejs", {hof,...session});
});

fastify.post('/webproblem/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {id: NaN, username: "Not Logged in", result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	if(request.body.username && request.body.password){
		const connection = await fastify.mysql.getConnection();
		const [rows, fields] = await connection.query(
			'select id, password from dmoj.auth_user where username=?', [request.body.username]
		);
		connection.release();
		rows.forEach(({id, password}) => {
			const hash = password.split('$');
			if(hash[0] !== 'pbkdf2_sha256'){
				session.result = `Unknown Hash method: ${hash[0]}`;
				return;	
			}
			const [_,n,salt,h] = hash;
			const th = crypto.pbkdf2Sync(request.body.password,salt,parseInt(n),32,'sha256').toString('base64');
			if(th !== h){
				session.result = `Password check failed.`;
				return;
			}
			session.result = `Login Succeeded.`;
			session.username = request.body.username;
			session.id = id;
		});
	}else if(request.body.postMessage){
		if(isNaN(session.id)){
			session.result = `Pls Login First`;
		}else{
			const connection = await fastify.mysql.getConnection();
			const [[point]] = await connection.query(
				`select points from dmoj.judge_profile where id=${session.id}`, []
			);
			connection.release();
			
			const required = 110; 
			if(!Number.isInteger(point.points) || point.points < required){
				session.result = `You need ${required} point to post messages. (You have ${point.points} point now.)`;
			}else{
				const connection = await fastify.mysql.getConnection();
				await connection.query(
					`insert into dmoj.hall_of_fame value (${session.id},"${session.username}","${request.body.postMessage}")`, []
				);
				connection.release();
				session.result = `Post succeeded.`;
			}
		}
	}

	const hof = await get_hall_of_fame(session.id);
	return res.view("index.ejs", {hof,...session});
});

fastify.listen(30000, '0.0.0.0');
