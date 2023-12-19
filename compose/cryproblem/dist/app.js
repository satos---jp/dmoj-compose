const crypto = require("node:crypto");
const fs = require("fs");
const fastify = require('fastify')();

fastify.register(require('@fastify/cookie'));
fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/session'), {
	secret: Math.random().toString(2),
	cookie: {secure: false, path: "/cryptoproblem_DH/"},
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

const n = BigInt(fs.readFileSync("/root/data/N").toString());
const secret1 = buffer_to_bigint(fs.readFileSync("/root/data/flag"));
const secret2 = buffer_to_bigint(fs.readFileSync("/root/data/FLAG"));

function generateProblem(a){
	return {
		a,
		ax: modpow(a,secret1,n),
		ay: modpow(a,secret2,n),
		axy: modpow(a,secret1*secret2,n)
	}
}

function generateRandomProblem(){
	const a = buffer_to_bigint(crypto.randomBytes(15));
	return generateProblem(a);
}

function problemtoStr(problem){
	return `n = ${n}
a = ${problem.a}
a^x mod n = ${problem.ax}
a^y mod n = ${problem.ay}`;
}

function problemtodesc(problem){
	return `以下の情報から a^xy mod n を当ててください。\n${problemtoStr(problem)}`;
}

fastify.get('/cryptoproblem_DH/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {problem: generateRandomProblem(), result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	return res.view("index.ejs", {desc: problemtodesc(session.problem), ...session});
});

fastify.post('/cryptoproblem_DH/', async (request, res) => {
	if (!sessions.has(request.session.sessionId)) {
		sessions.set(request.session.sessionId, {problem: generateRandomProblem(), result: ""});
	}
	const session = sessions.get(request.session.sessionId);
	if(request.body.guess){
		const problem = session.problem;
		if(request.body.guess === String(problem.axy)){
			const flag = fs.readFileSync("/root/data/flag").toString();
			session.result = `推測成功！ フラグは ${flag} です。`;
		}else{
			session.result = `推測失敗...\n${problemtoStr(problem)}\nのときの a^xy mod n は ${String(request.body.guess)} ではなく ${String(problem.axy)} でした。`;
			session.problem = generateRandomProblem();
		}
	}else if(request.body.try){
		const s = String(request.body.try);
		if(s.length > 100){
			session.result = `入力が長すぎます。`;
		}else{
			const a = BigInt(s);
			const problem = generateProblem(a);
			session.result = `問題生成結果:\n${problemtoStr(problem)}`;
		}
	}
	return res.view("index.ejs", {desc: problemtodesc(session.problem), ...session});
});

fastify.listen({port: 24494, host: '0.0.0.0'});
