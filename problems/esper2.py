import random

kaminoku=["mu/","su/","me/","hu/","sa/","ho/","se/"]
shimonoku=["87", "18", "57", "22", "70", "81", "77"]

class Problem:
	def __init__(self):
		self.id = "instructionless2"
		self.title = "Instructionless 2"
		self.desc = """
		## Sample Input 1
		
		    mu/
		
		
		## Sample Output 1
		
		    87
		
		
		## Sample Input 2
		
		    hu/
		
		
		## Sample Output 2
		
		    22
		
		
		"""
		
		
		probs = []
		for i in range(7):
			probs.append({'in': kaminoku[i], 'out': shimonoku[i]})
		
		
		self.problems = probs