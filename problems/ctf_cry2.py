class Problem:
	def __init__(self):
		self.id = "ctf_Crypto2"
		self.title = "Crypto 2"
		self.desc = """
	
		ElGammal暗号という公開鍵暗号があります。 (参考: [Wikipediaの記事](https://ja.wikipedia.org/wiki/ElGamal%E6%9A%97%E5%8F%B7))

		Webページ [cryptoproblem_EG/](../../cryptoproblem_EG/) で出題されるElGammal暗号 (c1,c2) を解読してください。

		サーバーのソースコードは [crypto2.zip](../../static/atgtstaticdata/cryptoproblem2/crypto2.zip) からダウンロードできます。

		"""
		
		probs = [{'in': f'', 'out': 'ATGT{Sometimes_gentle_neighborhood_will_tell_you_the_flag}'}]
		
		self.problems = probs
		self.langs = ["text"]

		
