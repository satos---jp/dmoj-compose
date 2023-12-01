from Crypto.Util.number import *
import random

n = getPrime(128)
g = random.randint(0,n)
print(n,g)

"""
n = BigInt(328976589059884140437962297425595810943n)
g = BigInt(184427886753480461920337662877998400287n)
"""
