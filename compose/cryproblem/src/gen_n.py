from Crypto.Util.number import *
import random

while True:
	m = getPrime(128)
	n = m * 2 + 1
	if not isPrime(n):
		continue
	g = random.randint(0,n)
	print(n,g)
	break

print(isPrime(n),isPrime((n-1)//2))

"""
n = BigInt(328976589059884140437962297425595810943n)
g = BigInt(184427886753480461920337662877998400287n)

670998715595019925677484060074335728127
19220819021823291238742898716967849768
1 1

"""
