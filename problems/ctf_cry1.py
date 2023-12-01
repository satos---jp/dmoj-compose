class Problem:
	def __init__(self):
		self.id = "ctf_Crypto1"
		self.title = "Crypto 1"
		self.desc = """

		Diffie-Hellman鍵交換という鍵共有方法があります。 (参考: [Wikipediaの記事](https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%95%E3%82%A3%E3%83%BC%E3%83%BB%E3%83%98%E3%83%AB%E3%83%9E%E3%83%B3%E9%8D%B5%E5%85%B1%E6%9C%89))

		Webページ [cryptoproblem_DH/](../../cryptoproblem_DH/) でDiffie-Hellman鍵交換が試せるので、二人が共有している秘密鍵である a^xy を当ててください。

		サーバーのソースコードは [crypto1.zip](../../static/atgtstaticdata/cryptoproblem1/crypto1.zip) からダウンロードできます。

		"""
		
		probs = [{'in': f'', 'out': 'ATGT{Give_what_you_want_and_Take_flag}'}]
		
		self.problems = probs
		self.langs = ["text"]

		
