class Problem:
	def __init__(self):
		self.id = "Rev"
		self.title = "Rev"
		self.desc = """
		
		Brainf\\*ckプログラム[problem.bf](../../static/atgtstaticdata/revproblem/problem.bf)に対して、
		この問題のフラグを [convert.py](../../static/atgtstaticdata/revproblem/convert.py) で変換した結果を与えると、
		`5619979299176935-83255212932352802752-132802392063035145044727-212802440330906867718050232--9196719061001048939-1351873658--1358860079-1205682559-1005657023-` が出力されました。フラグを求めてください。フラグの形式は `ATGT{[^}]*}`です。

		例えば、 `ThisIsNotFlag` という文字列をconvert.pyで変換すると

		    $ echo -n "ThisIsNotFlag" | python3 convert.py 
		    13
		    84 104 105 115 73 115 78 111 116 70 108 97 103

		となり、この変換結果

		    13
		    84 104 105 115 73 115 78 111 116 70 108 97 103

		をproblem.bfの入力として与えて実行すると `5529778299174188-70926813481151724617-590426186671059061272-4749370194573677173209808-` という出力が得られます。

		このBrainf*ckプログラムは重いので、もし動かしたい場合は https://yukikurage.github.io/brainf__k/ や https://www.jdoodle.com/execute-brainfuck-online/ で実行するとよいでしょう。

		"""
		
		probs = [{'in': f'', 'out': 'ATGT{VeryVeryHardRev}'}]
		
		self.problems = probs
		self.langs = ["text"]

		
