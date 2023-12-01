import hashlib, base64

N = 36000
ty = 'sha256'
# salt = b'eFRRZq4DgktS'
# N = 1
# salt = b''
salt = b'eFRRZq4DgktS'
salt = b't3Ct3t3RF23r'
h = hashlib.pbkdf2_hmac(ty, b'y3432r334gh3455v445fg344g45hgverdbveg34fw', salt, N)
print(h.hex(),len(h.hex()))
h = base64.b64encode(h).decode('ascii')
print(f"pbkdf2_{ty}${N}${salt.decode('ascii')}${h}")

# foo31415:: pbkdf2_sha256$36000$eFRRZq4DgktS$FU2u+pHktmted5r7XkYuH8+7nSg1SBAeIGwkAySarjk=
