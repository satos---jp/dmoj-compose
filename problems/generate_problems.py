import importlib, yaml, os, zipfile, json, textwrap

SITE="../compose/problems_site"
PROB="../compose/problems"

files = [
	"sample_esper1",
	# "aplusb",
]


pk_base = 1
def Prob2Stmt(prob):
	global pk_base
	pk_base += 1
	return {
        "fields": {
            "ac_rate": 0.0,
            "allowed_languages": [
                3,
                4,
                5,
                6,
                2,
                7,
                1,
                8
            ],
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

	
