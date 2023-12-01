const crypto = require("node:crypto");
const fs = require("fs");

/*
c={
	c1: 145229901847795436936706393781413658657,
	c2: 37137343628180634674674555103575266008,
}


 推測失敗... 正解は 96346508303691550142686209638768731048 でした。 
*/


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

function buffer_to_bigint(b){
	return b.reduce((a,x) => (a << 8n) + BigInt(x), 0n);
}



c1 = 297247985714169838005237107764616322724n
c2 = 159255472600872223330711926612217385830n
ay = 202588057897342183881452073353574139842n // c1 ^ x
m = 408569682057508923066112298625531189n

x = buffer_to_bigint(fs.readFileSync("../data/FLAG"))

rx = 12155853346257032567178668791725167497928257330563567567076268554655701015004704500165673636141413297108812092053912790804531154547231516541n;
console.log("rx,x",rx - x);

n =  328976589059884140437962297425595810943n
g = 184427886753480461920337662877998400287n
h = 310622437500738265686647885265544829672n

const key = { n, g, x, h };

function encrypt(m){
	const r = buffer_to_bigint(crypto.randomBytes(120));
	return {
		m,
		c1: modpow(key.g, r, key.n),
		c2: (m * modpow(key.h, r, key.n)) % key.n,
	}
}

function decrypt(c){
	return (c.c2 * modinv(modpow(c.c1,key.x,key.n),key.n) % key.n);
}

console.log(modpow(g,x,n) - h);

console.log((modinv(modpow(c1,x,n),n)*c2) % n);
console.log((modinv(modpow(c1,x,n),n)*c2) % n - m);

console.log("ay-c1^x",ay-modpow(c1,x,n));

console.log((modinv(ay,n)*c2) % n);


console.log(decrypt(encrypt(1235634524n)));

