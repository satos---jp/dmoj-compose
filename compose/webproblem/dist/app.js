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
  // connectionString: 'mysql://tes:pass@localhost'
	connectionString: 'mysql://tes:wgehr3d42x4c54654cx4565j75c6x4545ch465c45x@db'
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
	// console.log("request",request.body);
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {id: NaN, username: "Not Logged in", result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	if(request.body.username && request.body.password){
		const connection = await fastify.mysql.getConnection();
		// console.log("Get connection".connection);
		// const tesd = await connection.query(
		// 	'select id, password from dmoj.auth_user; -- select points from dmoj.judge_profile',
		// );
		// console.log("Test comment",tesd);
		const [rows, fields] = await connection.query(
			'select id, password from dmoj.auth_user where username=?', [request.body.username]
		);
		// console.log('SQL',rows,fields);
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
			// console.log("Posting",`select points from dmoj.judge_profile where id=${session.id}`);
			const [[point]] = await connection.query(
				`select points from dmoj.judge_profile where id=${session.id}`, []
			);
			// console.log("Point",point);
			connection.release();
			
			const required = 10; 
			if(!Number.isInteger(point.points) || point.points < required){
				session.result = `You need ${required} point to post messages. (You have ${point.points} point now.)`;
			}else{
				const connection = await fastify.mysql.getConnection();
				// console.log("Query",`insert into dmoj.hall_of_fame value (${session.id},"${session.username}","${request.body.postMessage}")`);
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

/*
mysql> select id, username, password from auth_user;
+----+----------+-------------------------------------------------------------------------------+
| id | username | password                                                                      |
+----+----------+-------------------------------------------------------------------------------+
|  1 | admin    | pbkdf2_sha256$36000$eFRRZq4DgktS$EXKnCr+xxogdpfmxREuLXyP+esU0Rr87FmIGccrNc18= |
|  2 | foo      | pbkdf2_sha256$36000$eFRRZq4DgktS$FU2u+pHktmted5r7XkYuH8+7nSg1SBAeIGwkAySarjk= |
|  3 | bar      | pbkdf2_sha256$36000$eFRRZq4DgktS$Hvs9OFXMvunh9WPAHfvutDKGIcjhDTQ5j06SQrrJNWU= |
|  4 | vuln     | sha1$pass$5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8                            |
+----+----------+-------------------------------------------------------------------------------+
4 rows in set (0.00 sec)

mysql> select id,points from judge_profile;
+----+--------+
| id | points |
+----+--------+
|  1 |      0 |
|  2 |     10 |
|  3 |      0 |
|  4 |      0 |
+----+--------+

1" like ((select msg from dmoj.hall_of_fame as X LIMIT 1) regexp "ATGT{A.*")); -- 
*/

fastify.listen(31415, '0.0.0.0');
