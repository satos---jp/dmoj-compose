class Problem:
	def __init__(self):
		self.id = "ctf_Web"
		self.title = "Web"
		self.desc = """

    Webページ [webproblem/](../../webproblem/) に行き、最初に投稿されたflagさんのメッセージを盗みとりましょう。

    Webサーバーのソースコードとデータベースの初期化に使ったデータは [web.zip](../../static/atgtstaticdata/webproblem/web.zip) からダウンロードできます。

    フラグ(flagさんのメッセージ)の形式は`ATGT{[^}]*}`です。

    """
		
		probs = [{'in': f'', 'out': 'ATGT{H0w_ab0u7_your_1st_SQL1}'}]
		
		self.problems = probs
		self.langs = ["text"]

		
