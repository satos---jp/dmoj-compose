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

n = 670998715595019925677484060074335728127n

c2 = 309047092347950113587966197212399007771n
ay = 540841326097565653571619570281082724600n // c1 をDHのほうの生成に入れたときのay

console.log((modinv(ay,n)*c2) % n);

