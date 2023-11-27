class Problem:
	def __init__(self):
		self.id = "Pwn"
		self.title = "Pwn"
		self.desc = """
		
		`nc <このサーバーのIPアドレス> 31622` で『はがき変換』を行うプログラムが動いています。

		このプログラムのバグを突いてflagファイルの中身を覗きましょう。

		プログラムのバイナリとそのソースコードは [dist.tar.gz](../../static/atgtstaticdata/pwnproblem/dist.tar.gz)からダウンロードできます。
    
		フラグ(flagファイルの中身)の形式は`ATGT{[^}]*}`です。
    
		### 通信の例

				######################################################

				現在の変換ルール: は が き
				1. ルール設定
				2. 変換
				3. ピザチャレンジ
				4. Finish
				> 1
				ルール: めがね

				######################################################

				現在の変換ルール: め が ね
				1. ルール設定
				2. 変換
				3. ピザチャレンジ
				4. Finish
				> 2
				入力: かめらめせん
				変換結果: かねらねせん

				######################################################

				現在の変換ルール: め が ね
				1. ルール設定
				2. 変換
				3. ピザチャレンジ
				4. Finish
				> 3
				推測: ATGT{korededoudesuka}
				不正解...

				######################################################

				現在の変換ルール: め が ね
				1. ルール設定
				2. 変換
				3. ピザチャレンジ
				4. Finish
				> 4

		"""
		
		probs = [{'in': f'', 'out': 'ATGT{WhatIsYourFavoriteTopping?}'}]
		
		self.problems = probs
		self.langs = ["text"]

		
