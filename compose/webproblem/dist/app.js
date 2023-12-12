const crypto = require("node:crypto");
const fastify = require('fastify')();

fastify.register(require('@fastify/cookie'));
fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/session'), {
	secret: Math.random().toString(2),
	cookie: {secure: false, path: "/webproblem/"},
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

async function get_tsubuyaki_list(){
	const [data] = await fastify.mysql.query(
		`select name, isprivate, msg from dmoj.tsubuyaki`, []
	);
	return data.map(({name, isprivate, msg}) => ({
		name,
		msg: isprivate === 0 ? msg : "*".repeat(msg.length),
	}));
}

fastify.get('/webproblem/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {id: NaN, username: "", result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	const tsubuyaki_list = await get_tsubuyaki_list();
	return res.view("index.ejs", {tsubuyaki_list,...session});
});

fastify.post('/webproblem/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {id: NaN, username: "", result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	if(request.body.username && request.body.password){
		const [rows, fields] = await fastify.mysql.query(
			'select id, password from dmoj.auth_user where username=?', [request.body.username]
		);
		rows.forEach(({id, password}) => {
			const hash = password.split('$');
			if(hash[0] !== 'pbkdf2_sha256'){
				session.result = `不明なハッシュ関数: ${hash[0]}`;
				return;	
			}
			const [_,n,salt,h] = hash;
			const th = crypto.pbkdf2Sync(request.body.password,salt,parseInt(n),32,'sha256').toString('base64');
			if(th !== h){
				session.result = `パスワード認証に失敗しました。`;
				return;
			}
			session.result = `ログインしました。`;
			session.username = request.body.username;
			session.id = id;
		});
	}else if(request.body.postMessage){
		if(isNaN(session.id)){
			session.result = `ログインしてください。`;
		}else{
			const [[point]] = await fastify.mysql.query(
				`select points from dmoj.judge_profile where id=${session.id}`, []
			);
			
			const required = 130; 
			if(!Number.isInteger(point.points) || point.points < required){
				session.result = `つぶやくには ${required} 点以上獲得してください。(あなたの現在の得点は ${point.points} 点です)`;
			}else{
				const isprivate = request.body.isprivate === "private";
				await fastify.mysql.query(
					`insert into dmoj.tsubuyaki value ("${session.username}",${isprivate ? 1 : 0},"${request.body.postMessage}")`, []
				);
				session.result = `つぶやきました。`;
			}
		}
	}

	const tsubuyaki_list = await get_tsubuyaki_list();
	return res.view("index.ejs", {tsubuyaki_list,...session});
});

fastify.listen({port: 30000, host: '0.0.0.0'});
