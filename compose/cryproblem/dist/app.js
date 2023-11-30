const crypto = require("node:crypto");
const fs = require("fs");
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

const sessions = new Map();

function generateProblem(){
	const randBigInt = (x) => BigInt(crypto.randomInt(x));
	const n = randBigInt(1 << 30);
	const a = randBigInt(1 << 30);
	const b = randBigInt(1 << 30);
	const secret = randBigInt(1 << 30);
	const rand = (() => {
		// 線形合同法で乱数を生成する
		let s = randBigInt(Number(n));
		return ((x) => {
			s = (a * s + x + b) % n;
			return s % 4n;
		});
	})();
	
	let v = secret;
	const encrypted = [];
	while(v > 0n){
		encrypted.push(rand(v % 4n));
		v /= 4n;
	}

	return ({
		n, a, b, secret, encrypted
	});
}

fastify.get('/cryptoproblem/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {problem: generateProblem(), result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	return res.view("index.ejs", session);
});

fastify.post('/cryptoproblem/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {problem: generateProblem(), result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	const problem = session.problem;
	if(request.body.guess){
		if(request.body.guess === String(problem.secret)){
			const flag = fs.readFileSync("flag").toString();
			session.result = `Correct! The flag is ${flag}`;
		}else{
			session.result = `
				Wrong...
				Your guess was ${request.body.guess},
				but the correct answer is ${String(problem.secret)}.
				Here are other informations:
				n=${problem.n}
				a=${problem.a}
				b=${problem.b}
				encrypted=${problem.encrypted}
				`;
			session.problem = generateProblem();
		}
	}

	return res.view("index.ejs", session);
});

fastify.listen(23456, '0.0.0.0');
