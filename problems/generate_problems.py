import importlib, yaml, os, zipfile, json, textwrap

SITE="../compose/sitejsondata"
PROB="../compose/problems"

files = [
    "ctf_pwn",
    "ctf_web",
    "esper0",
    "esper1",
    "esper2",
    "esper3",
    "esper4",
    "esper5",
	# "aplusb",
]

"""
mysql> select id, name from judge_language;
+----+----------------+
| id | name           |
+----+----------------+
|  1 | Python 2       |
|  2 | C++03          |
|  4 | Ruby 1.8       |
|  5 | PHP            |
|  6 | Perl           |
|  8 | Python 3       |
|  9 | C              |
| 10 | Pascal         |
| 13 | C++11          |
| 14 | C#             |
| 15 | Haskell        |
| 16 | Go             |
| 17 | PyPy 2         |
| 18 | PyPy 3         |
| 19 | Fortran        |
| 20 | NASM           |
| 21 | Ruby           |
| 22 | Lua            |
| 23 | OCaml          |
| 24 | Turing         |
| 25 | Java 8         |
| 27 | V8 JavaScript  |
| 29 | D              |
| 30 | Brain****      |
| 31 | Objective-C    |
| 33 | C++14          |
| 34 | Visual Basic   |
| 35 | Clang          |
| 36 | Clang++        |
| 37 | Dart           |
| 38 | TCL            |
| 39 | COBOL          |
| 40 | F#             |
| 41 | Scheme         |
| 42 | Ada            |
| 43 | AWK            |
| 44 | Rust           |
| 45 | CoffeeScript   |
| 47 | Prolog         |
| 49 | Forth          |
| 50 | INTERCAL       |
| 51 | Text           |
| 52 | Scala          |
| 54 | Swift          |
| 56 | Assembly (x86) |
| 57 | Assembly (ARM) |
| 58 | Assembly (x64) |
| 60 | Sed            |
| 61 | Java           |
| 62 | NASM64         |
| 63 | Racket         |
| 64 | Groovy         |
| 67 | Kotlin         |
| 68 | Pike           |
| 69 | C++17          |
| 70 | Lisp           |
| 72 | C11            |
| 75 | Zig            |
| 76 | C++20          |
+----+----------------+
"""

def conv_langs(langs):
    res = []
    for l in langs:
        if l == "procon":
            res += [2,8,9,13,33,69,76]
        elif l == "text":
            res += [51]
        else:
            print("Unknown lang",l)
            exit(-1)
    return res

pk_base = 1
def Prob2Stmt(prob):
	global pk_base
	pk_base += 1
	return {
        "fields": {
            "ac_rate": 0.0,
            "allowed_languages": conv_langs(
                prob.langs if hasattr(prob, 'langs') else ['procon']
            ),
            "authors": [
                1
            ],
            "banned_users": [

            ],
            "code": prob.id,
            "curators": [

            ],
            "date": "2000-01-01T00:00:00Z",
            "description": textwrap.dedent(prob.desc),
            "group": 1,
            "is_manually_managed": False,
            "is_public": True,
            "license": None,
            "memory_limit": 65536,
            "name": prob.title,
            "og_image": "",
            "partial": True,
            "points": 5.0,
            "short_circuit": False,
            "summary": "",
            "testers": [],
            "time_limit": 2.0,
            "types": [
                1
            ],
            "user_count": 0
        },
        "model": "judge.problem",
        "pk": pk_base
    }

def problem2init(prob):
	batch = []
	for i,pd in enumerate(prob.problems):
		batch.append({'in': f'{prob.id}.{i}.in','out': f'{prob.id}.{i}.out'})
	
	return yaml.dump({
		'archive': f'{prob.id}.zip',
		'checker': 'standard',
		'test_cases': [{
			'batched': batch,
			'points': 20
		}],
	})

statements = []

for fn in files:
	m = importlib.import_module(fn)
	prob = m.Problem()
	
	# Problem statement
	statements.append(Prob2Stmt(prob))
	
	# Problem data
	d = os.path.join(PROB,f'{prob.id}')
	os.makedirs(d,exist_ok=True)
	with open(os.path.join(d,'init.yml'),'w') as fp:
		fp.write(problem2init(prob))
	
	zd = os.path.join(d,f'{prob.id}.zip')
	if os.path.exists(zd):
		os.remove(zd)
	
	with zipfile.ZipFile(zd,'w') as fp:
		for i,pd in enumerate(prob.problems):
			fp.writestr(f'{prob.id}.{i}.in',pd['in'])
			fp.writestr(f'{prob.id}.{i}.out',pd['out'])

with open(os.path.join(SITE,'problems.json'),'w') as fp:
	json.dump(statements,fp)

	
