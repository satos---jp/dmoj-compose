import random

kaminoku=["mu/","su/","me/","fu/","sa/","ho","se/"]
shimonoku=["kiritachinohoruakinoyufukure",
		   "yumenokayohichihitomeyokuramu",
		   "kumokakurenishiyohanotsukikana",
		   "muheyamakaseoarashitoifuramu",
		   "itsukomonashiakinoyufukure",
		   "tataariakenotsukisonokoreru",
		   "waretemosueniahamutosomofu"]

class Problem:
	def __init__(self):
		self.id = "instructionless2"
		self.title = "Instructionless 2"
		self.desc = """
		## Sample Input 1
		
		    mu/
		
		
		## Sample Output 1
		
		    kiritachinohoruakinoyufukure
		
		
		## Sample Input 2
		
		    su/
		
		
		## Sample Output 2
		
		    yumenokayohichihitomeyokuramu
		
		
		"""
		
		
		probs = []
		for i in range(7):
			probs.append({'in': kaminoku[i], 'out': shimonoku[i]})
		
		
		self.problems = probs