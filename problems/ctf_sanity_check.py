class Problem:
	def __init__(self):
		self.id = "_Sanity"
		self.title = "Sanity Check"
		self.desc = """

    CTF系の問題に関しては、Text形式でフラグを提出すると判定されます。

    この問題のフラグは(注意事項)[../../post/1-notice]のページを見ると分かります。

    """
		
		probs = [{'in': f'', 'out': "ATGT{Now_you_can_say_you've_played_CTF_before!}"}]
		
		self.problems = probs
		self.langs = ["text"]

		
