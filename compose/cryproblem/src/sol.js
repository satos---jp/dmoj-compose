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

n =  328976589059884140437962297425595810943n

c2 = 50731445225686221093311700834097133311n
ay = 275444135228215718901775353442247740095n // c1 を生成に入れたときのay

console.log((modinv(ay,n)*c2) % n);

