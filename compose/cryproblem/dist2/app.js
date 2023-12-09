const crypto = require("node:crypto");
const fs = require("fs");
const fastify = require('fastify')();

fastify.register(require('@fastify/cookie'));
fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/session'), {
	secret: Math.random().toString(2),
	cookie: {secure: false, path: "/cryptoproblem_EG/"},
});

fastify.register(require("@fastify/view"), {
  engine: {
    ejs: require("ejs"),
  },
});

const sessions = new Map();

function buffer_to_bigint(b){
	return b.reduce((a,x) => (a << 8n) + BigInt(x), 0n);
}

function modpow(a,x,n){ // return (a ** x) % n;
	let res = 1n;
	let b = a;
	while(x > 0n){
		if(x % 2n == 1n){
			res = (res * b) % n;
		}
		x >>= 1n;
		b = (b * b) % n;
	}
	return res;
}

function modinv(a,n){ // return b where a * b % n === 1
	return modpow(a,n-2n,n);
}

const key = {
	n: BigInt(fs.readFileSync("/root/data/N").toString()),
	g: BigInt(fs.readFileSync("/root/data/G").toString()),
	x: buffer_to_bigint(fs.readFileSync("/root/data/FLAG")),
};
key.h = modpow(key.g,key.x,key.n);

function encrypt(m){
	const r = buffer_to_bigint(crypto.randomBytes(15));
	return {
		m,
		c1: modpow(key.g, r, key.n),
		c2: (m * modpow(key.h, r, key.n)) % key.n,
	}
}

function decrypt(c){
	return (c.c2 * modinv(modpow(c.c1,key.x,key.n),key.n) % key.n);
}

function generateRandomProblem(){
	const a = buffer_to_bigint(crypto.randomBytes(15));
	return encrypt(a);
}

function ProblemtoDesc(problem){
	return `以下の情報から暗号化されたmを当ててください。
key={
	n: ${key.n},
	g: ${key.g},
	h: ${key.h}
}
c={
	c1: ${problem.c1},
	c2: ${problem.c2}
}`;
}

fastify.get('/cryptoproblem_EG/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {problem: generateRandomProblem(), result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	return res.view("index.ejs", {desc: ProblemtoDesc(session.problem), ...session});
});

fastify.post('/cryptoproblem_EG/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {problem: generateRandomProblem(), result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	if(request.body.guess){
		const problem = session.problem;
		const m = decrypt(problem);
		if(request.body.guess === String(m)){
			const flag = fs.readFileSync("/root/data/FLAG").toString();
			session.result = `推測成功！ フラグは ${flag} です。`;
		}else{
			session.result = `推測失敗...\nc={\n	c1: ${problem.c1},\n	c2: ${problem.c2}\n}\nの正解は ${String(m)} でした。`;
			session.problem = generateRandomProblem();
		}
	}
	return res.view("index.ejs", {desc: ProblemtoDesc(session.problem), ...session});
});

fastify.listen({port: 26457, host: '0.0.0.0'});
